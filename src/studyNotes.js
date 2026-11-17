import { manifest, translation } from "./content.js";
export const studyNotes = manifest.notes;
export const noteTranslation = translation;
export function notesInCategory(category) {
  return studyNotes
    .filter((note) => note.category === category)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
