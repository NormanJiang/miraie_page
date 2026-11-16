// Explicit preferences take priority. Otherwise use the browser's primary language,
// which normally follows the user's system/browser language settings.
export function initialLanguage(preference, systemLanguage) {
  if (["en", "zh", "ja"].includes(preference)) return preference;
  const primary = typeof systemLanguage === "string"
    ? systemLanguage.trim().toLowerCase().split(/[-_]/)[0]
    : "";
  return primary === "zh" || primary === "ja" ? primary : "en";
}
