import manifest from "virtual:content";
export { manifest };
export function translation(entry, language = "en") {
  return (
    entry.translations[language] ||
    entry.translations.en ||
    entry.translations.zh ||
    Object.values(entry.translations)[0]
  );
}
export function localizedContent(kind, language) {
  return manifest[kind].map((entry) => {
    const copy = translation(entry, language);
    return {
      ...entry,
      ...copy,
      date: copy.publishedAt,
      shelf: copy.category,
      description: copy.summary,
    };
  });
}
