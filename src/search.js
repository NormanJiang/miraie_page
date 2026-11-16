import { posts, projects, profile, shelves } from "./data.js";
import { studyNotes, noteTranslation, noteSearchText } from "./studyNotes.js";

// Escape literal query terms so punctuation is never interpreted as a regex.
export function highlightParts(text, query) {
  const terms = [...new Set(query.trim().split(/\s+/).filter(Boolean))]
    .sort((a, b) => b.length - a.length)
    .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!terms.length) return [{ text, match: false }];
  const pattern = new RegExp(terms.join("|"), "gi");
  const parts = [];
  let end = 0;
  for (const hit of text.matchAll(pattern)) {
    if (hit.index > end)
      parts.push({ text: text.slice(end, hit.index), match: false });
    parts.push({ text: hit[0], match: true });
    end = hit.index + hit[0].length;
  }
  if (end < text.length) parts.push({ text: text.slice(end), match: false });
  return parts;
}

// Derived from authored content: newly added posts and projects are indexed automatically.
export function contentIndex(language = "en") {
  return [
    ...studyNotes.map((note) => {
      const copy = noteTranslation(note, language);
      return {
        id: `note-${note.id}`,
        title: copy.title,
        text: noteSearchText(copy),
        href: `#/note/${note.id}`,
        type: "Notes",
        language: language === "zh" ? "zh-CN" : language,
      };
    }),
    ...posts.map((p) => ({
      id: `post-${p.id}`,
      title: p.title,
      text: [p.summary, ...p.body.flat(), ...p.tags].join(" "),
      href: `#/post/${p.id}`,
      type: "Blog",
    })),
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      title: p.title,
      text: `${p.description} ${p.body}`,
      href: `#/project/${p.id}`,
      type: "Projects",
    })),
    ...shelves.map((s) => ({
      id: `shelf-${s.id}`,
      title: s.name,
      text: `${s.label} ${s.description}`,
      href: `#/blog/${s.id}`,
      type: "Blog",
    })),
    {
      id: "about",
      title: profile.name,
      text: [
        profile.tagline,
        profile.intro,
        profile.about,
        profile.email,
        profile.wechat,
      ]
        .filter(Boolean)
        .join(" "),
      href: "#/about",
      type: "About me",
    },
  ];
}
export function searchContent(query, language = "en") {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return contentIndex(language)
    .map((item) => {
      const title = item.title.toLocaleLowerCase();
      const body = item.text.toLocaleLowerCase();
      if (!terms.every((term) => `${title} ${body}`.includes(term)))
        return null;
      const hits = terms
        .map((term) => body.indexOf(term))
        .filter((index) => index >= 0);
      const start = Math.max(0, (hits.length ? Math.min(...hits) : 0) - 35);
      return {
        ...item,
        score: terms.reduce(
          (score, term) => score + (title.includes(term) ? 10 : 1),
          0,
        ),
        snippet: `${start ? "…" : ""}${item.text.slice(start, start + 220)}${item.text.length > start + 220 ? "…" : ""}`,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score);
}
