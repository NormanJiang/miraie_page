// 在这里替换姓名、个人介绍和内容。示例文章不代表真实个人经历。
export const profile = {
  name: "miraie",
  brand: "miraie",
  tagline: "A curious mind. A lifelong learner. A maker of things.",
  intro:
    "这里是我的数字花园，收藏学习的痕迹、创造的乐趣，以及生活中的小小发现。",
  email: "norman.jiang.nz@outlook.com",
  wechat: "hash1ru_miraie",
  about:
    "我喜欢能让知识留下来的地方，也喜欢那些带着个人气息的小网站。这里可以是一份笔记、一张书单，或一个刚刚萌芽的想法。",
  github: "https://github.com/NormanJiang",
};
export const shelves = [
  {
    id: "learning",
    icon: "📚",
    name: "Fundamentals",
    label: "从基础开始",
    description:
      "把复杂的事情拆开，一点一点弄明白。这里收集学习过程中的笔记、方法与心得。",
    color: "yellow",
  },
  {
    id: "building",
    icon: "🔎",
    name: "Deep dives",
    label: "深入探索",
    description:
      "留一点时间给好奇心。沿着一个问题往下走，记录那些值得反复琢磨的细节。",
    color: "blue",
  },
  {
    id: "making",
    icon: "🛠️",
    name: "Making things",
    label: "动手创造",
    description:
      "从一个小想法，到一个可以使用的东西。关于个人网站、小工具和有趣的实验。",
    color: "purple",
  },
  {
    id: "life",
    icon: "☕",
    name: "Off the clock",
    label: "代码之外",
    description:
      "屏幕以外也有很多值得记录的事。读过的书、走过的路，以及平凡日子的闪光。",
    color: "green",
  },
];
export const posts = [
  {
    id: "a-place-on-the-web",
    title: "在互联网上，留一块属于自己的地方",
    date: "2026-11-15",
    icon: "🌱",
    shelf: "making",
    tags: ["personal", "website"],
    summary: "从一张空白页面开始，慢慢种下自己的数字花园。",
    body: [
      [
        "为什么做个人网站",
        "社交平台适合即时分享，个人网站则像一本可以不断整理的笔记本。内容不必追逐时间线，可以按照自己的节奏生长。",
      ],
      [
        "从小处开始",
        "先写一段简单的介绍，再留下一篇完整的笔记。页面不必很复杂：清楚的导航、舒适的阅读体验，以及一点属于自己的颜色就够了。",
      ],
      [
        "让它慢慢生长",
        "这是一篇用于展示阅读页面的示例文章。你可以在 src/data.js 中替换为自己的故事，或添加新的文章。",
      ],
    ],
  },
  {
    id: "learning-in-public",
    title: "把学习的过程写下来",
    date: "2026-11-12",
    icon: "📝",
    shelf: "learning",
    tags: ["learning", "notes"],
    summary: "记录不只是为了记住，也是为了真正理解。",
    body: [
      [
        "一份写给未来的笔记",
        "我们常常高估自己会记得的东西。把思考过程、遇到的问题以及解决方法写下来，下一次就有了可以回来的地方。",
      ],
      [
        "用自己的话解释",
        "写作是一种检验理解的方式。如果一个概念还无法解释清楚，也许它就值得再花一点时间。",
      ],
      [
        "保持简单",
        "本文为示例内容。最好的起点，是记录今天刚刚学会的一件小事。",
      ],
    ],
  },
  {
    id: "small-details",
    title: "那些让网页更好用的小细节",
    date: "2026-11-08",
    icon: "🔎",
    shelf: "building",
    tags: ["design", "web"],
    summary: "好的体验，往往藏在容易被忽略的地方。",
    body: [
      [
        "阅读的节奏",
        "合适的行长、行距与段落间距，可以让阅读轻松很多。先照顾好文字，再考虑装饰。",
      ],
      [
        "给操作一个回应",
        "链接需要清楚的悬停状态，按钮需要可见的键盘焦点。深色和浅色主题也应该有足够的对比度。",
      ],
      [
        "适应不同屏幕",
        "这是一篇示例文章。在手机上，侧栏会变成顶部导航；内容仍然保持自然的阅读顺序。",
      ],
    ],
  },
  {
    id: "slow-weekend",
    title: "周末，给自己留一点空白",
    date: "2026-11-01",
    icon: "☕",
    shelf: "life",
    tags: ["life", "thoughts"],
    summary: "放慢一点，重新注意身边的小事。",
    body: [
      [
        "离开屏幕之后",
        "泡一杯咖啡，翻几页书，或者漫无目的地散步。并不是每一段时间都需要产出。",
      ],
      [
        "记录微小的发现",
        "有时候，一束光、一段对话，或一条从未走过的小路，就值得记在这里。",
      ],
      ["关于这篇文章", "这是一篇生活随笔示例，等待被你的真实记录替换。"],
    ],
  },
];
export const projects = [
  {
    id: "digital-garden",
    title: "Digital Garden",
    year: "2026",
    icon: "🌱",
    description: "你正在浏览的个人网站。一个可以持续生长的写作与创作空间。",
    status: "本站",
    body: "这个网站包含文章归档、主题分类、项目介绍和关于页面。支持深浅色模式、强调色切换、文章搜索及移动端布局。所有内容保存在本地源码中。",
  },
  {
    id: "reading-notes",
    title: "Reading Notes",
    year: "IDEA",
    icon: "📖",
    description: "把阅读中的想法，整理成可以重新发现的笔记。",
    status: "示例构想",
    body: "这是项目展示区的示例构想，并非已完成的作品。你可以替换标题、简介和详情，介绍自己的真实项目。",
  },
  {
    id: "little-experiments",
    title: "Little Experiments",
    year: "IDEA",
    icon: "🧪",
    description: "给那些小小的好奇心，一个动手尝试的地方。",
    status: "示例构想",
    body: "这是一个用于展示个人实验的占位项目。把开发过程、设计选择和成果链接放在这里，让访客了解你的思考。",
  },
];
