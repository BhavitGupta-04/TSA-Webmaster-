import json
import pathlib
import re

root = pathlib.Path(__file__).resolve().parents[1]
curriculum = (root / "src/data/portalCurriculum.ts").read_text(encoding="utf-8")
lessons = json.loads(curriculum.split("export const lessons: Lesson[] = ", 1)[1].strip().rstrip(";"))

storylines = {
    "patterns": {
        "opening": "The eco-club wants a camera to sort lunch packaging. It works on the practice photos, but the club has not yet checked whether it learned the objects or the table they were photographed on.",
        "angle": "Think of a new student learning the recycling routine by watching examples. They can copy a pattern without knowing why it works, and a different cafeteria can make that pattern fall apart.",
        "clue": "A shiny wrapper appears in bright light, then the same wrapper looks dull under a shadow. The object stayed the same; the information available to the camera changed.",
        "twist": "A reusable bottle is made of metal, but it is not a can. One example like this can expose a shortcut that seemed reliable when every training photo was familiar.",
        "test": "Try the sorter with new objects, backgrounds, and lighting. Keep some examples aside until the end, so the final check is not just a repeat of what the system has already seen.",
        "worked": "Suppose the camera labels a bottle as a can only when it sits on the blue lunch tray. Change one detail at a time, then ask which change makes the prediction move.",
        "counter": "Now imagine two objects that look alike but belong in different bins. What extra evidence could help, and what would be a guess the camera should not make?",
        "practice": "As you work through the recycling activity, separate what the system receives from what a person wants it to predict. Those are easy to mix up at first.",
        "transfer": "For your project, picture one real school task and one new example that could fool your design. A useful proposal explains what a person would do when the tool is unsure.",
        "takeaway": "When a prediction surprises you, ask what pattern the system may have used and what new example would help you check."
    },
    "test-detective": {
        "opening": "A science fair team says its study helper is accurate because it answered nine questions correctly. Before celebrating, ask what those questions covered, what it missed, and whether the mistakes mattered.",
        "angle": "A test score is like a weather forecast judged on one sunny afternoon. It tells you something about that moment, but not how the forecast handles a storm or a different season.",
        "clue": "Imagine a reminder tool that gets almost everything right but misses the one announcement about a deadline. A small count of errors can hide a big consequence.",
        "twist": "The same system is tried again with longer questions and unfamiliar wording. Its score drops. That does not make the first result fake; it shows that the first test covered only a narrow situation.",
        "test": "Write down the conditions before testing: who will use the tool, what inputs it will receive, and which mistakes would be costly. Then try fresh examples and record the misses as carefully as the successes.",
        "worked": "Two tools each get eight out of ten. One makes two harmless formatting mistakes; the other invents two science facts. The matching score does not make their risks match.",
        "counter": "If a tool does well on short questions, what would you try next? Include a question with a different wording and one whose answer is not in the supplied material.",
        "practice": "In the testing activity, look beyond the headline percentage. Notice which cases count as an error and what someone should do after finding one.",
        "transfer": "For your project, name the evidence that would make you pause or redesign the idea. A trustworthy plan can include a limit, another test, or a person who reviews results.",
        "takeaway": "A useful test is designed around the real job and the people affected by a wrong answer."
    },
    "prompt-builder": {
        "opening": "Jordan is studying for a history quiz and keeps mixing up two causes of a major event. A chat tool could give a long summary, but Jordan needs practice telling the causes apart.",
        "angle": "A helpful prompt is a little like giving directions to a study partner. Say where you are stuck, what kind of help you want, and when you would rather try before seeing an answer.",
        "clue": "Jordan asks for one question at a time and asks the tool to wait. That small boundary changes the activity from reading another explanation into actually retrieving an idea.",
        "twist": "The tool gives a confident answer using a date Jordan does not recognize. A careful learner pauses, checks class notes, and asks where the date came from instead of building more work on top of it.",
        "test": "Try the prompt on a topic you already know a little. If it gives away the answer too soon, revise the instruction; if it invents detail, check a trusted class source.",
        "worked": "A student can describe a math method but loses track of negative signs. Ask for a single practice problem, a hint after an attempt, and then a fresh problem to solve without help.",
        "counter": "What would you change if the first explanation were too advanced? Try asking for one everyday comparison, then check whether the comparison still matches the science.",
        "practice": "As you build a prompt, make the learner's next action clear. A request that sounds impressive is not useful if it leaves you watching instead of thinking.",
        "transfer": "For your project, include a boundary that protects the student's role. The tool can ask, hint, or give feedback; decide what the student should still do independently.",
        "takeaway": "The best study prompt sets up useful practice, then gives you room to do the learning."
    },
    "fact-checker": {
        "opening": "The robotics club is making a poster about a new study space. An AI draft includes a precise percentage and a confident claim about every student, so the team opens the source before printing it.",
        "angle": "Treat each sentence like a small claim that has to pass inspection. A source can be real and still fail to support the number, group, date, or cause described in the sentence.",
        "clue": "The club finds a survey with twelve replies, all from robotics members. The result may describe those replies, but it cannot automatically stand in for the whole school.",
        "twist": "A second source mentions the same topic but reports a different year. Both links open correctly. The team still has to check which source matches the claim it plans to make.",
        "test": "Underline the exact claim, find the matching detail in the source, and note who or what was measured. If the source does not answer that question, narrow the sentence or leave it out.",
        "worked": "A fictional poll gets seven replies in favor out of ten. Say exactly that, name who replied, and avoid claiming that the poll proves a change caused higher grades.",
        "counter": "Now imagine the source is an AI-generated summary of another page. What original evidence would you want to open before quoting the summary?",
        "practice": "In the evidence activity, trace each statement back to something a reader can actually inspect. Keep the wording close to what the evidence measures.",
        "transfer": "For your project, explain how you would check one important statement before sharing it. Keep a note of what the source supports and what is still uncertain.",
        "takeaway": "Check the exact claim, the evidence behind it, and the limits of who or what that evidence describes."
    },
    "fairness": {
        "opening": "A school club tries a speech-to-text tool for meeting notes. It works well for one speaker in a quiet room, then struggles when several students speak with different accents and background noise.",
        "angle": "Imagine a team captain who only listens to the loudest people in a meeting. The plan might look successful on paper while some members barely get a chance to be heard.",
        "clue": "A tool's overall score can hide whose words were understood and whose were missed. Looking at separate experiences can reveal a problem that an average keeps out of view.",
        "twist": "The club adds a quieter microphone and allows students to correct the notes. One change helps, but students still need another way to participate if the transcript is wrong.",
        "test": "Ask who is missing from the test, invite feedback from different students, and compare the errors. Decide what the school will do when the system gets someone's contribution wrong.",
        "worked": "Suppose two groups each contribute twenty clips. The tool gets nineteen from one group and twelve from the other. Before deployment, investigate why the experiences differ and who can appeal.",
        "counter": "If a new microphone improves the average, what else would you want to know? Consider whether every student can access it and whether corrections actually change the record.",
        "practice": "In the fairness activity, follow the people behind each number. Look for both the measured result and the real opportunity someone gains or loses.",
        "transfer": "For your project, name the students who may have the hardest time using your idea. Describe a safeguard those students can use, not just a promise that the tool is fair.",
        "takeaway": "Fairness takes listening, checking different experiences, and giving people a practical way to challenge a result."
    },
    "privacy": {
        "opening": "Maya wants help understanding a tricky homework question. Her first thought is to paste an entire private conversation into a study tool, even though only one sentence explains the assignment.",
        "angle": "Think of sharing information like packing for a short trip. Bring what you need for the task, not a whole drawer of personal things just in case.",
        "clue": "The assignment rules matter too. A teacher may allow help brainstorming but not allow generated paragraphs in the final submission, so Maya checks the instructions before choosing a tool.",
        "twist": "A friend offers to paste their draft into the chat to get feedback. Even if that seems convenient, the friend should decide what to share and remove details that are not needed.",
        "test": "Before sending anything, ask whose information it is, whether the task permits the tool, and whether a smaller or anonymous example would work. If the answer is unclear, stop and ask.",
        "worked": "Instead of pasting a classmate's message, describe the assignment in general terms and ask for a checklist of questions to consider. Maya writes the response herself and notes any allowed help.",
        "counter": "What if the tool asks for a full name or a personal story to answer a basic study question? Look for a way to remove that detail or use a different resource.",
        "practice": "In the privacy activity, decide whether each detail is truly needed for the task. Permission, school rules, and data minimization all matter.",
        "transfer": "For your project, list what information the tool needs and what it should never ask students to provide. Say how a student can choose not to use it.",
        "takeaway": "Share the least information needed, follow the assignment, and keep control of your own work."
    },
    "creative-brief": {
        "opening": "The art club is planning a campaign for a school food drive. They could ask an AI tool for poster ideas, but a fast pile of suggestions is not the same as a clear plan.",
        "angle": "A creative brief is like agreeing on the destination before a group starts building. It helps people decide what the work should do, who it is for, and what boundaries matter.",
        "clue": "One draft is funny but hard to read from across the hallway. Another is clear but leaves out the date. Comparing them against the goal gives the club a reason to revise instead of picking at random.",
        "twist": "The club learns that some students cannot read the small print easily. Accessibility is not a final decoration; it changes the design choices from the beginning.",
        "test": "Show a draft to someone who was not in the planning conversation. Ask what they think the poster wants them to do, then check whether the details are readable and accurate.",
        "worked": "For a food-drive poster, the team might keep the warm colors from one suggestion, rewrite the headline in its own voice, and verify the collection date with the organizer.",
        "counter": "Suppose every generated design uses the same familiar image. What other visual direction could better fit your school and still make the message clear?",
        "practice": "During the creative activity, compare options against the purpose. Give each revision a reason, such as readability, audience, accuracy, or access.",
        "transfer": "For your project, show how a person will make the final choices and credit any AI assistance honestly. The tool can offer possibilities; the team owns the result.",
        "takeaway": "Start with a purpose, compare ideas against it, and let people shape the final work."
    },
    "capstone": {
        "opening": "Imagine pitching an AI helper for students who are new to algebra. The idea sounds exciting, but a school needs to know exactly what the helper will do and when a person should step in.",
        "angle": "A good proposal is more like a small pilot than a grand promise. Start with one problem, gather evidence, and make a plan for what happens if the first version disappoints.",
        "clue": "A helper that explains one practice problem is different from one that completes graded work. A clear boundary makes it easier for students and teachers to know what the tool is for.",
        "twist": "A student gets an answer that looks polished but uses a method the class has not learned. The school needs a way to check the explanation and a person to help when it causes confusion.",
        "test": "Try the idea with new examples, ask students what was helpful, and record mistakes as well as successes. Decide in advance what result would make the team change course.",
        "worked": "A pilot could offer optional hints for one algebra unit, keep student names out of test data, and ask learners to solve a new problem on their own afterward.",
        "counter": "If students stop attempting problems and copy the hints, what would you change? A useful proposal includes a way to notice when the tool is getting in the way.",
        "practice": "As you organize the project workflow, make every step answer a real question: what problem, what evidence, whose needs, and what happens after a mistake?",
        "transfer": "Your final proposal should make a small promise it can support. Include a limit, a way to test it, and a human contact students can reach.",
        "takeaway": "Trust grows when a useful idea is tested carefully and people stay responsible for the decisions."
    }
}


