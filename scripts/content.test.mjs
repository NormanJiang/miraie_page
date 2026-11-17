import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { readContent, renderMarkdown } from "./content.mjs";
function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "miraie-content-"));
  t.after(() => {
    if (
      path.dirname(root) === os.tmpdir() &&
      path.basename(root).startsWith("miraie-content-")
    )
      fs.rmSync(root, { recursive: true, force: true });
  });
  return root;
}
function write(
  root,
  language,
  extra = "",
  body = "## Heading\n\nOriginal text",
) {
  const dir = path.join(root, "content/notes/example");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, language + ".md"),
    `---\ntitle: Test\nsummary: Summary\ncategory: english\npublishedAt: "2025-08-12"\nupdatedAt: "2026-11-17"\n${extra}\n---\n${body}\n`,
  );
}
test("automatically discovers translations and excludes draft bodies from search and output", (t) => {
  const root = fixture(t);
  write(root, "zh");
  write(root, "en");
  write(root, "ja", "draft: true", "PRIVATE DRAFT");
  const data = readContent(root);
  assert.equal(data.manifest.notes.length, 1);
  assert.deepEqual(Object.keys(data.manifest.notes[0].translations), [
    "en",
    "zh",
  ]);
  assert.equal(data.files.length, 2);
  assert.ok(!JSON.stringify(data).includes("PRIVATE DRAFT"));
  fs.unlinkSync(path.join(root, "content/notes/example/en.md"));
  assert.deepEqual(
    Object.keys(readContent(root).manifest.notes[0].translations),
    ["zh"],
  );
});
test("rejects invalid calendar dates and mismatched translation metadata", (t) => {
  const root = fixture(t);
  write(root, "zh");
  write(root, "en");
  const file = path.join(root, "content/notes/example/en.md");
  let raw = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, raw.replace("2025-08-12", "2025-02-30"));
  assert.throws(() => readContent(root), /publishedAt/);
  fs.writeFileSync(
    file,
    raw.replace("category: english", "category: japanese"),
  );
  assert.throws(() => readContent(root), /category/);
});
test("missing images produce file-specific errors", (t) => {
  const root = fixture(t);
  write(root, "zh", "", "![photo](/images/missing.png)");
  assert.throws(
    () => readContent(root),
    /content\/notes\/example\/zh.md.*missing.png/,
  );
});
test("Markdown preserves tables and language spans while dropping executable content", () => {
  const html = renderMarkdown(
    '| A | B |\n| --- | --- |\n| 1 | 2 |\n\n<span lang="ja">発見</span><script>alert(1)</script><img src="/images/a.png" onerror="alert(2)"><a href="javascript:alert(3)">bad</a>',
  );
  assert.match(html, /note-table-scroll/);
  assert.match(html, /<span lang="ja">発見/);
  assert.doesNotMatch(html, /onerror|javascript:|<script|alert\(/);
});
