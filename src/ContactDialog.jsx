import React, { useEffect, useRef, useState } from "react";
import { profile } from "./data";

export function ContactIcon({ kind }) {
  return kind === "email" ? (
    <svg className="contact-icon" viewBox="0 0 48 48" aria-hidden="true">
      <rect x="2" y="7" width="44" height="34" rx="9" fill="#438de5" />
      <path
        d="m7 14 17 13 17-13"
        stroke="#fff"
        strokeWidth="3"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="m7 35 12-11m22 11L29 24" stroke="#b8dcff" strokeWidth="2" />
    </svg>
  ) : (
    <svg className="contact-icon" viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="12" fill="#07c160" />
      <path
        fill="#fff"
        d="M21 10c-8 0-14 5-14 11 0 4 2 7 6 9l-1 5 5-3 4 1c8 0 14-5 14-12s-6-11-14-11Z"
      />
      <path fill="#07c160" d="M17 17h3v3h-3zm10 0h3v3h-3z" />
      <path
        fill="#d7f9e5"
        stroke="#07c160"
        strokeWidth="1.5"
        d="M31 22c-7 0-12 4-12 10s5 10 12 10l4-1 5 3-1-5c3-2 4-4 4-7 0-6-5-10-12-10Z"
      />
      <circle cx="27" cy="29" r="1.4" fill="#08984c" />
      <circle cx="35" cy="29" r="1.4" fill="#08984c" />
    </svg>
  );
}
export default function ContactDialog({ open, onClose, t }) {
  const dialog = useRef(null);
  const [copied, setCopied] = useState("");
  const [failed, setFailed] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    dialog.current.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.current?.close();
      document.body.style.overflow = oldOverflow;
      clearTimeout(timer.current);
      previousFocus?.focus();
    };
  }, [open]);
  async function copy(kind, text) {
    setFailed(false);
    setCopied("");
    try {
      if (navigator.clipboard?.writeText)
        await navigator.clipboard.writeText(text);
      else {
        const field = document.createElement("textarea");
        field.value = text;
        field.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        dialog.current.append(field);
        field.select();
        const success = document.execCommand("copy");
        field.remove();
        if (!success) throw new Error("Copy unavailable");
      }
      setCopied(kind);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(""), 2000);
    } catch {
      setFailed(true);
    }
  }
  return (
    <dialog
      className="contact-dialog"
      ref={dialog}
      aria-labelledby="contact-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) {
          const rect = dialog.current.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <header>
        <div>
          <span className="contact-eyebrow">miraie</span>
          <h2 id="contact-title">{t("Contact me")}</h2>
        </div>
        <button
          className="dialog-close"
          aria-label={t("Close dialog")}
          onClick={onClose}
        >
          ×
        </button>
      </header>
      <div className="contact-rows">
        {[
          { kind: "email", label: "Email", value: profile.email },
          { kind: "wechat", label: "WeChat ID", value: profile.wechat },
        ].map((item) => (
          <div className="contact-row" key={item.kind}>
            <ContactIcon kind={item.kind} />
            <div className="contact-details">
              <span>{t(item.label)}</span>
              <strong>{item.value}</strong>
            </div>
            <button
              className="copy-contact"
              aria-label={t("Copy contact", { label: t(item.label) })}
              title={t("Copy")}
              onClick={() => copy(item.kind, item.value)}
            >
              {copied === item.kind ? (
                <span className="copy-check">✓</span>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                >
                  <rect x="8" y="8" width="12" height="13" rx="2" />
                  <path d="M15 5V3H3v12h2" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="copy-status" role="status">
        {failed ? t("Copy failed") : copied ? t("Copied") : t("Copy hint")}
      </div>
    </dialog>
  );
}
