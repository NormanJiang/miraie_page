import React, { useEffect, useRef, useState } from "react";
import { searchContent, highlightParts } from "./search";

function Highlight({ text, query }) {
  return highlightParts(text, query).map((part, index) =>
    part.match ? <mark key={index}>{part.text}</mark> : part.text,
  );
}

export default function GlobalSearch({ t, route, language }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const input = useRef(null);
  const results = searchContent(query, language);
  useEffect(() => {
    setOpen(false);
  }, [route]);
  useEffect(() => {
    const dismiss = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  function navigate(event) {
    if (event.nativeEvent.isComposing) return;
    const links = [...root.current.querySelectorAll(".global-result")];
    const index = links.indexOf(document.activeElement);
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      input.current.focus();
    } else if (event.key === "ArrowDown" && links.length) {
      event.preventDefault();
      links[(index + 1) % links.length].focus();
    } else if (event.key === "ArrowUp" && links.length) {
      event.preventDefault();
      if (index <= 0) input.current.focus();
      else links[index - 1].focus();
    } else if (
      event.key === "Enter" &&
      document.activeElement === input.current &&
      links.length
    ) {
      event.preventDefault();
      links[0].click();
    }
  }
  return (
    <div
      className="global-search"
      ref={root}
      onKeyDown={navigate}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <div className="global-search-field">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          aria-hidden="true"
        >
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="m16 16 4 4" />
        </svg>
        <input
          ref={input}
          type="search"
          value={query}
          placeholder={t("Search all content")}
          aria-label={t("Search all content")}
          aria-expanded={open && !!query.trim()}
          aria-controls="global-search-results"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
        />
      </div>
      {open && query.trim() && (
        <div className="global-search-results" id="global-search-results">
          <div className="results-heading" role="status">
            {t("Search results count", { count: results.length })}
          </div>
          {results.length ? (
            <ul>
              {results.map((item) => (
                <li key={item.id}>
                  <a
                    className="global-result"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <div className="result-title">
                      <strong lang={item.language || "zh-CN"}>
                        <Highlight text={item.title} query={query} />
                      </strong>
                      <span>{t(item.type)}</span>
                    </div>
                    <p lang={item.language || "zh-CN"}>
                      <Highlight text={item.snippet} query={query} />
                    </p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="search-empty">{t("No content found")}</p>
          )}
        </div>
      )}
    </div>
  );
}
