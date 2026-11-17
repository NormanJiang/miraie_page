import React, { useEffect, useState } from "react";
import bodies from "virtual:content-bodies";
export default function MarkdownBody({ copy, language, t }) {
  const [result, setResult] = useState({ path: "", html: "", error: false });
  useEffect(() => {
    let active = true;
    const loader = bodies[copy.path];
    Promise.resolve()
      .then(() => {
        if (!loader) throw Error("Missing article");
        return loader();
      })
      .then((module) => {
        if (active)
          setResult({ path: copy.path, html: module.default, error: false });
      })
      .catch(() => {
        if (active) setResult({ path: copy.path, html: "", error: true });
      });
    return () => {
      active = false;
    };
  }, [copy.path]);
  const lang = copy.language === "zh" ? "zh-CN" : copy.language;
  return (
    <>
      {copy.language !== language && (
        <p className="note-scope">{t("Translation pending")}</p>
      )}
      {result.path !== copy.path ? (
        <p role="status">{t("Loading article")}</p>
      ) : result.error ? (
        <p role="alert">{t("Article load error")}</p>
      ) : (
        <div
          className="markdown-body"
          lang={lang}
          dangerouslySetInnerHTML={{ __html: result.html }}
        />
      )}
    </>
  );
}
