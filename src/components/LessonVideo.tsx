import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import videos from '../data/lessonVideos.json';

export default function LessonVideo({ lessonId }: { lessonId: string }) {
  const player = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);
  const video = videos.find(item => item.id === lessonId);
  if (!video) return null;
  const duration = Math.round(video.duration);
  const time = (seconds: number) => Math.floor(seconds / 60) + ':' + String(Math.floor(seconds % 60)).padStart(2, '0');
  return <section className="lesson-video" aria-label="Original lesson explainer">
    <div className="lesson-video-label"><span><Play size={15} />Your guided video lesson</span><span>{time(duration)} / complete video</span></div>
    <video ref={player} controls playsInline preload="metadata" poster={'/lesson-videos/' + lessonId + '.png'} onError={() => setError(true)} aria-label="Narrated explainer with English captions">
      <source src={'/lesson-videos/' + lessonId + '.webm'} type="video/webm" />
      <track kind="captions" src={'/lesson-videos/' + lessonId + '.vtt'} srcLang="en" label="English" default />
      Your browser cannot play this video. Read the complete transcript below.
    </video>
    {error && <p role="status">The video could not load. The full transcript below covers the same explanation.</p>}
    <details className="lesson-transcript"><summary>Read the transcript / jump to a chapter</summary><p>Original Signal Lab illustrations with conversational AI narration. Watching is optional; use the transcript or captions whenever you prefer.</p>{video.chapters.map(chapter => <div key={chapter.title}><button type="button" onClick={() => { if (player.current) player.current.currentTime = chapter.start; }} aria-label={'Seek to ' + chapter.title + ' at ' + time(chapter.start)}><span>{time(chapter.start)}</span>{chapter.title}</button><p>{chapter.narration}</p></div>)}</details>
  </section>;
}
