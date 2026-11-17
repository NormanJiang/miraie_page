import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";
const markdown = new MarkdownIt({ html: true, linkify: true });
const categories = {
  notes: [
    "english",
    "japanese",
    "mathematics",
    "computing",
    "sports",
    "design",
    "music",
    "games",
  ],
  blog: ["learning", "building", "making", "life"],
};
export function renderMarkdown(body) {
  let html = sanitizeHtml(markdown.render(body), {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "figure",
      "figcaption",
      "span",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      span: ["lang"],
      code: ["class"],
      th: ["scope", "align"],
      td: ["align"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (tag, attrs) => ({
        tagName: tag,
        attribs: {
          ...attrs,
          ...(/^https?:/.test(attrs.href || "")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {}),
        },
      }),
    },
  });
  // Attributes added by transforms are trusted, but retain only safe link targets.
  html = html.replace(
    /<table>/g,
    '<div class="note-table-scroll" tabindex="0"><table>',
  );
  html = html.replace(/<\/table>/g, "</table></div>");
  return html;
}
export function readContent(root = process.cwd()) {
  const result = { notes: [], blog: [], projects: [] };
  const search = [];
  const files = [];
  for (const kind of Object.keys(result)) {
    const dir = path.join(root, "content", kind);
    if (!fs.existsSync(dir)) continue;
    for (const entry of fs
      .readdirSync(dir, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name))) {
      if (!entry.isDirectory()) continue;
      const id = entry.name;
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id))
        throw Error(
          `content/${kind}/${id}: 文件夹名请只使用小写英文、数字和短横线`,
        );
      const translations = {};
      for (const file of fs
        .readdirSync(path.join(dir, id))
        .filter((f) => f.endsWith(".md"))
        .sort()) {
        const lang = file.slice(0, -3);
        const relative = `content/${kind}/${id}/${file}`;
        if (!["zh", "en", "ja"].includes(lang))
          throw Error(`${relative}: 文件名必须是 zh.md、en.md 或 ja.md`);
        const raw = fs.readFileSync(path.join(root, relative), "utf8");
        let parsed;
        try {
          parsed = matter(raw);
        } catch (error) {
          throw Error(`${relative}: 文件开头的配置格式有误：${error.message}`);
        }
        const data = parsed.data;
        const fail = (msg) => {
          throw Error(`${relative}: ${msg}`);
        };
        if (data.draft !== undefined && typeof data.draft !== "boolean")
          fail("draft 必须为 true 或 false，不能加引号");
        if (data.draft === true) continue;
        for (const key of ["title", "summary"])
          if (typeof data[key] !== "string" || !data[key].trim())
            fail(`请填写 ${key}`);
        if (!parsed.content.trim()) fail("正文不能为空");
        const date = (key) => {
          let v = data[key];
          if (v instanceof Date) v = v.toISOString().slice(0, 10);
          if (
            typeof v !== "string" ||
            !/^\d{4}-\d{2}-\d{2}$/.test(v) ||
            Number.isNaN(Date.parse(v)) ||
            new Date(v).toISOString().slice(0, 10) !== v
          )
            fail(`${key} 请填写有效日期 YYYY-MM-DD`);
          return v;
        };
        if (kind !== "projects" && !categories[kind].includes(data.category))
          fail(`category 必须是 ${categories[kind].join("、")} 之一`);
        if (
          data.tags !== undefined &&
          (!Array.isArray(data.tags) ||
            data.tags.some((t) => typeof t !== "string"))
        )
          fail("tags 请使用文字列表，如 [学习, 随笔]");
        const meta = {
          id,
          language: lang,
          title: data.title,
          summary: data.summary,
          path: "/" + relative,
          icon: data.icon || "📝",
          tags: data.tags || [],
        };
        if (kind !== "projects")
          Object.assign(meta, {
            category: data.category,
            publishedAt: date("publishedAt"),
            updatedAt: data.updatedAt ? date("updatedAt") : date("publishedAt"),
          });
        else
          Object.assign(meta, {
            year: String(data.year || "IDEA"),
            status: data.status || "示例构想",
          });
        // Fail before publishing when a local image points to a missing file.
        const html = renderMarkdown(parsed.content);
        for (const match of html.matchAll(/<img[^>]*src="([^"]+)"/g)) {
          const src = match[1];
          if (!/^https?:\/\//.test(src)) {
            if (!src.startsWith("/images/"))
              fail("本地图片请使用 /images/ 开头的网站路径");
            const asset = path.resolve(
              root,
              "public",
              "." + decodeURI(src.split(/[?#]/)[0]),
            );
            if (
              !asset.startsWith(path.resolve(root, "public") + path.sep) ||
              !fs.existsSync(asset)
            )
              fail(`找不到图片 ${src}`);
          }
        }
        translations[lang] = meta;
        files.push({ path: meta.path, html });
        const plain = sanitizeHtml(html, {
          allowedTags: [],
          allowedAttributes: {},
        })
          .replace(/&amp;/g, "&")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/\s+/g, " ")
          .trim();
        search.push({ kind, id, language: lang, text: plain });
      }
      const versions = Object.values(translations);
      if (!versions.length) continue;
      const base = translations.zh || translations.en || versions[0];
      for (const version of versions)
        for (const key of ["category", "publishedAt", "updatedAt"])
          if (version[key] !== base[key])
            throw Error(`content/${kind}/${id}: 各语言版本的 ${key} 必须一致`);
      result[kind].push({ ...base, translations });
    }
    result[kind].sort(
      (a, b) =>
        (b.publishedAt || "").localeCompare(a.publishedAt || "") ||
        a.id.localeCompare(b.id),
    );
  }
  return { manifest: result, search, files };
}

export function contentPlugin() {
  let root;
  return {
    name: "local-markdown-content",
    configResolved(config) {
      root = config.root;
    },
    resolveId(id) {
      if (
        [
          "virtual:content",
          "virtual:content-search",
          "virtual:content-bodies",
        ].includes(id)
      )
        return "\0" + id;
    },
    load(id) {
      if (!id.startsWith("\0virtual:content")) return;
      const data = readContent(root);
      if (id === "\0virtual:content")
        return `export default ${JSON.stringify(data.manifest)}`;
      if (id === "\0virtual:content-search")
        return `export default ${JSON.stringify(data.search)}`;
      return `export default {${data.files.map((file) => `${JSON.stringify(file.path)}:()=>import(${JSON.stringify(file.path)})`).join(",")}}`;
    },
    transform(_code, id) {
      if (
        id.endsWith(".md") &&
        id.replaceAll("\\", "/").includes("/content/")
      ) {
        const parsed = matter(fs.readFileSync(id, "utf8"));
        return {
          code: `export default ${JSON.stringify(parsed.data.draft === true ? "" : renderMarkdown(parsed.content))}`,
          map: null,
        };
      }
    },
    configureServer(server) {
      const refresh = (file) => {
        if (
          !file
            .replaceAll("\\", "/")
            .startsWith(path.join(root, "content").replaceAll("\\", "/") + "/")
        )
          return;
        server.moduleGraph.invalidateAll();
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.add(path.join(root, "content"));
      server.watcher.on("add", refresh).on("unlink", refresh);
    },
    handleHotUpdate(ctx) {
      if (ctx.file.replaceAll("\\", "/").includes("/content/")) {
        ctx.server.moduleGraph.invalidateAll();
        ctx.server.ws.send({ type: "full-reload" });
        return [];
      }
    },
  };
}
