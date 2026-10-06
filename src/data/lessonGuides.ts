export interface LessonGuide { workedTitle: string; scenario: string; steps: string[][]; mistake: string; tryPrompt: string; compare: string; takeaway: string }
export const lessonGuides: Record<string, LessonGuide> = {
  "patterns": {
    "workedTitle": "A sorter that learned the wrong clue",
    "scenario": "The eco-club photographed 40 cans on a blue desk and 40 bottles on a white desk. Its classifier gets every practice photo right. When a student puts a bottle on the blue desk, the classifier says 'can.' Let's work out what happened before we try to fix it.",
    "steps": [
      [
        "Name the job",
        "The intended job is to predict the object category: can or bottle. The input is a photograph; the label is the category assigned by a person. The desk color is part of the photograph, but it is not what we want the model to classify."
      ],
      [
        "Look for a shortcut",
        "In this small dataset, blue backgrounds always go with cans. That pattern is easier to use than details about the objects. A correct training answer does not tell us whether the model relied on the intended clue."
      ],
      [
        "Design a useful next test",
        "Photograph both categories on several backgrounds, in different lighting, and from new angles. Keep some new photographs aside for evaluation. Check whether predictions still depend on the background before using the sorter."
      ]
    ],
    "mistake": "“It got 100% on training photos, so it understands recycling.” That result only describes those photos. It does not reveal which visual clues the model learned.",
    "tryPrompt": "A plant classifier sees every rose indoors and every sunflower outdoors. Predict one error it might make. Describe two new photos that would help investigate your prediction.",
    "compare": "A rose photographed outdoors might be called a sunflower if the model relies on the setting. Test an outdoor rose and an indoor sunflower, then repeat across more varied examples. These examples investigate a possible shortcut; they do not prove the cause by themselves.",
    "takeaway": "Examples teach patterns. Testing tells you where those patterns stop helping."
  },
  "test-detective": {
    "workedTitle": "The model with a great score and a bad habit",
    "scenario": "A fictional bin scanner checks 20 items. Two are batteries; 18 are ordinary recyclables. The scanner calls every item 'ordinary recyclable.' A developer reports 90% accuracy. Should the school trust it to catch batteries?",
    "steps": [
      [
        "Recalculate the headline",
        "18 ordinary items are labeled correctly and two batteries are missed. Accuracy is 18 divided by 20, or 90%. The arithmetic is correct. The problem is what that number leaves out."
      ],
      [
        "Measure the important failure",
        "The scanner found zero of the two batteries. For the specific purpose of catching batteries, it failed on both relevant examples. Missing a battery can matter more than briefly stopping an ordinary can for review."
      ],
      [
        "Change the evaluation",
        "Report missed batteries and false alarms alongside accuracy. Include enough varied battery examples to investigate performance, keep a fresh test set, and use human inspection rather than relying on this small trial."
      ]
    ],
    "mistake": "“A high accuracy number means the tool is safe for its job.” The importance of a mistake depends on the task. Count the errors that matter, not only the easy successes.",
    "tryPrompt": "Another scanner finds both batteries but wrongly flags four ordinary items. Calculate its overall accuracy out of 20. Explain why it might still be more useful for this job, and name one drawback.",
    "compare": "It correctly identifies two batteries and 14 ordinary items, so its accuracy is 16/20 = 80%. It misses no batteries in this tiny sample, but four false alarms create extra review work. More varied testing is needed before concluding that it is reliable.",
    "takeaway": "Measure success against the real job, not just the biggest percentage."
  },
  "prompt-builder": {
    "workedTitle": "From “help with biology” to a study routine",
    "scenario": "Sam has a cell-biology quiz tomorrow. They recognize the organelle names in their notes but cannot explain their jobs without looking. Their first prompt, 'Tell me everything about cells,' produces a long explanation. Sam reads it and still cannot recall the ideas.",
    "steps": [
      [
        "Find the learning gap",
        "Sam needs retrieval practice: remembering and explaining an idea without seeing the answer. A longer summary does not directly target that gap. The task should ask Sam to do something, not just read."
      ],
      [
        "Write an actionable request",
        "Try: 'I am reviewing organelles at a tenth-grade level. Ask me one question about an organelle's job. Wait for my response. Then explain one error using a simple comparison. Do not show the answer first.'"
      ],
      [
        "Check for transfer",
        "Sam should compare the feedback with class notes, correct any mistakes, and then draw a cell from memory without help. The final independent task shows whether the practice transferred beyond the chat."
      ]
    ],
    "mistake": "“A better prompt is always a longer prompt.” Useful detail changes the task or response. Private details and repeated instructions can add length without helping.",
    "tryPrompt": "Choose a topic from your own class. Write a tutoring prompt that names one learning gap, requires your attempt first, and ends with an independent task.",
    "compare": "For algebra: 'I lose negative signs while distributing. Ask me one problem with a negative multiplier and wait. Give one hint if I get stuck, not the answer. After feedback, give a different problem for me to solve on paper.' Check the worked explanation against a reliable class example.",
    "takeaway": "Ask for a learning action, then leave room to do the thinking."
  },
  "fact-checker": {
    "workedTitle": "A real number inside a misleading sentence",
    "scenario": "An AI draft says, '80% of students at Cedar High want later club meetings, which proves later meetings improve grades.' The only source is a fictional survey of 25 robotics-club respondents: 20 prefer later meetings. It contains no questions about grades.",
    "steps": [
      [
        "Separate the claims",
        "There are at least three: 80% prefer later meetings; the result describes all students at Cedar High; and later meetings improve grades. Each needs its own evidence."
      ],
      [
        "Check the calculation and scope",
        "20 divided by 25 is 80%, so the percentage is correct for the respondents. But a robotics-club survey cannot establish the preference of the whole school. The sample limits the statement."
      ],
      [
        "Repair the sentence",
        "Write: 'In this survey, 20 of 25 responding robotics-club members preferred later meetings.' Remove the claim about grades because the source never measured them. A real citation cannot support a claim it does not address."
      ]
    ],
    "mistake": "“The link is real, so the paragraph is verified.” A source must support the exact claim, including its population, date, and meaning.",
    "tryPrompt": "A fictional survey finds that 9 of 12 chess-club respondents prefer online sign-ups. Repair this statement: '75% of all teenagers prefer online sign-ups because online forms make people attend more often.'",
    "compare": "9/12 is 75%, but it applies only to the 12 responding chess-club members. The survey gives no evidence about all teenagers or attendance effects. State the limited finding and remove the unsupported causal claim.",
    "takeaway": "Check the number, the people it describes, and what the evidence actually measured."
  },
  "fairness": {
    "workedTitle": "Same tool, different experience",
    "scenario": "A fictional speech tool gets 45 of 50 clips correct with one microphone and 10 of 20 correct with another. A club wants to use it as the only way students can submit spoken answers. The developer points to 55 correct clips overall.",
    "steps": [
      [
        "Put each count over its own total",
        "The first microphone's rate is 45/50 = 90%. The second is 10/20 = 50%. The overall rate is 55/70, about 79%. Averaging 90% and 50% would ignore that the sample sizes differ."
      ],
      [
        "Describe the gap without guessing its cause",
        "The test suggests performance differs under these microphone conditions. It does not establish whether the cause is hardware, recording setup, speaker differences, or another factor. Plan controlled comparisons to investigate."
      ],
      [
        "Protect participation now",
        "Allow typed answers and let students correct transcripts before grading. Assign a teacher to review disputed transcriptions. These safeguards support students while the performance gap is being studied."
      ]
    ],
    "mistake": "“More correct examples means a higher success rate.” You need the denominator. A larger group can have more correct answers and still have a lower rate.",
    "tryPrompt": "Room A has 18 correct transcripts out of 20; Room B has 8 out of 10. Calculate each rate and the combined rate. Propose an alternative for a student whose transcript is wrong.",
    "compare": "Room A is 90%; Room B is 80%; combined accuracy is 26/30, about 86.7%. Students could review and correct the transcript or submit text instead. Neither the average nor a small sample proves that every student will have the same experience.",
    "takeaway": "Make the denominators visible, and make the correction process usable."
  },
  "privacy": {
    "workedTitle": "Keep the learning goal. Remove the personal details.",
    "scenario": "A student wants help planning revision. Their draft prompt includes a friend's full name, home address, exact grades, and details about a family problem. None of those details are needed to show how to divide study time between algebra and biology.",
    "steps": [
      [
        "Identify what the task really needs",
        "A sample schedule needs subjects, available time, and a general study goal. It does not need the identity of the person, where they live, or sensitive background details."
      ],
      [
        "Rewrite with fictional information",
        "Try: 'Make a sample five-day plan for a fictional student with 30 minutes each day to review algebra and biology. Include short practice tasks and breaks.' This preserves the task without exposing a friend."
      ],
      [
        "Apply the assignment boundary",
        "If a teacher allows AI brainstorming but requires independent final writing, use the suggested structure as a starting point. Make your own decisions and disclose the brainstorming help. A disclosure does not make prohibited assistance permitted."
      ]
    ],
    "mistake": "“I removed the name, so the rest is anonymous.” A unique combination of school, activity, schedule, and personal details may still identify someone.",
    "tryPrompt": "Rewrite a request to analyze a real class contact list for a demonstration. Explain what fictional data you would use instead, and write a one-sentence disclosure of permitted AI assistance.",
    "compare": "Use invented names or anonymous labels and fictional contact fields, or remove contact fields entirely if the demonstration does not need them. A disclosure could say: 'AI suggested ways to organize fictional records; I chose the fields and checked the final example.'",
    "takeaway": "Share the problem you need help with, not someone else's private life."
  },
  "creative-brief": {
    "workedTitle": "Choose the design that does a job",
    "scenario": "You are inviting ninth graders to a study club on Tuesday in Room 4. Draft A says 'Unlock infinite potential' in decorative lettering. Draft B says 'Study together on Tuesday' and clearly lists Room 4. Both look attractive, but only one communicates the invitation quickly.",
    "steps": [
      [
        "Name your decision criteria",
        "The audience is ninth graders. The action is attending the study club. The constraints include accurate details, readable text, and a clear invitation. Judge both drafts with these same criteria."
      ],
      [
        "Compare a strength and a weakness",
        "Draft A might attract attention, but it does not explain what the event is. Draft B names an action and day, so it is clearer. Its layout might still need work to make the room easy to notice."
      ],
      [
        "Revise and test with a person",
        "Keep the clear headline and improve the layout. Ask someone to view it briefly and tell you what, when, and where. Check details with the organizer and provide the event information as accessible text online."
      ]
    ],
    "mistake": "“The more polished image is the better design.” A design succeeds when the audience can understand and use it, not merely when it looks elaborate.",
    "tryPrompt": "Write two headlines for a recycling poster that asks students to empty cans into the metal bin. Pick one using a clear criterion, then describe one readability or accessibility check.",
    "compare": "'Empty cans go in the metal bin' communicates the action more directly than 'Be a planet superhero.' A playful image can still support the clearer text. Test whether the instruction is readable from a few steps away and provide the same information as text in a digital version.",
    "takeaway": "A creative brief turns personal taste into a reasoned design decision."
  },
  "capstone": {
    "workedTitle": "A useful proposal is more than a demo",
    "scenario": "Your team proposes a helper that writes practice questions from a teacher-approved passage. A demo produces three good questions from one paragraph. The team wants to claim it is accurate for every subject. Work through what the demo does and does not establish.",
    "steps": [
      [
        "Bound the promise",
        "Say the prototype suggests practice questions from a provided passage. Do not claim it grades students, understands every subject, or knows school policy. Compare it with a simpler bank of teacher-written questions."
      ],
      [
        "Design a test that could reveal failure",
        "Use new passages from different topics and lengths. Check whether each question is answerable from the passage, whether the key is correct, and whether the level is appropriate. Record unsupported or confusing outputs."
      ],
      [
        "Make a decision proportional to the evidence",
        "One success supports a narrow statement about that example. Before a limited trial, have a teacher review questions, use non-private inputs, and offer a way to report mistakes. Clearly label plans that have not been tested."
      ]
    ],
    "mistake": "“We built a prototype, so our claims are proven.” Building and evaluating are different kinds of work. A proposal must distinguish what exists, what was tested, and what is still a plan.",
    "tryPrompt": "Your helper makes eight good questions and two unanswerable questions in a ten-question trial. Write an honest result statement and one change you would test before students rely on it.",
    "compare": "In this small trial, eight of ten questions were answerable and two were not. That is evidence of a limitation, not proof of reliability across topics. Add a passage-support check and teacher review, then evaluate revised behavior using fresh passages.",
    "takeaway": "Keep the claim, the evidence, and the human responsibilities connected."
  }
};
