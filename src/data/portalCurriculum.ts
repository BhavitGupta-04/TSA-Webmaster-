// Portal-only curriculum. Public website content stays in learningModules.ts.
export interface Question { prompt: string; options: string[]; answer: number; explanation: string }
export interface Lesson {
 id: string; unit: string; title: string; subtitle: string; tags: string[]; essential: string; goals: string[];
 sections: { title: string; body: string[]; example: string; check: Question }[];
 practice: { kind: 'sort' | 'metrics' | 'prompt' | 'fairness' | 'sequence'; title: string; intro: string; hint: string; options?: string[]; items?: {text: string; answer: string; why: string}[] | string[]; correct?: string[] };
 project: {title: string; brief: string; fields: string[]; rubric: string[]; model: string; stretch: string};
 terms: string[][]; quiz: Question[]; source: string; sourceName: string;
}
export const lessonMinutes = 35;
export const lessonXP = 100;
export const units = [
 {id:'fundamentals', title:'Meet the machine', description:'Data, patterns, and the limits of predictions.', badge:'Pattern Finder', number:'01'},
 {id:'tools', title:'Build your study toolkit', description:'Better prompts. Stronger evidence. Your own thinking.', badge:'Output Detective', number:'02'},
 {id:'ethics', title:'Responsible AI', description:'Treat people fairly. Protect privacy. Keep schoolwork honest.', badge:'Responsible Thinker', number:'03'},
 {id:'creativity', title:'Make something that matters', description:'A creative brief and your final AI proposal.', badge:'Thoughtful Creator', number:'04'},
];
export const lessons: Lesson[] = [
  {
    "id": "patterns",
    "unit": "fundamentals",
    "title": "How does a machine learn?",
    "subtitle": "Build a mental model of AI using something familiar: your school cafeteria.",
    "tags": [
      "Beginner",
      "Data",
      "Classification"
    ],
    "essential": "How can examples teach a computer a task without teaching it common sense?",
    "goals": [
      "Separate a fixed rule from a learned pattern.",
      "Identify features, labels, training, and inference.",
      "Explain why a prediction still needs checking."
    ],
    "sections": [
      {
        "title": "Start with a task, not a robot",
        "body": [
          "AI is a broad field of computing concerned with tasks such as recognizing patterns, planning, and generating language. It does not have to look like a robot. A speech recognizer on a phone and a system that sorts recycling can both use AI, even though they solve very different problems.",
          "A fixed rule tells a computer exactly what to do: if a message contains a banned phrase, block it. Machine learning takes another approach. People supply examples and a learning procedure adjusts a model so its predictions better match those examples. People still choose the task, data, and ways to measure success.",
          "Think of learning a sport. Seeing many examples can help you recognize a good pass, but practice on one court does not prepare you for every situation. The comparison has limits: a model fits patterns in data; it does not have a student's lived experience."
        ],
        "example": "A cafeteria sorter receives a photo and predicts paper, plastic, or metal. Its task is classification: choosing a category. It is not deciding whether recycling is morally good.",
        "check": {
          "prompt": "Which system is described as learning from examples?",
          "options": [
            "An alarm rings at exactly 7:00.",
            "A filter adjusts using messages labeled spam or not spam.",
            "A calculator follows a multiplication rule."
          ],
          "answer": 1,
          "explanation": "Look for the examples that change how the system makes predictions, rather than a fixed instruction."
        }
      },
      {
        "title": "Give your examples a useful shape",
        "body": [
          "An example is one item in a dataset. Features are pieces of information available to a model. A label is the target answer in supervised learning. In a recycling dataset, a photo is the input and 'metal' might be its label.",
          "Useful features should relate to the task. Color alone is a weak clue: both plastic and metal objects can be blue. A background can become an accidental shortcut if every can was photographed on the same desk. A model may use patterns its designers did not intend.",
          "Labels also need care. Two people might disagree about a coated paper cup. Before collecting thousands of examples, define the categories and what to do with uncertain cases. A larger pile of confusing examples does not automatically create a better system."
        ],
        "example": "One record might contain shape = cylinder, surface = shiny, label = metal. A student's name would not help classify the container and should not be collected.",
        "check": {
          "prompt": "For a supervised recycling model, which is a label?",
          "options": [
            "The photograph's brightness.",
            "The object's width.",
            "The category 'metal' assigned to the example."
          ],
          "answer": 2,
          "explanation": "Features describe the input; the label supplies the target category."
        }
      },
      {
        "title": "Training and using are different jobs",
        "body": [
          "Training is the process of adjusting a model using data. Inference is using a trained model to produce an output for a new input. If the cafeteria camera takes a fresh photograph and the model classifies it, that is inference.",
          "A prediction is the model's output, not a promise. A familiar-looking object can still be classified incorrectly. Some systems attach scores to outputs, but a high score is not the same as proof. The usefulness of those scores needs evaluation too.",
          "An ordinary chat message does not necessarily retrain the model you are talking to. Services may have separate data-retention or training policies. For this lesson, focus on the distinction: using a model and updating its learned parameters are different processes."
        ],
        "example": "First, fit a sorter using labeled photos. Next, send it a new bottle photo. Finally, let a person review uncertain cases rather than guessing where everything belongs.",
        "check": {
          "prompt": "A trained model receives a new bottle photo. What is happening?",
          "options": [
            "Inference.",
            "Labeling the original dataset.",
            "Training from scratch."
          ],
          "answer": 0,
          "explanation": "The model is being used on a new input. Its parameters do not have to change."
        }
      }
    ],
    "practice": {
      "kind": "sort",
      "title": "Build the recycling pipeline",
      "intro": "For each card, decide which part of the workflow it represents. Read the feedback and fix any mix-ups.",
      "options": [
        "Feature",
        "Label",
        "Training",
        "Inference"
      ],
      "items": [
        {
          "text": "The example's surface is shiny.",
          "answer": "Feature",
          "why": "This describes an input."
        },
        {
          "text": "A human marks a photo as plastic.",
          "answer": "Label",
          "why": "This provides the target answer."
        },
        {
          "text": "The model adjusts using 800 labeled examples.",
          "answer": "Training",
          "why": "Examples change the model's parameters."
        },
        {
          "text": "The model predicts metal for today's lunch can.",
          "answer": "Inference",
          "why": "A trained model is used on a new item."
        },
        {
          "text": "The object is 12 cm tall.",
          "answer": "Feature",
          "why": "Height describes the input, not the answer."
        },
        {
          "text": "An annotator marks an object as paper.",
          "answer": "Label",
          "why": "The annotator supplies a target category."
        }
      ],
      "hint": "Ask: is this information about an item, its target answer, a learning process, or a prediction?"
    },
    "project": {
      "title": "Design your own school helper",
      "brief": "Choose a small problem at school: sorting supplies, identifying plants, or organizing club messages. Design a classifier on paper here. Keep your example fictional.",
      "fields": [
        "Describe the task and the categories it will predict.",
        "Describe three useful input features and one label for an example.",
        "Describe a confusing case and how a person would check the prediction."
      ],
      "rubric": [
        "My task has specific categories.",
        "I separated inputs from target answers.",
        "I gave a concrete situation needing human review."
      ],
      "model": "A supplies sorter predicts pen, pencil, or marker. Inputs could include shape, cap, and visible tip; 'pencil' is a label. A capped mechanical pencil may resemble a pen, so a student should check it before sorting.",
      "stretch": "Would a simple rule solve your problem more cheaply? Explain when you would choose that instead."
    },
    "terms": [
      [
        "Model",
        "A system whose learned patterns map inputs to outputs."
      ],
      [
        "Feature",
        "Information available to a model about an input."
      ],
      [
        "Label",
        "The target answer attached to a supervised example."
      ],
      [
        "Inference",
        "Using a trained model on a new input."
      ]
    ],
    "quiz": [
      {
        "prompt": "A teacher labels 100 leaf photos by species. What are the labels?",
        "options": [
          "The camera settings.",
          "The species names.",
          "The photo sizes."
        ],
        "answer": 1,
        "explanation": "The species names are the target categories."
      },
      {
        "prompt": "Which is training?",
        "options": [
          "A student reads a prediction.",
          "A camera takes one new photo.",
          "A model adjusts its parameters using examples."
        ],
        "answer": 2,
        "explanation": "Training changes learned parameters using data."
      },
      {
        "prompt": "All metal items have a red background in the training photos. Why worry?",
        "options": [
          "The model may learn the background instead of the material.",
          "Red cannot appear in a photo.",
          "The model is certain to fail every time."
        ],
        "answer": 0,
        "explanation": "An accidental visual shortcut may not work in a real cafeteria."
      },
      {
        "prompt": "A model predicts paper with a high score. What follows?",
        "options": [
          "Paper is guaranteed.",
          "The prediction may still need checking.",
          "The input must have been in training."
        ],
        "answer": 1,
        "explanation": "Scores need evaluation and do not make individual outputs infallible."
      },
      {
        "prompt": "Which task is classification?",
        "options": [
          "Saving an unchanged file.",
          "Increasing screen brightness.",
          "Choosing a material category."
        ],
        "answer": 2,
        "explanation": "Classification assigns an input to a category."
      }
    ],
    "source": "https://developers.google.com/machine-learning/intro-to-ml/supervised",
    "sourceName": "Google: supervised learning"
  },
  {
    "id": "test-detective",
    "unit": "fundamentals",
    "title": "Can you trust the prediction?",
    "subtitle": "Become a data detective. Find the mistakes a good-looking accuracy score can hide.",
    "tags": [
      "Beginner",
      "Testing",
      "Data"
    ],
    "essential": "What evidence would convince you a model works on new examples?",
    "goals": [
      "Separate training, validation, and testing.",
      "Calculate accuracy on a small dataset.",
      "Describe overfitting and a real-world testing plan."
    ],
    "sections": [
      {
        "title": "An answer key is not a fair test",
        "body": [
          "Imagine memorizing the answers to a practice test and then receiving the identical test for a grade. A perfect score would tell us little about your ability to solve new problems. Evaluating a model only on examples it used during training has a similar problem.",
          "A training set is used to fit a model. A validation set helps developers choose between model settings. A test set is held aside for a later evaluation. Keeping these roles separate helps make evaluation more meaningful.",
          "Even a separate test set can be misleading if it is unlike the setting where the tool will be used. Testing cafeteria photos taken in bright daylight will not reveal every problem in a dim storage room. Describe both the dataset and the intended use."
        ],
        "example": "A club collects 100 original photos, sets aside a test group before training, and keeps near-duplicate images together so almost identical photos do not appear on both sides.",
        "check": {
          "prompt": "Which gives the fairest final test?",
          "options": [
            "Photographs used repeatedly to choose settings.",
            "Held-out photographs not used for training or tuning.",
            "Only the easiest training photographs."
          ],
          "answer": 1,
          "explanation": "Keep the final test independent of both learning and model selection."
        }
      },
      {
        "title": "Count the errors, then investigate them",
        "body": [
          "Accuracy is the number of correct predictions divided by the total predictions. If a model gets 8 of 10 examples right, its accuracy on that set is 80%. Always state which examples you measured. Ten examples are a small amount of evidence.",
          "A single number hides the type of mistake. A spam filter can block a real message or let spam through. These errors affect people differently. For a recycling helper, confusing two recyclable materials might be less serious than putting a battery into ordinary trash.",
          "Inspect mistakes by category and context. Does the model fail on crushed objects? On darker photos? On a rare category? Good evaluation asks where a tool fails, not just how often it succeeds."
        ],
        "example": "A classifier says 'not a battery' for every item. If only 1 of 100 items is a battery, it gets 99% accuracy while missing every battery. That is not a safe battery detector.",
        "check": {
          "prompt": "A detector misses every battery but has 99% accuracy. Why?",
          "options": [
            "Accuracy makes mistakes impossible.",
            "The battery labels must be wrong.",
            "The many non-battery items can hide failure on the rare class."
          ],
          "answer": 2,
          "explanation": "An imbalanced dataset can make overall accuracy look impressive while the important category fails."
        }
      },
      {
        "title": "Recognizing patterns versus memorizing them",
        "body": [
          "Overfitting happens when a model fits the training examples too closely, including details that do not generalize. Excellent training performance paired with much worse performance on new examples is a warning sign.",
          "Adding more representative data, simplifying a model, or improving how it is trained may help. No single fix guarantees success. First inspect the data and errors, then make a change and evaluate it appropriately.",
          "After release, conditions can change. New packaging, a different camera, or different users can alter the inputs. A responsible plan includes monitoring and a person who can stop or revise a system when its errors become unacceptable."
        ],
        "example": "A leaf model trained only on clean, flat leaves struggles with torn leaves on trees. Add varied examples and plan a fresh evaluation instead of repeatedly testing the same easy photos.",
        "check": {
          "prompt": "Which result suggests overfitting?",
          "options": [
            "99% on training examples and 58% on unseen examples.",
            "80% on training and 81% on unseen examples.",
            "A model with a short name."
          ],
          "answer": 0,
          "explanation": "The large performance gap is a clue that the learned patterns may not transfer."
        }
      }
    ],
    "practice": {
      "kind": "metrics",
      "title": "Accuracy is not the whole story",
      "intro": "Move the classification threshold in this fictional experiment. Scores at or above the threshold are labeled 'battery'. Inspect what changes, then answer the investigation questions.",
      "hint": "At a threshold of 50, count every row where prediction matches the true label. Then inspect the missed battery."
    },
    "project": {
      "title": "Write a testing plan",
      "brief": "Your school wants to use a camera to find batteries in recycling. Propose a test before it is used.",
      "fields": [
        "Describe the held-out examples you would collect, including at least two different conditions.",
        "Describe one harmful mistake and how you would measure it separately from accuracy.",
        "Describe who reviews errors and when the system should stop being used."
      ],
      "rubric": [
        "My test includes unseen examples and different conditions.",
        "I explained a specific costly mistake.",
        "I named a human review or stop rule."
      ],
      "model": "Keep a fresh set of battery and non-battery photos from different lighting and camera angles. Count missed batteries separately because they need special handling. A staff member reviews uncertain items and pauses use if missed batteries keep appearing.",
      "stretch": "Suppose you tune the threshold repeatedly using your test examples. Why might you need another independent evaluation?"
    },
    "terms": [
      [
        "Accuracy",
        "Correct predictions divided by all predictions in the measured set."
      ],
      [
        "Test set",
        "Examples held apart from training and tuning for evaluation."
      ],
      [
        "Overfitting",
        "Learning details of the training data that do not transfer well."
      ],
      [
        "Threshold",
        "A cutoff used to turn a score into a decision."
      ]
    ],
    "quiz": [
      {
        "prompt": "9 of 12 predictions are correct. What is the accuracy?",
        "options": [
          "75%.",
          "12%.",
          "90%."
        ],
        "answer": 0,
        "explanation": "9 divided by 12 equals 0.75."
      },
      {
        "prompt": "What is a validation set used for?",
        "options": [
          "Replacing all training examples.",
          "Choosing model settings without using the final test set.",
          "Making every output true."
        ],
        "answer": 1,
        "explanation": "Validation supports model selection; a separate test supports final evaluation."
      },
      {
        "prompt": "A model does well on training photos and poorly on new photos. Investigate:",
        "options": [
          "Whether its logo is clear.",
          "Only the number of people using it.",
          "Overfitting and differences between datasets."
        ],
        "answer": 2,
        "explanation": "Both overfitting and different input conditions can explain the gap."
      },
      {
        "prompt": "Why measure missed batteries separately?",
        "options": [
          "Their consequences can differ from other mistakes.",
          "Accuracy already guarantees none are missed.",
          "They cannot be counted."
        ],
        "answer": 0,
        "explanation": "Error types can have different costs."
      },
      {
        "prompt": "A new camera changes the images. What next?",
        "options": [
          "Stop collecting evidence.",
          "Re-evaluate under the new conditions.",
          "Assume the old result proves reliability."
        ],
        "answer": 1,
        "explanation": "Performance evidence is tied to the conditions tested."
      }
    ],
    "source": "https://developers.google.com/machine-learning/crash-course/overfitting/overfitting",
    "sourceName": "Google: overfitting"
  },
  {
    "id": "prompt-builder",
    "unit": "tools",
    "title": "Make AI a study partner",
    "subtitle": "Turn “help me” into a useful study routine that leaves the thinking to you.",
    "tags": [
      "Beginner",
      "Prompting",
      "Study skills"
    ],
    "essential": "How can you ask for help without handing over the learning?",
    "goals": [
      "Build prompts with a task, context, format, and boundary.",
      "Compare a vague prompt with a focused one.",
      "Plan an attempt, feedback, and independent practice cycle."
    ],
    "sections": [
      {
        "title": "Start with what you need to learn",
        "body": [
          "Before opening a tool, ask what you should be able to do afterward. 'Get the worksheet finished' is different from 'solve a linear equation and explain each step.' A useful study prompt supports the second goal.",
          "Include the task and relevant context. State the topic, level, and what you have already tried. A tutor can respond more usefully to 'I keep losing the negative sign when distributing' than to 'I am bad at math.' Avoid including names, grades, or private records when a fictional example will do.",
          "A prompt is an instruction, not a spell. Extra words do not guarantee a better answer. Give details that affect the response, then check whether the output actually fits your need."
        ],
        "example": "Try: 'I am practicing distribution in ninth-grade algebra. Give me one problem with a negative multiplier. Wait for my attempt before explaining.'",
        "check": {
          "prompt": "Which goal most clearly supports learning?",
          "options": [
            "Finish every answer for me.",
            "Help me explain why distributing a negative changes each sign.",
            "Write something impressive."
          ],
          "answer": 1,
          "explanation": "This specifies an understanding the student can demonstrate."
        }
      },
      {
        "title": "Give the response a format and a boundary",
        "body": [
          "A format tells the tool what shape the help should take: one question at a time, a table, a short example, or a hint. A boundary tells it what not to take over: do not give the solution before my attempt, or use only the notes I provide.",
          "Compare 'Explain cells' with 'Ask one question about organelles, wait for my answer, then explain one mistake in two sentences.' The second creates a repeatable practice routine instead of a wall of text.",
          "The tool may still ignore instructions or make mistakes. Your boundary is a request you must check. If a response gives away the solution, stop reading it and try a fresh problem independently."
        ],
        "example": "A biology prompt can request vocabulary definitions and a quiz. A history prompt can request questions about a provided passage without inventing facts beyond that passage.",
        "check": {
          "prompt": "Which instruction creates room for your own attempt?",
          "options": [
            "Give the full solution first.",
            "Make the answer longer.",
            "Wait for my answer before giving feedback."
          ],
          "answer": 2,
          "explanation": "Waiting preserves an opportunity for retrieval and reasoning."
        }
      },
      {
        "title": "Use a feedback loop",
        "body": [
          "A helpful routine is attempt, inspect feedback, revise, and try a different example without help. The last step matters: understanding an explanation while looking at it is not the same as doing the task yourself.",
          "When feedback is unclear, ask a specific follow-up. 'Define that word and show a smaller example' gives the tool a concrete change to make. Check factual or numerical explanations against class materials or your own calculation.",
          "Notice when the tool is unnecessary. A short teacher example, a classmate's explanation, or working on paper may be more useful than another generated paragraph. The objective is to learn the subject, not to maximize time in a chatbot."
        ],
        "example": "After a hint on 3(x − 2) = 12, solve a new equation such as 2(x + 4) = 18 without assistance. Explain why your operations preserve equality.",
        "check": {
          "prompt": "What best checks independent understanding?",
          "options": [
            "Solve a new related problem without help.",
            "Read the same solution again.",
            "Ask the tool if you are smart."
          ],
          "answer": 0,
          "explanation": "Transfer to a fresh example provides stronger evidence than recognition."
        }
      }
    ],
    "practice": {
      "kind": "prompt",
      "title": "Your prompt workshop",
      "intro": "Build a study prompt from four pieces. The preview is assembled locally, not sent to an AI service. Check its specificity, then improve one piece.",
      "hint": "Choose one current topic. Request one question at a time and a way to verify any explanation."
    },
    "project": {
      "title": "Plan a ten-minute study session",
      "brief": "Choose a real class topic but use no private information. Write a plan you could use with a teacher-approved tool or a classmate.",
      "fields": [
        "Write your final study prompt with topic, context, response format, and a learning boundary.",
        "Describe the attempt you will make before reading feedback and how you will check the feedback.",
        "Write a fresh practice task you could do without AI to check your understanding."
      ],
      "rubric": [
        "My prompt asks for a specific learning action.",
        "I included an attempt and a verification step.",
        "My final task is independent of the AI response."
      ],
      "model": "Ask for one question comparing plant and animal cells, wait for my answer, then point out one misconception. I will check the explanation in class notes. Finally, I will draw and label both cell types without help.",
      "stretch": "How would your prompt change if you needed revision practice rather than an introduction to the topic?"
    },
    "terms": [
      [
        "Prompt",
        "The instruction or input you give an AI system."
      ],
      [
        "Context",
        "Relevant background that helps define the task."
      ],
      [
        "Constraint",
        "A boundary for the requested response."
      ],
      [
        "Retrieval practice",
        "Recalling an idea yourself before checking an answer."
      ]
    ],
    "quiz": [
      {
        "prompt": "Which detail is useful context?",
        "options": [
          "Your home address.",
          "A classmate's private report card.",
          "The topic and the step you find confusing."
        ],
        "answer": 2,
        "explanation": "Task-relevant context helps without unnecessary personal data."
      },
      {
        "prompt": "Which is a response format?",
        "options": [
          "Ask one question at a time.",
          "Be intelligent.",
          "Know everything."
        ],
        "answer": 0,
        "explanation": "This describes an observable structure for the interaction."
      },
      {
        "prompt": "A detailed prompt guarantees:",
        "options": [
          "Teacher permission.",
          "Neither accuracy nor permission.",
          "Perfect facts."
        ],
        "answer": 1,
        "explanation": "Prompt detail cannot remove the need to verify or follow assignment rules."
      },
      {
        "prompt": "Feedback uses an unfamiliar word. What next?",
        "options": [
          "Abandon the subject.",
          "Copy it anyway.",
          "Ask for a definition and a small worked example."
        ],
        "answer": 2,
        "explanation": "A specific follow-up helps target the obstacle."
      },
      {
        "prompt": "What is a good final study step?",
        "options": [
          "Try a new problem without help.",
          "Submit a generated response.",
          "Ask for more answers forever."
        ],
        "answer": 0,
        "explanation": "Independent practice checks whether you can apply the idea."
      }
    ],
    "source": "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research",
    "sourceName": "UNESCO: guidance for AI in education"
  },
  {
    "id": "fact-checker",
    "unit": "tools",
    "title": "Become an output detective",
    "subtitle": "Spot convincing mistakes, check evidence, and repair a study answer.",
    "tags": [
      "Core",
      "Verification",
      "Generative AI"
    ],
    "essential": "How do you turn a plausible answer into a claim you can actually support?",
    "goals": [
      "Explain why fluent text can still be wrong.",
      "Distinguish a relevant source from a merely related one.",
      "Use a repeatable claim, evidence, and revision workflow."
    ],
    "sections": [
      {
        "title": "Fluent does not mean factual",
        "body": [
          "Generative AI produces new content from learned patterns. A language model generates sequences of tokens, which are chunks of text. Producing plausible language is not the same as verifying every statement against the world.",
          "A response can invent a citation, merge details from different events, or make a subtle calculation error. These errors are often called hallucinations or confabulations. A polite tone, confident wording, or impressive formatting does not tell you whether the claim is supported.",
          "Some tools can retrieve documents or use other software. That can provide useful evidence, but the final explanation still needs checking. Separate what the source actually says from what the model adds."
        ],
        "example": "A chatbot can produce a perfectly formatted reference to a book that does not exist. Search for the publication itself before treating the reference as evidence.",
        "check": {
          "prompt": "A response looks professional. What does that establish?",
          "options": [
            "Every claim has been verified.",
            "Nothing by itself about factual correctness.",
            "The author read all original sources."
          ],
          "answer": 1,
          "explanation": "Presentation is separate from evidence."
        }
      },
      {
        "title": "Match the evidence to the exact claim",
        "body": [
          "Break a long answer into checkable claims. Instead of asking whether a paragraph 'sounds right,' identify the name, number, date, cause, or quotation that needs support. Then find a source that could actually establish it.",
          "Ask who produced the source, what evidence it offers, and whether its date and context fit the claim. A source about electric vehicles does not automatically support a specific claim about your school's bus fleet.",
          "For a quotation, check the exact words and surrounding passage. For a number, check the units, sample, and calculation. For an image, ask where it came from and whether the caption accurately describes it. If you cannot verify something, label it uncertain or leave it out."
        ],
        "example": "A fictional school report says 40 of 50 surveyed students walk to school. That supports '80% of respondents walk,' not '80% of every student in the district walks.'",
        "check": {
          "prompt": "A survey of 50 club members supports which claim?",
          "options": [
            "All teenagers agree.",
            "The whole country agrees.",
            "A statement about those surveyed club members."
          ],
          "answer": 2,
          "explanation": "The group measured limits the claim you can support."
        }
      },
      {
        "title": "Revise, don't just attach a link",
        "body": [
          "After checking a claim, decide whether to keep it, narrow it, correct it, or remove it. Adding a real link to a false statement does not repair the statement. Your words need to match the evidence.",
          "Use an evidence log: claim, source, what the source actually says, and your decision. This makes it easier to explain your process to a teacher and to spot unsupported leaps in your own reasoning.",
          "Not every uncertainty can be solved immediately. 'I could not verify this date' is more responsible than inventing confidence. For schoolwork, use assignment-approved sources and ask your teacher when the evidence is unclear."
        ],
        "example": "Change 'all students preferred the new schedule' to '18 of the 25 students in this survey preferred it.' The second statement is narrower but better supported.",
        "check": {
          "prompt": "A real source contradicts the generated claim. What should you do?",
          "options": [
            "Correct or remove the claim.",
            "Keep the claim and add the link.",
            "Ask for more confident wording."
          ],
          "answer": 0,
          "explanation": "Evidence should change the answer, not just decorate it."
        }
      }
    ],
    "practice": {
      "kind": "sort",
      "title": "The evidence desk",
      "intro": "Use this fictional source card only: 'Cedar Club survey: 20 members responded in April. 12 preferred morning meetings, 6 preferred afternoons, 2 had no preference.' Classify each generated claim.",
      "options": [
        "Supported",
        "Contradicted",
        "Not established"
      ],
      "items": [
        {
          "text": "12 respondents preferred morning meetings.",
          "answer": "Supported",
          "why": "The source states this directly."
        },
        {
          "text": "60% of respondents preferred mornings.",
          "answer": "Supported",
          "why": "12 divided by 20 is 60%."
        },
        {
          "text": "Most students at the entire school prefer mornings.",
          "answer": "Not established",
          "why": "A club survey does not represent the whole school."
        },
        {
          "text": "No respondents preferred afternoons.",
          "answer": "Contradicted",
          "why": "The source says six did."
        },
        {
          "text": "Morning meetings cause better grades.",
          "answer": "Not established",
          "why": "The survey did not measure grades or causation."
        },
        {
          "text": "Two respondents had no preference.",
          "answer": "Supported",
          "why": "This matches the source card."
        }
      ],
      "hint": "Check the population and the exact number. Absence of evidence is different from evidence that a claim is false."
    },
    "project": {
      "title": "Write an evidence log",
      "brief": "Using the Cedar Club survey, repair this generated sentence: 'All students want morning meetings because mornings improve their grades.'",
      "fields": [
        "List the separate claims in the sentence and classify each.",
        "Write a corrected sentence that matches the source and includes its limited scope.",
        "Explain what extra evidence would be needed to investigate the claim about grades."
      ],
      "rubric": [
        "I separated preference, population, and causation.",
        "My revision uses the actual sample and numbers.",
        "I described evidence beyond the existing survey."
      ],
      "model": "The survey only concerns 20 club respondents. A supported revision is: '12 of the 20 responding Cedar Club members preferred morning meetings.' Investigating grades would need a study measuring academic outcomes and considering other explanations.",
      "stretch": "Could a survey of preferences ever prove what caused a change in grades? Explain a limitation."
    },
    "terms": [
      [
        "Token",
        "A chunk of text processed by a language model."
      ],
      [
        "Hallucination",
        "Generated content that presents incorrect or unsupported information as fact."
      ],
      [
        "Evidence",
        "Information that supports or challenges a specific claim."
      ],
      [
        "Scope",
        "The people, period, or conditions a statement covers."
      ]
    ],
    "quiz": [
      {
        "prompt": "A citation in AI output is:",
        "options": [
          "Proof the claim is correct.",
          "A lead that you should investigate.",
          "Always invented."
        ],
        "answer": 1,
        "explanation": "It can be useful, incorrect, or irrelevant; inspect it."
      },
      {
        "prompt": "15 of 25 respondents agree. What percentage is that?",
        "options": [
          "15%.",
          "75%.",
          "60%."
        ],
        "answer": 2,
        "explanation": "15 divided by 25 equals 0.6."
      },
      {
        "prompt": "A source is on the right topic but does not support the exact claim. It is:",
        "options": [
          "Insufficient support for that claim.",
          "Enough because the topic matches.",
          "Proof of causation."
        ],
        "answer": 0,
        "explanation": "Relevance to the exact claim matters."
      },
      {
        "prompt": "What should an evidence log include?",
        "options": [
          "Only the AI tool's name.",
          "Claim, source, what it says, and your decision.",
          "Only how confident the output sounds."
        ],
        "answer": 1,
        "explanation": "A log connects each conclusion to actual evidence."
      },
      {
        "prompt": "A claim cannot be verified. What is responsible?",
        "options": [
          "Invent a publication.",
          "Repeat it until it feels true.",
          "Label it uncertain or leave it out."
        ],
        "answer": 2,
        "explanation": "Do not turn missing evidence into certainty."
      }
    ],
    "source": "https://www.nist.gov/itl/ai-risk-management-framework",
    "sourceName": "NIST: AI risk management and generative AI profile"
  },
  {
    "id": "fairness",
    "unit": "ethics",
    "title": "Who does the system work for?",
    "subtitle": "Investigate a school speech tool and learn to look beyond the average.",
    "tags": [
      "Core",
      "Fairness",
      "Data"
    ],
    "essential": "Can a tool look successful overall while letting some students down?",
    "goals": [
      "Compare group results using rates instead of raw counts.",
      "Identify representation and accessibility gaps.",
      "Propose a safeguard and an appeal process."
    ],
    "sections": [
      {
        "title": "An average can hide someone's experience",
        "body": [
          "Imagine a speech-to-text tool used to submit classroom answers. If it works well for one set of speakers and poorly for another, the same assignment becomes harder for some students. A high overall accuracy number can hide that difference.",
          "Start by asking who was included in the training and evaluation. Different accents, recording conditions, speech patterns, or assistive technologies may affect performance. Missing examples are one possible source of a gap, but not the only one.",
          "A performance difference is a signal to investigate, not a complete explanation of its cause. Examine the input conditions, labels, design, and intended use before claiming you know why it happened."
        ],
        "example": "If a speech tool gets 90 of 100 clips right overall, ask which ten were missed and who is affected by those errors.",
        "check": {
          "prompt": "Why inspect results across users and conditions?",
          "options": [
            "To make the report longer.",
            "Because an overall number can hide unequal performance.",
            "Because all differences prove intentional discrimination."
          ],
          "answer": 1,
          "explanation": "A gap matters, but its cause still needs investigation."
        }
      },
      {
        "title": "Compare like with like",
        "body": [
          "Raw counts can mislead when groups have different sizes. If one set has 90 correct answers and another has 18, you need to know the totals. Ninety out of 100 and 18 out of 20 are both 90%.",
          "Use rates with clear denominators. Also consider sample size: two successful examples do not provide as much evidence as many varied examples. A test should reflect the people and circumstances of the intended use.",
          "Fairness is not solved by one metric. Ask what errors mean for people, who can correct them, and whether an alternative is available. Equal error rates alone do not answer every question about a system's purpose or consequences."
        ],
        "example": "In the practice lab, use the correct count divided by the number tested. Compare the rates before choosing whether the tool is ready for a required assignment.",
        "check": {
          "prompt": "Group A: 90/100 correct. Group B: 18/20 correct. Which is true?",
          "options": [
            "A has a higher accuracy rate.",
            "B has a higher accuracy rate.",
            "Both have a 90% accuracy rate."
          ],
          "answer": 2,
          "explanation": "Compare proportions, not just the number of correct predictions."
        }
      },
      {
        "title": "Build a safeguard people can use",
        "body": [
          "A useful safeguard changes what happens to a person. 'We care about fairness' is a value; 'students can submit typed answers and correct transcripts before grading' is an actionable design choice.",
          "For consequential decisions, give people a way to question the result and reach an accountable human. A flag from a tool should not be the only evidence used to judge someone. Keep the review process understandable and accessible.",
          "Keep evaluating after a change. Adding examples or changing software might improve one condition without solving another. Record the remaining limits and do not promise that a small test proves fairness for everyone."
        ],
        "example": "Before requiring a speech tool, offer a typed option, let students review transcripts, and identify a teacher who can correct errors without penalty.",
        "check": {
          "prompt": "Which is a concrete safeguard?",
          "options": [
            "Allow transcript correction and an accessible alternative before grading.",
            "Add a slogan about fairness.",
            "Hide the error rate."
          ],
          "answer": 0,
          "explanation": "It gives students a practical way to avoid or fix harm."
        }
      }
    ],
    "practice": {
      "kind": "fairness",
      "title": "Audit a fictional speech tool",
      "intro": "This invented dataset compares two recording conditions, not demographic groups. Clear room: 36/40 transcriptions correct. Noisy room: 12/20 correct. Calculate the rates and decide what the average hides.",
      "hint": "Divide each correct count by its own total. For the overall rate, add the correct counts and then divide by all 60 clips."
    },
    "project": {
      "title": "Write a student-first deployment decision",
      "brief": "A school wants to require the tool from the audit for spoken homework. Decide whether and how it should be used.",
      "fields": [
        "Use the group and overall results to explain a limitation.",
        "Describe two concrete safeguards, including an alternative way to submit work.",
        "Explain how a student could challenge a bad transcript and what should be tested next."
      ],
      "rubric": [
        "I used rates with the correct denominators.",
        "My safeguards change what happens to students.",
        "My plan includes review and further evaluation."
      ],
      "model": "The overall 80% rate hides 90% in clear rooms and 60% in noisy rooms. Do not make speech entry the only option. Allow typed submissions and student correction, with teacher review of disputes. Test more microphones and environments before expanding use.",
      "stretch": "Why is this small test insufficient to claim the system works equally well for every student?"
    },
    "terms": [
      [
        "Representation",
        "Who or what is included in a dataset."
      ],
      [
        "Error rate",
        "The proportion of evaluated predictions that are wrong."
      ],
      [
        "Accessibility",
        "Whether people with different needs can use something effectively."
      ],
      [
        "Appeal",
        "A way to question a decision and request review."
      ]
    ],
    "quiz": [
      {
        "prompt": "A group has 12 correct out of 20. Its accuracy is:",
        "options": [
          "60%.",
          "12%.",
          "80%."
        ],
        "answer": 0,
        "explanation": "12/20 = 60%."
      },
      {
        "prompt": "Why offer a typed alternative to speech entry?",
        "options": [
          "To guarantee equal outcomes forever.",
          "To avoid making speech recognition errors a barrier to participation.",
          "To conceal all errors."
        ],
        "answer": 1,
        "explanation": "A practical alternative supports students when the tool fails."
      },
      {
        "prompt": "An observed performance gap proves:",
        "options": [
          "Exactly who caused it.",
          "That more data always fixes it.",
          "That further investigation is needed, not one specific cause."
        ],
        "answer": 2,
        "explanation": "Many data and design factors can contribute."
      },
      {
        "prompt": "Which comparison is meaningful?",
        "options": [
          "90/100 versus 18/20.",
          "Whichever interface looks nicer.",
          "90 correct versus 18 correct without totals."
        ],
        "answer": 0,
        "explanation": "Denominators let you compare rates."
      },
      {
        "prompt": "A student challenges an AI result. What should happen?",
        "options": [
          "The student's name is published.",
          "An accountable person reviews the evidence and hears the student.",
          "The model automatically overrules the student."
        ],
        "answer": 1,
        "explanation": "Review should be human, accessible, and respectful."
      }
    ],
    "source": "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics",
    "sourceName": "UNESCO: ethics of artificial intelligence"
  },
  {
    "id": "privacy",
    "unit": "ethics",
    "title": "Use AI without crossing the line",
    "subtitle": "Protect personal information and show honestly how your schoolwork was made.",
    "tags": [
      "Beginner",
      "Privacy",
      "Academic integrity"
    ],
    "essential": "What should you keep out of a prompt, and what should you disclose?",
    "goals": [
      "Remove unnecessary personal details from a task.",
      "Distinguish permitted help from doing the assignment for someone.",
      "Write a specific AI-use disclosure."
    ],
    "sections": [
      {
        "title": "Share the task, not someone's life",
        "body": [
          "A study tool usually needs the problem, not your full identity. Before pasting anything, ask which details are necessary. A fictional schedule can demonstrate planning without revealing a classmate's grades, address, or personal circumstances.",
          "Removing a name is not always enough. A unique combination of class, activity, and personal detail might still identify a person. Prefer invented examples when you are only demonstrating an idea.",
          "Do not assume a chat is private or temporary. Tools differ in how they store and use data. For school activities, follow the school's approved-tool guidance and avoid uploading another person's information without permission."
        ],
        "example": "Instead of 'Here is Maya's named report card and address,' use 'Create a sample plan for a fictional student with two subjects to review.'",
        "check": {
          "prompt": "What is the best input for a demonstration study plan?",
          "options": [
            "A class contact list.",
            "Fictional subjects and times.",
            "Someone else's private report card."
          ],
          "answer": 1,
          "explanation": "Invented details can demonstrate the task without exposing a real person."
        }
      },
      {
        "title": "The assignment sets the boundary",
        "body": [
          "Different assignments permit different kinds of assistance. One teacher may allow brainstorming with disclosure; another may want an independent first draft. Read the specific instructions before using a tool. If they are unclear, ask the teacher.",
          "An allowed tool does not make every use allowed. Having AI explain a practice example is different from submitting its answer as your independent assessment. The relevant question is which thinking the assignment asks you to demonstrate.",
          "Keep drafts and notes that show your process. They help you explain what you learned and what you changed. Treat automated authorship flags as imperfect signals, not as a substitute for looking at evidence and hearing the student."
        ],
        "example": "In this lesson's fictional assignment, AI may suggest brainstorming questions, but the final paragraph must be your own and assistance must be disclosed.",
        "check": {
          "prompt": "A teacher allows brainstorming only. Which fits?",
          "options": [
            "Submit an AI-written final paragraph.",
            "Let AI rewrite the whole assessment.",
            "Use suggested questions, then write and disclose your own work."
          ],
          "answer": 2,
          "explanation": "Follow the particular boundary in the assignment."
        }
      },
      {
        "title": "Disclose what actually happened",
        "body": [
          "A useful disclosure is specific: what tool or kind of tool helped, what it did, and what you did yourself. 'I used technology' does not explain much. 'AI suggested three practice questions; I answered them and checked the explanations' is more informative.",
          "Do not claim you verified something unless you actually checked it. A disclosure can mention limits too: 'I discarded a suggested statistic because I could not find its source.' Honesty matters more than making the process sound perfect.",
          "Disclosure is not permission after the fact. You still need to follow the assignment rules and cite the sources you used according to its requirements. Transparency helps people understand the work; it does not erase those requirements."
        ],
        "example": "A process note: 'AI helped brainstorm possible project topics. I selected the topic, researched the evidence in our textbook, and wrote the final explanation.'",
        "check": {
          "prompt": "Which disclosure is clearest?",
          "options": [
            "AI suggested topics; I researched and wrote the final explanation.",
            "No help was used, even though AI drafted it.",
            "A computer did something."
          ],
          "answer": 0,
          "explanation": "It distinguishes assistance from your own contribution."
        }
      }
    ],
    "practice": {
      "kind": "sort",
      "title": "Permission, privacy, or proceed?",
      "intro": "Fictional assignment rule: AI brainstorming is allowed with disclosure; final writing must be your own. Sort each action using that rule.",
      "options": [
        "Fits the rule",
        "Needs permission or clarification",
        "Do not share private data"
      ],
      "items": [
        {
          "text": "Ask for possible project questions using fictional examples.",
          "answer": "Fits the rule",
          "why": "Brainstorming is permitted; disclose it in the finished work."
        },
        {
          "text": "Upload a friend's named report card.",
          "answer": "Do not share private data",
          "why": "The task does not need someone else's private records."
        },
        {
          "text": "Ask AI to rewrite the whole final paragraph.",
          "answer": "Needs permission or clarification",
          "why": "This exceeds brainstorming and conflicts with independent writing; do not proceed under the current rule."
        },
        {
          "text": "Paste a list of students' phone numbers.",
          "answer": "Do not share private data",
          "why": "Private contact data is unnecessary."
        },
        {
          "text": "Write your paragraph yourself and describe AI's brainstorming role.",
          "answer": "Fits the rule",
          "why": "This follows both the writing and disclosure requirements."
        },
        {
          "text": "Use AI on a different assignment with no stated policy.",
          "answer": "Needs permission or clarification",
          "why": "Ask that teacher before assuming the same rule applies."
        }
      ],
      "hint": "First check for private information. Then compare the requested assistance with this assignment's exact rule."
    },
    "project": {
      "title": "Repair an unsafe study request",
      "brief": "A fictional student wants to paste a friend's named grades and family details into a chatbot to request a study schedule. Rewrite the request and explain the boundary.",
      "fields": [
        "Write a replacement prompt using only invented or necessary task details.",
        "Explain which information you removed and why the tool did not need it.",
        "Write an honest sample disclosure for AI-assisted brainstorming on an assignment that permits it."
      ],
      "rubric": [
        "My replacement does not identify a real person.",
        "I connected each removed detail to necessity.",
        "My disclosure names the assistance and human work."
      ],
      "model": "Plan a sample week for a fictional student reviewing algebra and biology for 30 minutes a day. Names, exact grades, and family details are unnecessary. Disclosure: 'AI suggested schedule structures. I chose the activities and adjusted the plan myself.'",
      "stretch": "How could several harmless-looking details combine to identify someone even after their name is removed?"
    },
    "terms": [
      [
        "Data minimization",
        "Using only the personal information necessary for a task."
      ],
      [
        "Disclosure",
        "An honest explanation of assistance used."
      ],
      [
        "Academic integrity",
        "Following learning expectations and representing your work honestly."
      ],
      [
        "Consent",
        "Permission for a particular use, not blanket approval for every use."
      ]
    ],
    "quiz": [
      {
        "prompt": "Removing a name from detailed personal records:",
        "options": [
          "Makes sharing automatically permitted.",
          "Always prevents identification.",
          "May still leave identifying combinations of details."
        ],
        "answer": 2,
        "explanation": "Combinations of details can reveal identity."
      },
      {
        "prompt": "Assignment rules are unclear. What next?",
        "options": [
          "Ask the teacher before using AI for that task.",
          "Assume anything is allowed.",
          "Use a hidden account."
        ],
        "answer": 0,
        "explanation": "The assignment's expectations determine acceptable assistance."
      },
      {
        "prompt": "Does disclosure make a prohibited use acceptable?",
        "options": [
          "Only if it is long.",
          "No; permission and disclosure are separate.",
          "Always."
        ],
        "answer": 1,
        "explanation": "Transparency does not override the rule."
      },
      {
        "prompt": "Which detail does a fictional study-plan demo need?",
        "options": [
          "A full class roster.",
          "A friend's phone number.",
          "Sample subjects and available study time."
        ],
        "answer": 2,
        "explanation": "Only task-relevant sample information is needed."
      },
      {
        "prompt": "What belongs in a process note?",
        "options": [
          "What AI helped with and what you did yourself.",
          "A claim of no assistance when AI was used.",
          "Only the final grade."
        ],
        "answer": 0,
        "explanation": "A specific account makes the process understandable."
      }
    ],
    "source": "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research",
    "sourceName": "UNESCO: education, agency, and privacy"
  },
  {
    "id": "creative-brief",
    "unit": "creativity",
    "title": "Create with a purpose",
    "subtitle": "Build a school campaign that communicates something, not just something that looks polished.",
    "tags": [
      "Core",
      "Design",
      "Creativity"
    ],
    "essential": "What makes an AI-assisted idea useful for a real audience?",
    "goals": [
      "Write a brief with audience, purpose, and constraints.",
      "Compare ideas against the same criteria.",
      "Plan a human revision and accessibility check."
    ],
    "sections": [
      {
        "title": "Decide what success looks like",
        "body": [
          "A creative brief is a short description of who you are making something for, what it should achieve, and what limits it must follow. It helps you judge ideas instead of being distracted by the first impressive result.",
          "For a school recycling campaign, 'make a cool poster' gives little direction. 'Help ninth graders put empty cans in the labeled metal bin after lunch' describes an audience and a concrete action.",
          "Constraints can make ideas better. A short headline, readable lettering, accurate details, and a clear place to act force you to prioritize. They also provide a checklist for reviewing generated suggestions."
        ],
        "example": "Brief: audience = students leaving lunch; action = empty cans into the metal bin; constraints = six-word headline, readable from a few steps away, and no unsupported environmental statistics.",
        "check": {
          "prompt": "Which brief defines a concrete action?",
          "options": [
            "Make something amazing.",
            "Help students put empty cans in the metal bin.",
            "Use as many visual effects as possible."
          ],
          "answer": 1,
          "explanation": "A specific audience action gives the design a purpose."
        }
      },
      {
        "title": "Compare directions before choosing",
        "body": [
          "Ask for several genuinely different approaches: a direct instruction, a question, and a playful slogan. Then compare them against the same brief. Generating more variants is useful only if you make a thoughtful selection.",
          "A clever slogan can fail if people cannot tell what to do. A visually dramatic idea can fail if the text is hard to read. Explain both a strength and a weakness of each candidate before combining or revising them.",
          "AI can help suggest possibilities, but you remain responsible for the final decisions. Keep the discarded directions and your reasons. They show design thinking more clearly than a polished result alone."
        ],
        "example": "Compare 'Metal magic!' with 'Empty cans go here.' The first may be memorable, but the second explains the action. You might keep a playful illustration and use the clearer instruction.",
        "check": {
          "prompt": "How should you choose a direction?",
          "options": [
            "Pick whichever appeared first.",
            "Pick the longest one.",
            "Compare how each meets the same audience, action, and constraints."
          ],
          "answer": 2,
          "explanation": "A consistent brief gives you a reasoned basis for choice."
        }
      },
      {
        "title": "Make the work usable",
        "body": [
          "Review the design as someone encountering it for the first time. Can they identify the action quickly? Is essential information readable? Does the design rely on color alone to distinguish options?",
          "Check the facts using the event organizer or another appropriate source. Generated text in images can contain spelling errors or wrong details. A beautiful layout is not evidence that the date, room, or instruction is right.",
          "For a digital version, provide a text alternative for meaningful images. It should communicate the information or purpose someone would miss, not merely say 'an image.' Let feedback change the work before sharing it."
        ],
        "example": "A poster saying 'Science fair, Room 12' must match the organizer's information. A digital image can have nearby text with the event title, time, place, and required action.",
        "check": {
          "prompt": "Before publishing a polished poster, what matters?",
          "options": [
            "Verify the details and test readability and access.",
            "Only the background color.",
            "Whether AI likes it."
          ],
          "answer": 0,
          "explanation": "Usability and accuracy are part of finishing the design."
        }
      }
    ],
    "practice": {
      "kind": "sort",
      "title": "Creative director's desk",
      "intro": "Brief: invite ninth graders to a library study club on Tuesday in Room 4. Use a clear action, readable information, and no invented claims. Choose the main repair each draft needs.",
      "options": [
        "Verify or correct a fact",
        "Clarify the action",
        "Improve access"
      ],
      "items": [
        {
          "text": "The draft says Wednesday in Room 9.",
          "answer": "Verify or correct a fact",
          "why": "It conflicts with the supplied event details."
        },
        {
          "text": "The only headline says 'Unlock infinity.'",
          "answer": "Clarify the action",
          "why": "It does not explain the study club or how to join."
        },
        {
          "text": "The meeting details are tiny and low contrast.",
          "answer": "Improve access",
          "why": "Essential information needs to be readable."
        },
        {
          "text": "The image claims 'Guaranteed perfect grades.'",
          "answer": "Verify or correct a fact",
          "why": "The brief provides no evidence for that promise."
        },
        {
          "text": "The online poster contains all its information only inside an image, with no text alternative.",
          "answer": "Improve access",
          "why": "Supply accessible text conveying the event information."
        },
        {
          "text": "The poster lists a date and room but never says what the event is.",
          "answer": "Clarify the action",
          "why": "Readers need to know what they are invited to do."
        }
      ],
      "hint": "Match each problem to truth, purpose, or usability. Several improvements may be useful; choose the most direct repair."
    },
    "project": {
      "title": "Create a campaign concept",
      "brief": "Design a study-club invitation using the practice brief. You can sketch on paper, then describe your design here.",
      "fields": [
        "Write your creative brief: audience, intended action, and three constraints.",
        "Write two different headlines, compare them, and explain your choice.",
        "Describe your final layout, a text alternative, and how you would verify the event details."
      ],
      "rubric": [
        "My brief names the audience and action.",
        "I compared two directions using the brief.",
        "I included accurate details and an accessibility check."
      ],
      "model": "Audience: ninth graders seeking a study routine. Action: join Tuesday's study club in Room 4. Compare 'Study together Tuesday' with 'Make space for progress.' Choose the first for clarity; put time and place in large text and provide the same information as selectable text online.",
      "stretch": "Ask someone to view your concept for five seconds. What do they remember? Explain one revision based on their response."
    },
    "terms": [
      [
        "Creative brief",
        "Audience, purpose, and constraints for a project."
      ],
      [
        "Iteration",
        "Making a revision, checking it, and improving again."
      ],
      [
        "Text alternative",
        "Text that conveys the purpose or information of meaningful visual content."
      ],
      [
        "Constraint",
        "A requirement or limit that guides a design."
      ]
    ],
    "quiz": [
      {
        "prompt": "What should a brief contain?",
        "options": [
          "Only favorite colors.",
          "Audience, purpose, and constraints.",
          "Only the tool's name."
        ],
        "answer": 1,
        "explanation": "A brief defines the problem the design must solve."
      },
      {
        "prompt": "Which criterion helps compare slogans?",
        "options": [
          "Which was generated fastest.",
          "Which uses the most adjectives.",
          "Whether the audience understands the intended action."
        ],
        "answer": 2,
        "explanation": "The slogan should serve the communication goal."
      },
      {
        "prompt": "A poster's date came from generated output. Before sharing:",
        "options": [
          "Check it against the organizer's information.",
          "Assume it is correct.",
          "Hide it in small print."
        ],
        "answer": 0,
        "explanation": "Event details need verification."
      },
      {
        "prompt": "What should a useful text alternative communicate?",
        "options": [
          "Only 'picture'.",
          "The relevant information or purpose.",
          "Every decorative pixel."
        ],
        "answer": 1,
        "explanation": "It should convey what someone would otherwise miss."
      },
      {
        "prompt": "What demonstrates design thinking?",
        "options": [
          "Keeping only the first output.",
          "Adding effects without a purpose.",
          "Explaining why you chose and revised a direction."
        ],
        "answer": 2,
        "explanation": "Reasoned selection and revision show your contribution."
      }
    ],
    "source": "https://www.w3.org/WAI/tutorials/images/",
    "sourceName": "W3C: accessible images"
  },
  {
    "id": "capstone",
    "unit": "creativity",
    "title": "Pitch an AI helper that deserves trust",
    "subtitle": "Bring everything together in a proposal for a useful, responsible school tool.",
    "tags": [
      "Challenge",
      "Project",
      "Evaluation"
    ],
    "essential": "How do you show that a helpful idea is also testable and responsible?",
    "goals": [
      "Connect a task to inputs, outputs, and limits.",
      "Create an evaluation and human-review plan.",
      "Document contributions and make a reasoned release decision."
    ],
    "sections": [
      {
        "title": "Choose a small problem worth solving",
        "body": [
          "A strong AI proposal starts with a real need, not with the technology. Pick a narrow school problem: finding a resource, sorting supplies, or generating practice questions from teacher-approved notes. State who experiences it and what improvement would look like.",
          "Compare an AI approach with a simpler alternative. A searchable list might solve a club-information problem better than a chatbot. If you choose AI, explain what makes its pattern recognition or generation useful and what mistakes it might introduce.",
          "Define the boundary of the tool. A study-question helper can offer practice, but it should not decide a student's grade or invent official school policy. Clear limits make testing and accountability possible."
        ],
        "example": "Proposal: a helper suggests review questions from a provided science passage. It does not grade official exams or answer beyond the approved passage.",
        "check": {
          "prompt": "What makes a strong starting point?",
          "options": [
            "Use AI everywhere.",
            "A specific learner need and a comparison with simpler options.",
            "A name and logo only."
          ],
          "answer": 1,
          "explanation": "A defined need lets you judge whether the tool is appropriate."
        }
      },
      {
        "title": "Build evidence before making promises",
        "body": [
          "Name the input, expected output, and evaluation criteria. For a practice-question helper, test whether questions are answerable from the passage, whether answer keys are correct, and whether the level suits the intended students.",
          "Use varied examples and keep a final test apart from development. Record failures as well as successes. If the tool only works with short passages, state that limit instead of claiming it works with every textbook.",
          "Plan for mistakes. A person should be able to review questionable output, correct it, or stop using the system. A release decision should depend on evidence and consequences, not only on how impressive the demo looks."
        ],
        "example": "Test passages from several topics, have a teacher check the questions, and log unsupported answers. Define a review step before students see unverified answer keys.",
        "check": {
          "prompt": "What belongs in a testing plan?",
          "options": [
            "Only favorable examples.",
            "Only screenshots.",
            "Varied cases, expected outcomes, failures, and a review process."
          ],
          "answer": 2,
          "explanation": "A testing plan should be able to expose limitations."
        }
      },
      {
        "title": "Show your process and make a decision",
        "body": [
          "A proposal should make your contribution visible: your problem definition, sketches, criteria, test design, and revisions. If AI assisted, describe exactly how. Also credit sources and assets according to the project requirements.",
          "Use a simple decision statement: ready for a limited supervised trial, needs more testing, or not suitable for this task. Give evidence for the choice and name conditions that would make you change your mind.",
          "For this capstone, you do not need to build a live AI service or collect real student data. A careful paper prototype with realistic examples can demonstrate more understanding than a flashy tool with no evaluation plan."
        ],
        "example": "A limited trial might use fictional passages, teacher-reviewed questions, and a visible report-error option. State that this is a proposal, not evidence of a successfully tested product.",
        "check": {
          "prompt": "An honest project conclusion should:",
          "options": [
            "Separate a proposal from what has actually been tested.",
            "Claim perfect performance without tests.",
            "Hide assistance to sound original."
          ],
          "answer": 0,
          "explanation": "Make the boundary between plans and evidence clear."
        }
      }
    ],
    "practice": {
      "kind": "sequence",
      "title": "Put the project workflow in order",
      "intro": "Use the up and down buttons to arrange this workflow. Think about what evidence each step needs from the previous one.",
      "items": [
        "Decide on a supervised trial using the test evidence.",
        "Define the learner problem and compare a simpler option.",
        "Revise the prototype after inspecting failures.",
        "Create a small prototype using fictional inputs.",
        "Evaluate it on varied held-out examples."
      ],
      "correct": [
        "Define the learner problem and compare a simpler option.",
        "Create a small prototype using fictional inputs.",
        "Evaluate it on varied held-out examples.",
        "Revise the prototype after inspecting failures.",
        "Decide on a supervised trial using the test evidence."
      ],
      "hint": "Define the need before building; gather evidence before revising and making a release decision. A revised system would also need a fresh evaluation before actual release."
    },
    "project": {
      "title": "Your one-page AI proposal",
      "brief": "Pitch an AI helper for school. This is a proposal, not a claim that you have already built and tested it. Include enough detail for a classmate to question your choices.",
      "fields": [
        "Describe the learner problem, your proposed input and output, and why AI might help more than a simpler alternative.",
        "Describe varied test cases, what success means, and one important failure you would measure.",
        "Describe privacy safeguards, who reviews mistakes, and a way students can challenge an output.",
        "State the current limits, your next step, and an honest disclosure of assistance and sources."
      ],
      "rubric": [
        "My proposal connects a specific need to a bounded tool.",
        "My evaluation could reveal failures, not just successes.",
        "I gave practical privacy and human-review safeguards.",
        "I separated proposed work from evidence and disclosed assistance."
      ],
      "model": "A passage-based study helper creates three practice questions. A simpler question bank may work for common topics. Test new passages and have a teacher check answerability and answer keys. Use fictional inputs, collect no names, and allow error reports. This remains a proposal until the tests are actually run.",
      "stretch": "Invite someone to challenge your strongest claim. Revise one part of your proposal in response."
    },
    "terms": [
      [
        "Prototype",
        "An early model of an idea made to explore and test it."
      ],
      [
        "Evaluation criterion",
        "A specific measure used to judge whether a system meets a goal."
      ],
      [
        "Human oversight",
        "People reviewing, correcting, or stopping a system when needed."
      ],
      [
        "Limitation",
        "A boundary on what a tool or its evidence can establish."
      ]
    ],
    "quiz": [
      {
        "prompt": "What should come before choosing AI?",
        "options": [
          "A defined problem and comparison with alternatives.",
          "A promise of perfect accuracy.",
          "A color palette."
        ],
        "answer": 0,
        "explanation": "Choose the approach based on the task."
      },
      {
        "prompt": "Which input is best for a classroom prototype?",
        "options": [
          "A secret contact list.",
          "Fictional or approved non-private examples.",
          "Private records from classmates."
        ],
        "answer": 1,
        "explanation": "You can explore the idea without exposing people."
      },
      {
        "prompt": "A demo succeeds on two examples. You can conclude:",
        "options": [
          "It works for everyone.",
          "It never makes mistakes.",
          "It worked on those two examples; broader testing is needed."
        ],
        "answer": 2,
        "explanation": "Small demonstrations do not establish general reliability."
      },
      {
        "prompt": "Which plan supports accountability?",
        "options": [
          "A named reviewer and a way to report or challenge errors.",
          "Only a disclaimer at the bottom.",
          "No one can question an output."
        ],
        "answer": 0,
        "explanation": "People need practical ways to correct problems."
      },
      {
        "prompt": "What makes a strong final proposal?",
        "options": [
          "Unsupported claims of fairness.",
          "A specific task, test plan, safeguards, limits, and honest process record.",
          "An attractive screenshot alone."
        ],
        "answer": 1,
        "explanation": "Combine usefulness with evidence and responsibility."
      }
    ],
    "source": "https://www.nist.gov/itl/ai-risk-management-framework",
    "sourceName": "NIST: managing AI risks"
  }
];