videos = []
for lesson in lessons:
    story = storylines[lesson["id"]]
    goals = lesson["goals"]
    scenes = []

    def scene(title, nodes, narration):
        scenes.append({"title": title, "nodes": nodes, "narration": re.sub(r"\s+", " ", narration).strip()})

    scene(
        "Start with a real choice",
        ["Picture the setting", "Notice the decision", "Stay curious"],
        f"Hi, and welcome. {story['opening']} As you watch, keep one question in mind: {story['takeaway']} You do not need to memorize a list of terms. Try to notice what the people in the story know, what they still need to check, and what choice they can make next."
    )
    scene(
        "Look at the situation from another angle",
        ["A familiar comparison", "A different example", "One useful question"],
        f"{story['angle']} This comparison is a way to think, not a perfect match. Real AI systems can work in different ways, so it helps to ask what this particular tool was designed to do. {goals[0]} What detail in the story makes that goal easier to see?"
    )
    scene(
        "When the first guess changes",
        ["Notice what changed", "Compare the result", "Ask why"],
        f"{story['twist']} Pause for a moment. What changed between the first situation and the second? If the result changed too, that is a clue worth investigating. It is not proof of the cause yet. Think of one more example that could help separate a genuine pattern from a coincidence."
    )
    scene(
        "Pay attention to the details",
        ["Find the useful clue", "Leave out distractions", "Explain your choice"],
        f"{story['clue']} A useful explanation connects a detail to a decision. Try finishing this sentence in your own words: I would pay attention to this detail because... {goals[1]} You can use a different example from the one in the lesson. The goal is to explain the reasoning, not to repeat a definition."
    )
    scene(
        "Try a test that could change your mind",
        ["Make a prediction", "Check a fresh example", "Record what happened"],
        f"{story['test']} Before looking at any result, say what you expect to happen and why. Then compare your prediction with what actually happens. If they do not match, keep the surprising result; it may be the most useful part of the test."
    )
    scene(
        "Look beyond the easy answer",
        ["Ask who is affected", "Notice what is missing", "Choose a next step"],
        f"{story['counter']} It is tempting to judge a tool by its most impressive example. A more careful check also asks who was not represented, what information is missing, and what could go wrong. {goals[2]} A person should be able to question a result and choose what to do next."
    )
    scene(
        "Work through a new example",
        ["Name the task", "Follow the evidence", "Decide what to check"],
        f"{story['worked']} Work through it in three moves. First, say what job the tool is meant to do. Next, point to the evidence you have, rather than a guess about how the tool thinks. Finally, decide what still needs a human check. There may be more than one reasonable answer if you explain your evidence."
    )
    scene(
        "Bring the idea into practice",
        ["Try a small example", "Learn from feedback", "Explain your revision"],
        f"Now open the practice activity, {lesson['practice']['title']}, when you are ready. {story['practice']} Take a first try before asking for help. If feedback changes your mind, name the detail that changed it. If you keep your answer, explain what evidence supports it."
    )
    scene(
        "Make a thoughtful next step",
        ["Keep the purpose clear", "Consider another person", "Leave room to revise"],
        f"Your lesson project is called {lesson['project']['title']}. {story['transfer']} Before you finish, imagine someone else using your idea for the first time. What would they need to know? What could they do if the tool did not work for them? Those questions can make a promising idea more useful."
    )
    scene(
        "Put the vocabulary in your own words",
        ["Choose one new word", "Use a real example", "Explain it simply"],
        f"Pick one word from today's lesson and explain it using the story you just heard. Avoid copying the wording from the screen. You might begin, In this situation, this word means... If your explanation is hard to follow, add a small example. Clear language is a good way to notice what you understand and what you want to ask about."
    )
    scene(
        "Take the thinking with you",
        ["Remember the question", "Choose a next action", "Keep a person involved"],
        f"Here is one idea to take with you: {story['takeaway']} Think of a different class or school situation where the same question could help. You can write down one thing you would check and one person you could ask. That is enough for a useful next step; you do not have to solve every part today."
    )
    scene(
        "Your next step",
        ["Finish the lesson", "Check your understanding", "Keep asking good questions"],
        f"Thanks for thinking this through with me. Finish the activity and project on the lesson page, then try the separate quiz when you feel ready. If a question feels difficult, return to the example and explain your reasoning in your own words. {story['takeaway']} The goal is not to trust every answer. It is to know what to check and how to make a thoughtful choice."
    )
    videos.append({"id": lesson["id"], "title": lesson["title"], "scenes": scenes})

(root / "scripts/lesson-video-scripts.json").write_text(
    json.dumps(videos, indent=2, ensure_ascii=False) + "\n",
    encoding="utf-8"
)

for video in videos:
    words = sum(len(scene["narration"].split()) for scene in video["scenes"])
    print(f"{video['id']}: {words} words")
