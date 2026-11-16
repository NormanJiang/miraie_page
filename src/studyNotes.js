// Editorial summaries of miraie's archived Notion records, not current exam guides.
const notion = (id) => `https://app.notion.com/p/${id}`;
export const studyNotes = [
  {
    id: "jlpt-n2-review",
    category: "japanese",
    updatedAt: "2026-11-16T16:00:00+13:00",
    sources: [
      {
        label: "JLPT N2 · Notion",
        url: notion("26fb7eae9fa9804bbe7ed31041fcbb56"),
      },
      { label: "N2 文法", url: notion("274b7eae9fa9802f98cbd7ceb956e403") },
      {
        label: "N2 文法 · 2010.12",
        url: notion("28eb7eae9fa980aa9f5ae644069482f0"),
      },
      {
        label: "N2 聴解 · 2017.12",
        url: notion("26fb7eae9fa9801c89ffc7165c2854fd"),
      },
      { label: "N2 読解", url: notion("286b7eae9fa980dbac01ef5255e18249") },
    ],
    translations: {
      zh: {
        title: "我的 JLPT N2 复盘：把错题整理成可以反复用的笔记",
        summary:
          "159/180 的学习记录：从文法对照、听解场景到考前回看，整理这段日语学习里真正留下来的东西。",
        intro:
          "回看这份 N2 档案，我留下的不只有一个分数，还有一套逐渐清楚的整理方式：文法按单元学，混淆点放进错题本，听力按场景和提问目的拆开。复盘时，比起再堆一批资料，我更想知道哪些地方已经掌握，哪些地方还需要回去听、回去看。",
        caption:
          "根据原始记录重绘的成绩图：语言知识 52/60，阅读 60/60，听力 47/60。",
        imageAlt:
          "N2 总分159/180；语言知识52/60、阅读60/60、听力47/60的条形图；考生百分排名98.3%",
        scope:
          "这是对个人归档笔记的整理。首页标注日期为 2026.3.26，本文保留为记录日期，不据此推定考试日期。精读、精听两个专页为空，因此不把它们写成已完成的训练。",
        sections: [
          {
            title: "01 · 先看结果，再安排下一步",
            source: 0,
            paragraphs: [
              "档案记录的总分是 159/180，语言知识 52/60、阅读 60/60、听力 47/60，其中“Rank: 98.3%”指考生排位的百分位，而不是得分率。阅读是这份记录里最强的一项，听力仍有最大的补足空间。",
              "如果继续学习，我会保留阅读习惯，把更多复盘时间留给听力里的信息筛选和即时反应。这是从分项成绩出发的下一步安排，而不是用一次成绩解释全部学习能力。",
            ],
          },
          {
            title: "02 · 文法：记住差别，比堆译义更有用",
            source: 2,
            paragraphs: [
              "N2 文法笔记分成 18 个单元；目录还保留了 N3 文法与两级错题本。对我来说，这样的结构方便从做错的题回到具体知识点。2010.12 的错题页把相近表达放在一起，留下了比单独背中文意思更有用的对照。",
            ],
            table: {
              headers: ["表达", "复习时抓住的区别"],
              rows: [
                ["とは限らない", "未必如此；不一定成立。"],
                ["わけではない", "并不是这样；否定某个判断。"],
                ["ようがない", "没有可行的办法去做。"],
                ["に相違ない", "确信如此；一定是这样。"],
              ],
            },
            after:
              "我会把这些区别放回完整句子里，再确认接续和语境。错题页中零散、过于简化的释义不直接当作完整语法规则。",
          },
          {
            title: "03 · 听解：先判断自己要听什么",
            source: 3,
            paragraphs: [
              "2017.12 的听解笔记按问题类型整理：接下来先做什么、具体细节、谈话主旨、合适的回应，以及较长对话中的方案选择。词汇也跟着公司、电话、大学、图书馆等场景一起记录。",
              "这给我的复盘留下一个明确方向：听下一段之前先知道任务是什么。问行动顺序，就留意最后确认的安排；问理由，就找真正解释原因的那一句；问回应，则要听出对方是在请求、担忧还是后悔。",
            ],
            table: {
              headers: ["记录里的场景", "回听时的关注点"],
              rows: [
                ["公司／电话联络", "人物、文件、提交与发送的先后关系。"],
                ["图书馆借阅", "能否延期，以及不能延期的原因。"],
                ["广播／讲演", "例子服务于什么主旨，而非只记零散名词。"],
                ["即时应答", "说话人的意图与情绪，不能只匹配词语。"],
              ],
            },
          },
          {
            title: "04 · 阅读与错题：留下一条能回去的路",
            source: 4,
            paragraphs: [
              "阅读目录保留了 2016.12 的 18/21 和 2010.12 的 19/21；文法错题目录也保留了不同套题的记录，并写着“考前看错题就好”。这些记录更适合拿来定位需要重看的材料，而不是被拼成一条并不存在的持续上升曲线。",
              "我想延续的是这条复习路径：做题后记下错因，把易混点放在一起，再回原句确认。需要新增的不是更多页数，而是下一次打开笔记时，仍然能看懂自己为什么错。",
            ],
          },
          {
            title: "05 · 留给下一阶段的复盘清单",
            paragraphs: [
              "下面是这次整理后给自己的下一步清单，不是对过去训练量的补写。",
            ],
            bullets: [
              "回听已有场景笔记，把没听到的词和听到了却理解错的意思分开。",
              "文法继续做成对照卡：接续、含义、语境各留一条。",
              "阅读错题补上原文依据，减少凭印象选答案。",
              "保留少量、可反复使用的记录，让复习有明确入口。",
            ],
          },
        ],
      },
      en: {
        title: "My JLPT N2 review: turning mistakes into reusable notes",
        summary:
          "A 159/180 study record, revisited through grammar contrasts, listening situations, and a practical route back to past mistakes.",
        intro:
          "Looking back at my N2 archive, I see more than a score. I see a way of organising study: grammar by unit, confusing points in an error notebook, and listening by situation and question purpose. Rather than collecting another pile of materials, I want the review to show what I understand and what deserves another listen or read.",
        caption:
          "Redrawn from my archived record: language knowledge 52/60, reading 60/60, and listening 47/60.",
        imageAlt:
          "N2 total 159/180, with bars for language knowledge 52/60, reading 60/60, and listening 47/60; test-taker percentile 98.3%",
        scope:
          "This is a synthesis of my personal archive. Its main page labels the result 2026.3.26; I preserve that as a recorded date, not an inferred exam date. The separate close-reading and intensive-listening pages are empty, so I do not describe them as completed training.",
        sections: [
          {
            title: "01 · Use the result to decide what comes next",
            source: 0,
            paragraphs: [
              "The archive records 159/180 overall: 52/60 for language knowledge, 60/60 for reading, and 47/60 for listening. The label “Rank: 98.3%” refers to my percentile standing among test takers, not the percentage of marks earned. Reading is the strongest component in this record; listening has the most room to improve.",
              "For the next stage, I would maintain my reading habit and spend more review time on selecting information and responding in real time while listening. That is a planning choice based on the component scores, not an explanation of my entire ability from one result.",
            ],
          },
          {
            title: "02 · Grammar: remember the distinction",
            source: 2,
            paragraphs: [
              "My N2 grammar notes are organised into 18 units. The archive also keeps N3 grammar and error notebooks for both levels, making it easier to move from a missed question back to a specific point. The 2010.12 error page places similar expressions together—a more useful comparison than memorising isolated translations.",
            ],
            table: {
              headers: ["Expression", "Distinction to revisit"],
              rows: [
                [
                  "とは限らない",
                  "Not necessarily so; a statement is not always true.",
                ],
                [
                  "わけではない",
                  "It is not the case that; rejecting an interpretation.",
                ],
                ["ようがない", "There is no practicable way to do something."],
                ["に相違ない", "It must be so; a confident judgement."],
              ],
            },
            after:
              "I would revisit these in complete sentences and check their grammatical connections and context. Brief, simplified glosses in an error notebook are not complete grammar rules.",
          },
          {
            title: "03 · Listening: know what you are listening for",
            source: 3,
            paragraphs: [
              "The 2017.12 listening notes distinguish the next action, specific details, the main idea, an appropriate response, and choosing a plan in a longer conversation. Vocabulary stays attached to situations such as work, phone calls, university, and a library.",
              "That gives my next review a clear focus: identify the task before the recording. For action order, follow the final agreed arrangement; for a reason, locate the explanation; for a response, notice whether the speaker is requesting something, worrying, or expressing regret.",
            ],
            table: {
              headers: [
                "Situation in the archive",
                "Focus when listening again",
              ],
              rows: [
                [
                  "Work / phone calls",
                  "Who is involved, which documents matter, and what happens first.",
                ],
                [
                  "Library borrowing",
                  "Whether an extension is possible and why it may be refused.",
                ],
                [
                  "Radio / talks",
                  "The point an example supports, rather than isolated nouns.",
                ],
                [
                  "Quick responses",
                  "The speaker’s intention and emotion, not just matching words.",
                ],
              ],
            },
          },
          {
            title: "04 · Reading and errors: leave a route back",
            source: 4,
            paragraphs: [
              "The reading index retains 18/21 for the 2016.12 paper and 19/21 for 2010.12. The grammar error index also keeps results from different papers and a reminder to revisit mistakes before the exam. These records locate material worth reviewing; they do not establish a continuous upward trend.",
              "The habit I want to carry forward is simple: record why an answer was wrong, compare confusing points, and return to the original sentence. More pages are less valuable than being able to understand the same mistake when I reopen the notebook.",
            ],
          },
          {
            title: "05 · A checklist for the next stage",
            paragraphs: [
              "These are next steps drawn from this review, not invented claims about my past practice volume.",
            ],
            bullets: [
              "Separate words I failed to hear from meanings I heard but misunderstood.",
              "Keep grammar contrast cards with form, meaning, and context.",
              "Add the supporting passage to reading errors instead of relying on memory.",
              "Keep a small set of notes that are easy to revisit.",
            ],
          },
        ],
      },
      ja: {
        title: "JLPT N2 の振り返り：間違いを繰り返し使えるノートにする",
        summary:
          "159/180 の学習記録を、文法の比較、聴解の場面整理、試験前の見直しという視点から振り返る。",
        intro:
          "N2 のアーカイブを見返すと、点数だけでなく、学習の整理方法も残っている。文法は単元別に学び、紛らわしい表現は間違いノートにまとめ、聴解は場面と設問の目的で分ける。教材をさらに増やすより、何が身につき、何をもう一度聞き、読み直すべきかを確かめたい。",
        caption:
          "元の記録をもとに作成：言語知識 52/60、読解 60/60、聴解 47/60。",
        imageAlt:
          "N2 総得点159/180。言語知識52/60、読解60/60、聴解47/60を示す棒グラフ。受験者のパーセンタイル順位98.3%",
        scope:
          "個人の過去のノートを整理した記事です。トップページの 2026.3.26 は記録上の日付として扱い、受験日とは断定していません。精読・精聴の専用ページは空欄のため、完了した練習としては記載していません。",
        sections: [
          {
            title: "01 · 結果から次の学習を考える",
            source: 0,
            paragraphs: [
              "アーカイブには総得点 159/180、言語知識 52/60、読解 60/60、聴解 47/60 とあり、「Rank: 98.3%」は得点率ではなく、受験者の中でのパーセンタイル順位を示している。この記録では読解が最も強く、聴解には改善の余地が大きい。",
              "次の段階では読む習慣を保ちつつ、聴解で必要な情報を選ぶ力と、その場で反応する力に復習時間を使いたい。これは分野別の得点から考えた方針であり、一度の結果で能力全体を説明するものではない。",
            ],
          },
          {
            title: "02 · 文法：訳語よりも違いを覚える",
            source: 2,
            paragraphs: [
              "N2 文法は18単元に整理され、N3 文法と両レベルの間違いノートも残している。間違えた問題から該当する項目へ戻りやすい構成だ。2010.12 のページでは似た表現を並べており、訳語を一つずつ暗記するよりも違いを確認しやすい。",
            ],
            table: {
              headers: ["表現", "復習したい違い"],
              rows: [
                ["とは限らない", "必ずそうだとは言えない。"],
                ["わけではない", "そのような判断・解釈を否定する。"],
                ["ようがない", "実行するための方法がない。"],
                ["に相違ない", "間違いなくそうだと確信する。"],
              ],
            },
            after:
              "これらを文全体に戻し、接続と文脈を確認したい。間違いノートの短い訳や単純化した説明を、そのまま完全な文法規則とは考えない。",
          },
          {
            title: "03 · 聴解：何を聞き取るのかを先に決める",
            source: 3,
            paragraphs: [
              "2017.12 の聴解ノートは、次にすること、具体的な情報、話の主旨、適切な返答、長い会話でのプラン選択という形で分けている。語彙も会社、電話、大学、図書館などの場面と一緒に記録した。",
              "この整理から、聞く前に設問の目的を意識するという復習方針が見える。行動の順序なら最後に確認された予定、理由なら原因を説明する箇所、応答なら依頼・心配・後悔といった話し手の意図に注目したい。",
            ],
            table: {
              headers: ["記録にある場面", "聞き直すときの注目点"],
              rows: [
                ["会社・電話連絡", "登場人物、書類、提出や発送の順序。"],
                ["図書館の貸出", "延長できるか、できない理由は何か。"],
                ["ラジオ・講演", "名詞を拾うだけでなく、具体例が支える主旨。"],
                ["即時応答", "単語の一致ではなく、相手の意図と気持ち。"],
              ],
            },
          },
          {
            title: "04 · 読解と間違い：戻れる道を残す",
            source: 4,
            paragraphs: [
              "読解の目次には 2016.12 の 18/21 と 2010.12 の 19/21 が残っている。文法の間違いノートにも複数の問題の記録と、試験前に間違いを見直すというメモがある。復習箇所を探すための記録であり、これだけで成績が継続的に伸びたとは言えない。",
              "続けたいのは、間違えた理由を残し、紛らわしい点を比較して、元の文へ戻る習慣だ。ページ数を増やすより、次に開いたときも自分の間違いを理解できるノートにしたい。",
            ],
          },
          {
            title: "05 · 次の段階へのチェックリスト",
            paragraphs: [
              "以下は今回の整理から考えた次の行動であり、過去の練習量を補って書いたものではない。",
            ],
            bullets: [
              "聞き取れなかった語と、聞こえたのに意味を誤解した箇所を分ける。",
              "文法の比較カードに接続・意味・文脈を一つずつ残す。",
              "読解の間違いには、答えの根拠となる本文を添える。",
              "繰り返し開ける、少量のノートを大切にする。",
            ],
          },
        ],
      },
    },
  },
  {
    id: "pte-review",
    category: "english",
    updatedAt: "2026-11-16T16:00:00+13:00",
    sources: [
      {
        label: "Pearson’s PTE · Notion",
        url: notion("27ab7eae9fa980ed8295cfa95f168f5b"),
      },
    ],
    translations: {
      zh: {
        title: "我的 PTE 复盘：把表达稳定下来，把时间留给检查",
        summary:
          "总分 86/90、口语 90。回看模考后的提醒，整理流利表达、笔记节奏、写作检查与时间分配。",
        intro:
          "我的 PTE 归档首页写着 86/90，Speaking 90。再往下看，最醒目的不是某个复杂模板，而是我反复提醒自己的几件事：别冒险用不熟的句式，控制时间，拼写和语法要检查，听和写要找到节奏。这些提醒比一份“万能技巧”更能说明我当时在练什么。",
        caption:
          "根据归档记录与本人补充信息重绘：总分 86/90，阅读 84/90、听力 85/90、口语 90/90、写作 81/90。",
        imageAlt:
          "PTE 总分86/90；阅读84/90、听力85/90、口语90/90、写作81/90的成绩图",
        scope:
          "本文是旧备考记录的个人复盘，不是现行考试规则。原页评分图片彼此存在差异，其中一张标注 2022 年 4 月；旧题型权重、跳题和模板技巧不作为当前建议照搬。",
        sections: [
          {
            title: "01 · 模考让我看到：稳定比冒险更重要",
            source: 0,
            paragraphs: [
              "“7.31 模考总结”里，我一边写 RL、DI 状态不错，一边反复提醒 WE 换简单句、SWT 反复检查、SST 把可能出错的语法换掉。那份带着紧张感的记录，指向的是同一件事：在有限时间里，把已经会的内容稳定输出。",
              "现在重看，我会保留这种自我检查方式：把不确定的表达标出来，先保证回答切题、信息完整，再考虑是否需要复杂句式。复杂不等于清楚，也不值得用明显的语言错误去交换。",
            ],
          },
          {
            title: "02 · 口语：把听、记、说分开练",
            source: 0,
            paragraphs: [
              "我的旧笔记在 RA 和 RL 旁反复写下 Fluency。RS 的提醒是把注意力集中到能保留的词组；DI 按图像类型分类练习；RL 则把听和记笔记的节奏单独拿出来练，再根据记下的信息组织复述。",
              "真正值得留下的是分解任务的思路：先听懂，再记住关键关系，最后清楚地说出来。原文里“跳过不熟的词”“听不完说一半”等话，是当时紧张下的个人应对，不能改写成普遍有效的答题规则。",
            ],
            table: {
              headers: ["题型", "笔记中的训练重点", "这次保留的学习经验"],
              rows: [
                ["RA · 朗读", "流利度", "减少停顿，同时保证内容与发音的准确。"],
                [
                  "RS · 复述句子",
                  "有限的短时记忆",
                  "按意义分块记忆，逐步扩大可准确复述的范围。",
                ],
                [
                  "DI · 描述图片",
                  "按图像类型练习",
                  "先找主要信息，再组织有顺序的表达。",
                ],
                [
                  "RL · 复述讲座",
                  "听和记的节奏",
                  "笔记服务于理解与复述，不必追求逐字抄写。",
                ],
              ],
            },
          },
          {
            title: "03 · 写作：给检查留出真正的时间",
            source: 0,
            paragraphs: [
              "旧记录给 WE 的个人安排是约 14—15 分钟完成初稿，把剩余时间用于反复阅读。这个数字是我当时的练习安排；更值得保留的是提前写完、认真检查的意识。",
              "我的检查顺序可以整理为：有没有回应题目要求，句子是否完整，时态与单复数是否一致，拼写和标点是否正确。模板能帮助搭结构，但不应替代自己的论点，更不应带入没有依据的“研究报告”或“满分保证”。",
            ],
            bullets: [
              "先核对题目问了什么，避免写得流畅却漏答。",
              "不确定的结构换成自己能准确使用的句子。",
              "最后逐句检查，而不是只看总字数。",
            ],
          },
          {
            title: "04 · 阅读和听力：用复盘分配注意力",
            source: 0,
            paragraphs: [
              "“需要控制时间”在阅读和听力部分各出现了三遍。阅读填空的提醒是通读全文；听力填空则强调时态、单复数、相邻空格，以及最后回看语法。HIW 的模考提醒也很具体：漏掉的常是非常接近的词。",
              "WFD 被我放在突出位置，记录了把句子拆成 3—4 段、记笔记等做法。整理成下一阶段的方法，就是按意群听写、对照原句，并区分漏词、拼写和词尾错误。旧笔记里的预测题、随意加词与直接跳题，不纳入这次保留的通用方法。",
            ],
          },
          {
            title: "05 · 我想继续使用的练习循环",
            paragraphs: [
              "这次复盘后，我更愿意用一个小循环继续练习，而不是再找一套更复杂的模板。",
            ],
            table: {
              headers: ["步骤", "具体做什么"],
              rows: [
                ["练习", "选一个题型，完整完成一轮。"],
                ["定位", "分清内容、语言、记忆或时间上的问题。"],
                ["修正", "一次只处理一个具体弱点。"],
                ["再做", "回到相同任务，确认修正能否稳定复现。"],
              ],
            },
            after:
              "86 分和口语 90 分属于这段经历的记录。对以后的学习更有价值的，是我能否清楚表达、准确理解，并知道自己该如何改进。",
          },
        ],
      },
      en: {
        title: "My PTE review: steadier delivery and time to check",
        summary:
          "An overall 86/90 and speaking score of 90, revisited through fluency, note-taking, writing checks, and time management.",
        intro:
          "My PTE archive opens with 86/90 and Speaking 90. Below that, the most striking material is not an elaborate template, but repeated reminders: avoid unfamiliar sentence structures, manage time, check spelling and grammar, and find a rhythm between listening and writing. Those reminders describe my practice better than a list of supposedly universal tricks.",
        caption:
          "Redrawn from the archive and my additional score details: overall 86/90; reading 84/90, listening 85/90, speaking 90/90, and writing 81/90.",
        imageAlt:
          "PTE overall 86/90, reading 84/90, listening 85/90, speaking 90/90, and writing 81/90",
        scope:
          "This is a personal review of an old preparation record, not a guide to current exam rules. The saved scoring images disagree, and one is dated April 2022. Old task weights, skipping tactics, and template claims are not carried forward as current advice.",
        sections: [
          {
            title: "01 · The mock test pointed towards consistency",
            source: 0,
            paragraphs: [
              "In the entry labelled “7.31 mock review”, I felt positive about RL and DI while repeatedly telling myself to simplify WE sentences, check SWT, and replace uncertain grammar in SST. The anxious wording points to one goal: deliver what I already know reliably within the time available.",
              "The useful habit is to mark uncertain language, make sure the response addresses the prompt and includes the necessary information, and only then consider complexity. A complicated sentence is not automatically a clearer one.",
            ],
          },
          {
            title: "02 · Speaking: separate listening, notes, and delivery",
            source: 0,
            paragraphs: [
              "Fluency appears repeatedly beside RA and RL. For RS, I focused on the chunks I could retain; for DI, I practised by image type. For RL, I worked on the rhythm of listening and note-taking, then used the captured information to organise a retelling.",
              "What I want to preserve is the task breakdown: understand, retain the key relationships, and speak clearly. Comments such as skipping unfamiliar words or saying only half a sentence describe my old coping tactics, not universally effective rules.",
            ],
            table: {
              headers: ["Task", "Focus in my notes", "Lesson to keep"],
              rows: [
                [
                  "RA · Read Aloud",
                  "Fluency",
                  "Reduce hesitation while keeping content and pronunciation accurate.",
                ],
                [
                  "RS · Repeat Sentence",
                  "Limited short-term memory",
                  "Remember meaningful chunks and gradually expand accurate recall.",
                ],
                [
                  "DI · Describe Image",
                  "Practice by image type",
                  "Identify the main information before organising the response.",
                ],
                [
                  "RL · Retell Lecture",
                  "Listening / writing rhythm",
                  "Take notes to support understanding and retelling, not transcription.",
                ],
              ],
            },
          },
          {
            title: "03 · Writing: reserve real time for checking",
            source: 0,
            paragraphs: [
              "My old WE plan was to finish a draft in roughly 14–15 minutes and spend the remaining time rereading. That was my practice allocation, not a universal timing rule. The lasting idea is to finish early enough to check properly.",
              "My checks can be organised into a sequence: have I answered the prompt, are the sentences complete, are tense and number consistent, and are spelling and punctuation correct? A template can support structure, but it should not replace an argument or introduce invented research and promises of a perfect score.",
            ],
            bullets: [
              "Check every part of the prompt before polishing the wording.",
              "Replace uncertain constructions with sentences I can use accurately.",
              "Read sentence by sentence at the end, rather than checking only the word count.",
            ],
          },
          {
            title:
              "04 · Reading and listening: allocate attention deliberately",
            source: 0,
            paragraphs: [
              "The reminder to control time appears three times each in my reading and listening sections. Reading gap-fill notes favour reading the whole passage. Listening gap-fill notes emphasise tense, singular and plural forms, nearby gaps, and a final grammar check. The HIW mock-test reminder is specific too: the missed differences were often very small.",
              "I highlighted WFD and noted splitting a sentence into three or four chunks and taking notes. For future practice, I would turn that into meaning-based dictation, comparison with the original, and separate error categories for omissions, spelling, and word endings. Prediction lists, adding arbitrary words, and skipping tasks are not part of the general method I retain here.",
            ],
          },
          {
            title: "05 · The practice loop I want to keep",
            paragraphs: [
              "After this review, I would rather use a small repeatable loop than search for an even more elaborate template.",
            ],
            table: {
              headers: ["Step", "Action"],
              rows: [
                ["Practise", "Complete one full attempt at a selected task."],
                [
                  "Locate",
                  "Identify whether the issue is content, language, memory, or time.",
                ],
                ["Adjust", "Work on one specific weakness at a time."],
                [
                  "Repeat",
                  "Return to the task and check whether the improvement is repeatable.",
                ],
              ],
            },
            after:
              "The overall 86 and speaking 90 are part of this study record. The more lasting value is being able to express myself clearly, understand accurately, and know how to improve.",
          },
        ],
      },
      ja: {
        title: "PTE の振り返り：表現を安定させ、見直しの時間を残す",
        summary:
          "総合86/90、スピーキング90。模試後のメモから、流暢さ、ノートの取り方、文章の確認、時間配分を振り返る。",
        intro:
          "PTE のアーカイブには 86/90、Speaking 90 とある。その下で目立つのは複雑なテンプレートよりも、何度も書いた注意点だ。慣れない構文で冒険しない、時間を管理する、綴りと文法を確認する、聞くことと書くことのリズムをつかむ。万能な攻略法より、当時の練習内容がよく表れている。",
        caption:
          "アーカイブと本人が補足した情報をもとに作成：総合86/90、リーディング84/90、リスニング85/90、スピーキング90/90、ライティング81/90。",
        imageAlt:
          "PTE 総合86/90、リーディング84/90、リスニング85/90、スピーキング90/90、ライティング81/90の成績図",
        scope:
          "過去の個人的な学習記録の振り返りであり、現在の試験規則の解説ではありません。保存された配点画像には相違があり、1枚は2022年4月版です。古い配点、問題を飛ばす方針、テンプレートの効果を現在の推奨として転記していません。",
        sections: [
          {
            title: "01 · 模試から見えたのは、安定させること",
            source: 0,
            paragraphs: [
              "「7.31 模試まとめ」では RL と DI の調子がよいと書く一方、WE は簡単な文にする、SWT は何度も確認する、SST は不安な文法を変える、と繰り返している。緊張感のある文章が示しているのは、限られた時間で、できることを確実に出すという目標だ。",
              "今も残したいのは、不確かな表現に印をつけ、設問に答えているか、必要な情報があるかを先に確認する習慣だ。複雑な文が必ずしも分かりやすい文とは限らない。",
            ],
          },
          {
            title: "02 · スピーキング：聞く・メモする・話すを分ける",
            source: 0,
            paragraphs: [
              "RA と RL の横には Fluency が繰り返し登場する。RS では覚えられる語句のまとまり、DI では画像の種類別練習を意識していた。RL では聞くこととメモすることのリズムを練習し、残した情報から話を組み立てていた。",
              "残したいのは、理解し、重要な関係を覚え、明確に話すという分解の仕方だ。「知らない語を飛ばす」「半分だけ言う」といったメモは当時の対処法であり、誰にでも有効な解答規則とは考えない。",
            ],
            table: {
              headers: ["問題形式", "当時の練習の重点", "残したい学び"],
              rows: [
                [
                  "RA · 音読",
                  "流暢さ",
                  "内容と発音の正確さを保ちながら、ためらいを減らす。",
                ],
                [
                  "RS · 文の復唱",
                  "短期記憶の限界",
                  "意味のまとまりで覚え、正確に再現できる範囲を広げる。",
                ],
                [
                  "DI · 画像説明",
                  "種類別の練習",
                  "主要な情報を見つけてから、順序立てて説明する。",
                ],
                [
                  "RL · 講義の再話",
                  "聞く・書くリズム",
                  "書き取りではなく、理解と再話のためのメモにする。",
                ],
              ],
            },
          },
          {
            title: "03 · ライティング：見直す時間を実際に確保する",
            source: 0,
            paragraphs: [
              "当時の WE の計画は、約14〜15分で下書きを終え、残りを読み直しに使うというものだった。これは自分の練習時の配分であり、普遍的な時間のルールではない。残したいのは、見直せるよう早めに書き終える意識だ。",
              "確認は、設問に答えたか、文が完結しているか、時制や単複が合っているか、綴りと句読点は正しいか、という順に整理できる。テンプレートは構成の補助になるが、自分の主張に代わるものではない。根拠のない研究の引用や満点の保証も持ち込まない。",
            ],
            bullets: [
              "表現を磨く前に、設問の各要求を確認する。",
              "不安な構文は、自分が正確に使える文に置き換える。",
              "最後は語数だけでなく、一文ずつ読み直す。",
            ],
          },
          {
            title: "04 · 読解と聴解：注意を向ける先を決める",
            source: 0,
            paragraphs: [
              "時間管理の注意は、読解と聴解の両方に3回ずつ書かれている。読解の穴埋めでは全文を読むこと、聴解の穴埋めでは時制、単複、近接した空欄、最後の文法確認を重視していた。HIW の模試メモも、見落としたのはよく似た語だった、と具体的だ。",
              "WFD は特に強調され、文を3〜4つに分けることやメモを取ることが残っている。今後は意味のまとまりで書き取り、原文と比較し、脱落・綴り・語尾の誤りを分けたい。予想問題への依存、無関係な語の追加、問題を飛ばす方針は、今回残す一般的な学習法には含めない。",
            ],
          },
          {
            title: "05 · 続けたい練習の循環",
            paragraphs: [
              "今回の振り返りを踏まえ、さらに複雑なテンプレートを探すより、小さく繰り返せる練習を続けたい。",
            ],
            table: {
              headers: ["段階", "行動"],
              rows: [
                ["練習", "一つの問題形式を選び、最後まで解く。"],
                ["特定", "内容・言語・記憶・時間のどこに問題があるか分ける。"],
                ["修正", "具体的な弱点を一つずつ改善する。"],
                [
                  "再挑戦",
                  "同じ課題に戻り、改善が安定して再現できるか確かめる。",
                ],
              ],
            },
            after:
              "総合86とスピーキング90は、この学習の記録だ。その先にも残る価値は、明確に表現し、正確に理解し、自分で改善の道筋を見つけられることだと思う。",
          },
        ],
      },
    },
  },
];

export function noteTranslation(note, language = "en") {
  return note.translations[language] || note.translations.en;
}

export function notesInCategory(category) {
  return studyNotes
    .filter((note) => note.category === category)
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
}

export function noteSearchText(copy) {
  return [
    copy.summary,
    copy.intro,
    copy.caption,
    ...copy.sections.flatMap((section) => [
      section.title,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
      ...(section.table?.headers || []),
      ...(section.table?.rows.flat() || []),
      section.after || "",
    ]),
  ].join(" ");
}
