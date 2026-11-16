import { notesInCategory } from "./studyNotes.js";
// Independent from blog categories. When a category's notes change, set its
// updatedAt to an ISO date/time (e.g. 2026-11-16T10:00:00+13:00).
export const noteCategories = [
  { id: "english", name: "English", icon: "🔤", color: "yellow" },
  { id: "japanese", name: "Japanese", icon: "🗾", color: "blue" },
  { id: "mathematics", name: "Mathematics", icon: "📐", color: "purple" },
  { id: "computing", name: "Computing", icon: "💻", color: "green" },
  { id: "sports", name: "Sports", icon: "🏃", color: "orange" },
  { id: "design", name: "Design", icon: "🎨", color: "pink" },
  { id: "music", name: "Music", icon: "🎵", color: "cyan" },
  { id: "games", name: "Games", icon: "🎮", color: "red" },
];

export function latestNoteCategories(categories = noteCategories, limit = 4) {
  const timestamp = (category) =>
    Math.max(
      Date.parse(category.updatedAt || "") || 0,
      ...notesInCategory(category.id).map((note) => Date.parse(note.updatedAt)),
    );
  return categories
    .map((category, index) => ({ category, index }))
    .sort(
      (a, b) =>
        timestamp(b.category) - timestamp(a.category) || a.index - b.index,
    )
    .slice(0, limit)
    .map(({ category }) => category);
}
