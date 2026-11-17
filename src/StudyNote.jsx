import React from "react";
import MarkdownBody from "./MarkdownBody";
import { noteTranslation, notesInCategory } from "./studyNotes";
import { noteCategories } from "./notes";

export function NoteList({ category, language, t }) {
  const notes = notesInCategory(category);
  return notes.length ? (
    <div className="study-note-list">
      {notes.map((note) => {
        const copy = noteTranslation(note, language);
        return (
          <a
            className="study-note-card"
            key={note.id}
            href={`#/note/${note.id}`}
          >
            <span className="note-eyebrow">
              {t("Study review")} · {t("Published")}{" "}
              <time dateTime={note.publishedAt}>
                {new Date(`${note.publishedAt}T12:00:00`).toLocaleDateString(
                  language === "zh" ? "zh-CN" : language,
                  { year: "numeric", month: "long", day: "numeric" },
                )}
              </time>
            </span>
            <h2>{copy.title}</h2>
            <p>{copy.summary}</p>
            <span className="note-read">{t("Read note")} ↗</span>
          </a>
        );
      })}
    </div>
  ) : (
    <p className="empty">{t("No notes yet")}</p>
  );
}

export default function StudyNote({ note, language, t }) {
  const copy = noteTranslation(note, language);
  const category = noteCategories.find((item) => item.id === note.category);
  return (
    <article
      className="page prose study-note"
      lang={language === "zh" ? "zh-CN" : language}
    >
      <a className="breadcrumb" href={`#/notes/${note.category}`}>
        ← {t(category.name)} / {t("Notes")}
      </a>
      <div className="note-eyebrow">
        {t("Study review")} · miraie · {t("Published")}{" "}
        <time dateTime={note.publishedAt}>
          {new Date(`${note.publishedAt}T12:00:00`).toLocaleDateString(
            language === "zh" ? "zh-CN" : language,
            { year: "numeric", month: "long", day: "numeric" },
          )}
        </time>
      </div>
      <h1>{copy.title}</h1>
      <p className="subtitle">{copy.summary}</p>
      <MarkdownBody copy={copy} language={language} t={t} />
    </article>
  );
}
