"""Render original narrated slide lessons with neural speech and local illustrations."""
import asyncio
import json
import pathlib
import re
import shutil
import subprocess
import sys
import tempfile
import wave

ROOT = pathlib.Path(__file__).resolve().parents[1]
TOOLS = ROOT / ".video-tools"
sys.path.insert(0, str(TOOLS))

import edge_tts
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
OUT = ROOT / "public/lesson-videos"
TEMP = pathlib.Path(tempfile.mkdtemp(prefix="signal-full-lessons-"))
VOICE = "en-US-AvaNeural"
RATE = "-2%"
videos = json.loads((ROOT / "scripts/lesson-video-scripts.json").read_text(encoding="utf-8"))
FONT = pathlib.Path("C:/Windows/Fonts")


def font(size, bold=False):
    return ImageFont.truetype(str(FONT / ("arialbd.ttf" if bold else "arial.ttf")), size)


def wrap(draw, text, x, y, width, size=26, fill="#233d32", bold=False):
    selected_font = font(size, bold)
    line = ""
    for word in text.split():
        candidate = (line + " " + word).strip()
        if draw.textlength(candidate, font=selected_font) > width and line:
            draw.text((x, y), line, font=selected_font, fill=fill)
            y += int(size * 1.4)
            line = word
        else:
            line = candidate
    if line:
        draw.text((x, y), line, font=selected_font, fill=fill)
        y += int(size * 1.4)
    return y


def stamp(seconds):
    milliseconds = round(seconds * 1000)
    return f"{milliseconds // 3600000:02}:{milliseconds // 60000 % 60:02}:{milliseconds // 1000 % 60:02}.{milliseconds % 1000:03}"


async def create_narration():
    semaphore = asyncio.Semaphore(2)

    async def save_scene(video, index, scene):
        audio_path = TEMP / f"{video['id']}-{index}.mp3"
        async with semaphore:
            speaker = edge_tts.Communicate(scene["narration"], VOICE, rate=RATE)
            await speaker.save(str(audio_path))
        if not audio_path.is_file() or audio_path.stat().st_size == 0:
            raise RuntimeError(f"Neural narration was empty for {video['id']} scene {index + 1}")

    await asyncio.gather(*(
        save_scene(video, index, scene)
        for video in videos
        for index, scene in enumerate(video["scenes"])
    ))


asyncio.run(create_narration())
print(f"Narration ready for {len(videos)} lessons using {VOICE}.", flush=True)

manifest = []
for video in videos:
    ident = video["id"]
    chapters = []
    cursor = 0
    frames = []
    cues = []
    audio = TEMP / f"{ident}-full.wav"
    with wave.open(str(audio), "wb") as output:
        for index, scene in enumerate(video["scenes"]):
            clip_path = TEMP / f"{ident}-{index}.wav"
            subprocess.run(
                [
                    FFMPEG, "-hide_banner", "-loglevel", "error", "-y",
                    "-i", str(TEMP / f"{ident}-{index}.mp3"),
                    "-ar", "24000", "-ac", "1", "-c:a", "pcm_s16le",
                    str(clip_path),
                ],
                check=True,
            )
            with wave.open(str(clip_path), "rb") as clip:
                if index == 0:
                    output.setparams(clip.getparams())
                duration = clip.getnframes() / clip.getframerate()
                output.writeframes(clip.readframes(clip.getnframes()))
                output.writeframes(b"\0" * int(.55 * clip.getframerate()) * clip.getsampwidth() * clip.getnchannels())
            chapters.append(dict(title=scene["title"], start=cursor, end=cursor + duration, narration=scene["narration"]))
            sentences = re.findall(r"[^.!?]+[.!?]+|[^.!?]+$", scene["narration"])
            total = sum(len(sentence) for sentence in sentences)
            cue_time = cursor
            for sentence in sentences:
                end = cue_time + duration * len(sentence) / total
                cues.append(stamp(cue_time) + " --> " + stamp(end) + "\n" + sentence.strip())
                cue_time = end

            for active in range(3):
                image = Image.new("RGB", (960, 540), "#f5f5ef")
                draw = ImageDraw.Draw(image)
                draw.rectangle((0, 0, 960, 8), fill="#315e48")
                wrap(draw, "signal. / THE LEARNING LAB", 42, 30, 750, 17, bold=True)
                wrap(draw, f"{index + 1:02} / {len(video['scenes']):02}", 825, 32, 110, 16)
                wrap(draw, scene["title"], 42, 83, 870, 34, bold=True)
                for node_index, label in enumerate(scene["nodes"]):
                    x = 42 + node_index * 298
                    draw.rounded_rectangle((x, 210, x + 280, 370), radius=18, fill="#315e48" if active == node_index else "#e9efdf")
                    wrap(draw, str(node_index + 1).zfill(2), x + 22, 229, 230, 16, fill="#fffef9" if active == node_index else "#637067")
                    wrap(draw, label, x + 22, 271, 230, 23, fill="#fffef9" if active == node_index else "#233d32", bold=True)
                wrap(draw, "Pause, try your own answer, then compare the reasoning.", 42, 411, 870, 21)
                wrap(draw, "Original Signal lesson | AI voice narration | English captions", 42, 468, 880, 14, fill="#637067")
                draw.rectangle((42, 512, 918, 518), fill="#d7dfd2")
                draw.rectangle((42, 512, 42 + int(876 * (index + (active + 1) / 3) / len(video["scenes"])), 518), fill="#315e48")
                filename = TEMP / f"{ident}-{index}-{active}.png"
                image.save(filename)
                if index == 0 and active == 0:
                    image.save(OUT / (ident + ".png"))
                frames.extend([f"file '{filename.as_posix()}'", f"duration {(duration + .55) / 3:.8f}"])
            cursor += duration + .55
    frames.append(frames[-2])
    concat = TEMP / f"{ident}-frames.txt"
    concat.write_text("\n".join(frames), encoding="utf-8")
    target = OUT / (ident + ".webm")
    print(f"Rendering {ident}: {cursor / 60:.1f} minutes", flush=True)
    subprocess.run(
        [
            FFMPEG, "-hide_banner", "-loglevel", "error", "-y",
            "-f", "concat", "-safe", "0", "-i", str(concat), "-i", str(audio),
            "-vf", "fps=2,format=yuv420p", "-c:v", "libvpx-vp9", "-deadline", "realtime",
            "-cpu-used", "8", "-threads", "2", "-b:v", "0", "-crf", "38",
            "-c:a", "libopus", "-b:a", "64k", "-t", str(cursor), str(target),
        ],
        check=True,
    )
    (OUT / (ident + ".vtt")).write_text("WEBVTT\n\n" + "\n\n".join(cues) + "\n", encoding="utf-8")
    manifest.append(dict(id=ident, duration=cursor, chapters=chapters))
    print(f"Saved {ident}: {target.stat().st_size // 1024} KB", flush=True)

(ROOT / "src/data/lessonVideos.json").write_text(
    json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
    encoding="utf-8",
)
print("All eight lesson videos, captions, posters, and transcripts are ready.", flush=True)
shutil.rmtree(TEMP)
