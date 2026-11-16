import React, { useEffect, useRef, useState } from "react";
import { languages } from "./i18n";

export default function LanguageSwitcher({ language, onChange, label }) {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  useEffect(() => {
    if (!open) return;
    const dismiss = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  function moveFocus(event) {
    const options = [
      ...root.current.querySelectorAll('[role="menuitemradio"]'),
    ];
    const index = options.indexOf(document.activeElement);
    const next =
      event.key === "ArrowDown"
        ? (index + 1) % options.length
        : event.key === "ArrowUp"
          ? (index + options.length - 1) % options.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? options.length - 1
              : null;
    if (next !== null) {
      event.preventDefault();
      options[next]?.focus();
    }
  }
  useEffect(() => {
    if (open) root.current.querySelector('[aria-checked="true"]')?.focus();
  }, [open]);
  return (
    <div
      className="language-switcher"
      ref={root}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        className="language-trigger"
        title={label}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="language-menu"
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
      >
        <svg viewBox="0 0 28 24" aria-hidden="true">
          <text x="1" y="16" fontSize="16" fill="currentColor">
            文
          </text>
          <path d="m19 3-7 18" stroke="currentColor" strokeWidth="1.3" />
          <text x="18" y="21" fontSize="13" fill="currentColor">
            A
          </text>
        </svg>
      </button>
      {open && (
        <div
          id="language-menu"
          className="language-menu"
          role="menu"
          aria-label={label}
          onKeyDown={moveFocus}
        >
          {languages.map((item) => (
            <button
              type="button"
              key={item.code}
              role="menuitemradio"
              aria-checked={language === item.code}
              onClick={() => {
                onChange(item.code);
                setOpen(false);
                trigger.current?.focus();
              }}
            >
              <span lang={item.code === "ja" ? "ja" : "zh-CN"}>
                {item.label}
              </span>
              <span
                className={`language-code ${item.code === "ja" ? "japanese-mark" : ""}`}
                lang={item.locale}
              >
                / {item.mark}
              </span>
              <span className="language-check" aria-hidden="true">
                {language === item.code ? "✓" : ""}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
