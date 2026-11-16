import fs from "node:fs/promises";
const labels = {
  zh: {
    rank: "考生百分排名",
    n2: ["个人学习记录", "语言知识", "阅读", "听力"],
    pte: ["总分 · 个人学习记录", "阅读", "听力", "口语", "写作"],
  },
  en: {
    rank: "TEST-TAKER PERCENTILE",
    n2: ["MY STUDY RECORD", "Language knowledge", "Reading", "Listening"],
    pte: ["OVERALL · MY RECORD", "Reading", "Listening", "Speaking", "Writing"],
  },
  ja: {
    rank: "受験者のパーセンタイル順位",
    n2: ["個人の学習記録", "言語知識", "読解", "聴解"],
    pte: [
      "総合 · 個人の学習記録",
      "リーディング",
      "リスニング",
      "スピーキング",
      "ライティング",
    ],
  },
};
await fs.mkdir("public/images/notes", { recursive: true });
for (const [language, copy] of Object.entries(labels)) {
  for (const type of ["n2", "pte"]) {
    const isN2 = type === "n2";
    const rows = isN2 ? [52, 60, 47] : [84, 85, 90, 81];
    const max = isN2 ? 60 : 90;
    const colors = isN2
      ? ["#97bbf5", "#8ed4b0", "#c1a3eb"]
      : ["#97bbf5", "#c1a3eb", "#92cbb8", "#f1cd7d"];
    const bars = rows
      .map((value, i) => {
        const y = (isN2 ? 92 : 55) + i * (isN2 ? 85 : 75);
        return `<text x="375" y="${y}" fill="#e7e9f0" font-size="21">${copy[type][i + 1]}</text><text x="895" y="${y}" fill="${colors[i]}" font-size="23" text-anchor="end">${value}/${max}</text><rect x="375" y="${y + 18}" width="520" height="18" rx="9" fill="#363944"/><rect x="375" y="${y + 18}" width="${(520 * value) / max}" height="18" rx="9" fill="${colors[i]}"/>`;
      })
      .join("");
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 360" role="img"><rect width="960" height="360" rx="24" fill="#252831"/><circle cx="80" cy="325" r="140" fill="${colors[0]}" opacity=".05"/><g font-family="Arial, sans-serif" font-weight="700"><text x="45" y="64" fill="${colors[0]}" font-size="19" letter-spacing="2">${isN2 ? "JLPT N2" : "PTE"}</text><text x="45" y="145" fill="#fff" font-size="70">${isN2 ? "159" : "86"}<tspan font-size="28" fill="#aeb4c3">/${isN2 ? "180" : "90"}</tspan></text><text x="45" y="195" fill="#b7bdcb" font-size="18">${copy[type][0]}</text>${isN2 ? `<text x="45" y="260" fill="#b7bdcb" font-size="16">${copy.rank}</text><text x="45" y="309" fill="#97bbf5" font-size="38">98.3%</text>` : ""}${bars}</g></svg>`;
    await fs.writeFile(
      `public/images/notes/${isN2 ? "jlpt-n2-review" : "pte-review"}-${language}.svg`,
      svg,
    );
  }
}
console.log("Created six localized score charts from the archived scores.");
