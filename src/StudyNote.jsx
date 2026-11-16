import React from "react";
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
              {t("Study review")} ·{" "}
              {new Date(note.updatedAt).toLocaleDateString(
                language === "zh" ? "zh-CN" : language,
              )}
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
        {t("Study review")} · miraie · {t("Updated")}{" "}
        {new Date(note.updatedAt).toLocaleDateString(
          language === "zh" ? "zh-CN" : language,
        )}
      </div>
      <h1>{copy.title}</h1>
      <p className="subtitle">{copy.summary}</p>
      <p className="note-lead">{copy.intro}</p>
      <figure className="note-figure">
        <img
          src={`/images/notes/${note.id}-${language}.svg`}
          alt={copy.imageAlt}
          width="960"
          height="360"
        />
        <figcaption>{copy.caption}</figcaption>
      </figure>
      <aside className="note-scope">{copy.scope}</aside>
      {copy.sections.map((section, index) => (
        <section className="note-section" key={index}>
          <h2>{section.title}</h2>
          {section.paragraphs?.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
          {section.table && (
            <div
              className="note-table-scroll"
              role="region"
              aria-label={section.title}
              tabIndex="0"
            >
              <table>
                <thead>
                  <tr>
                    {section.table.headers.map((header) => (
                      <th key={header} scope="col">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.table.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>
                          <span
                            lang={
                              note.category === "japanese" &&
                              index === 1 &&
                              j === 0
                                ? "ja"
                                : undefined
                            }
                          >
                            {cell}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {section.bullets && (
            <ul>
              {section.bullets.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          )}
          {section.after && <p>{section.after}</p>}
        </section>
      ))}
      <section className="note-section note-sources">
        <h2>{t("Source notes")}</h2>
        <p>{t("Notion access note")}</p>
        <ul>
          {note.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
