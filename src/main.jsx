import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { profile, shelves } from "./data";
import { localizedContent } from "./content";
import MarkdownBody from "./MarkdownBody";
import "./styles.css";
import { languages, translator } from "./i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import GlobalSearch from "./GlobalSearch";
import ContactDialog, { ContactIcon } from "./ContactDialog";
import SocialIcon from "./SocialIcon";
import { noteCategories, latestNoteCategories } from "./notes";
import { studyNotes, noteTranslation, notesInCategory } from "./studyNotes";
import StudyNote, { NoteList } from "./StudyNote";
import { initialLanguage } from "./language.js";

const nav = [
  ["home", "🏠", "Home"],
  ["blog", "💻", "Blog"],
  ["notes", "📝", "Notes"],
  ["projects", "🛠️", "Projects"],
  ["about", "💾", "About me"],
];
const colors = [
  { name: "Coral", value: "#f27b87" },
  { name: "Lilac", value: "#b69af4" },
  { name: "Sky", value: "#79b9ee" },
  { name: "Mint", value: "#7dc9aa" },
  { name: "Gold", value: "#e5bb76" },
];
function saved(key, fallback) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}
function Icon({ type }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === "sun" ? (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </>
      ) : type === "moon" ? (
        <path d="M20 14A8.5 8.5 0 0 1 10 4a8.5 8.5 0 1 0 10 10Z" />
      ) : type === "search" ? (
        <>
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 5 5" />
        </>
      ) : type === "mail" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </>
      ) : (
        <>
          <path d="m6 14 6-6 6 6M12 8v12" />
        </>
      )}
    </svg>
  );
}
function Sprout({ t }) {
  return (
    <svg
      className="sprout"
      viewBox="0 0 180 170"
      role="img"
      aria-label={t("一棵像素风小芽")}
    >
      <circle cx="90" cy="87" r="66" fill="var(--accent)" opacity=".85" />
      <g shapeRendering="crispEdges">
        <path
          fill="#24252b"
          d="M81 63h13v49H81zM53 41h28v9h13v26H69V64H53zM94 55h13V43h31v25h-13v13H94z"
        />
        <path
          fill="#97d9ad"
          d="M59 47h17v9h12v13H75V58H59zM100 61h13V49h19v13h-13v13h-19z"
        />
        <path fill="#e8d8bc" d="M57 103h68v13h-7v35H65v-35h-8z" />
        <path fill="#baa88f" d="M65 115h53v7H65zM109 122h9v29h-9z" />
        <path
          fill="#292a30"
          d="M76 129h5v7h-5zM99 129h5v7h-5zM85 140h12v4H85z"
        />
        <path fill="#f08a93" d="M70 137h9v4h-9zM102 137h9v4h-9z" />
        <path
          fill="#faf0dc"
          d="M41 76h5v5h5v5h-5v5h-5v-5h-5v-5h5zM137 94h4v5h5v4h-5v5h-4v-5h-5v-4h5z"
        />
      </g>
    </svg>
  );
}
function App() {
  const [language, setLanguage] = useState(() => {
    return initialLanguage(
      saved("garden-language", ""),
      navigator.languages?.[0] || navigator.language,
    );
  });
  const posts = localizedContent("blog", language);
  const projects = localizedContent("projects", language);
  function selectLanguage(value) {
    setLanguage(value);
    try {
      localStorage.setItem("garden-language", value);
    } catch {}
  }
  const t = translator(language);
  useEffect(() => {
    document.documentElement.lang = languages.find(
      (item) => item.code === language,
    ).locale;
  }, [language]);
  const [route, setRoute] = useState(location.hash.slice(1) || "/");
  const [theme, setTheme] = useState(() => saved("garden-theme", "dark"));
  const [accent, setAccent] = useState(() =>
    saved("garden-accent", colors[0].value),
  );
  const [palette, setPalette] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const change = () => {
      setRoute(location.hash.slice(1) || "/");
      setQuery("");
      setPalette(false);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.setProperty("--accent-base", accent);
    try {
      localStorage.setItem("garden-theme", theme);
      localStorage.setItem("garden-accent", accent);
    } catch {}
  }, [theme, accent]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setPalette(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const parts = route.split("/").filter(Boolean);
  const page = parts[0] === "shelves" ? "notes" : parts[0] || "home";
  useEffect(() => {
    const studyNote =
      page === "note" ? studyNotes.find((note) => note.id === parts[1]) : null;
    document.title = `${studyNote ? noteTranslation(studyNote, language).title : page === "home" ? profile.name : page === "post" ? posts.find((p) => p.id === parts[1])?.title || t("Page not found.") : page === "project" ? projects.find((p) => p.id === parts[1])?.title || t("Page not found.") : t(page === "resume" ? "Resume" : nav.find((item) => item[0] === page)?.[2] || "Page not found.")} · ${t("Digital Garden")}`;
  }, [route, language]);
  useEffect(() => {
    const shortcut = (e) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName) &&
        page === "blog"
      ) {
        e.preventDefault();
        document.querySelector(".search input")?.focus();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, [page]);
  const tag = parts[1];
  const filtered = posts.filter(
    (p) =>
      (!tag || p.shelf === tag || p.tags.includes(tag)) &&
      `${p.title} ${p.summary} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  function PostList({ items = posts }) {
    return (
      <div className="post-list">
        {items.map((p) => (
          <a className="post-row" href={`#/post/${p.id}`} key={p.id}>
            <span className="post-icon">{p.icon}</span>
            <span className="post-info">
              <strong lang={p.language === "zh" ? "zh-CN" : p.language}>
                {p.title}
              </strong>
              <time dateTime={p.date}>
                {new Date(p.date + "T12:00:00").toLocaleDateString(
                  languages.find((item) => item.code === language).locale,
                  {
                    month: "long",
                    day: "numeric",
                  },
                )}
              </time>
            </span>
            <span className="tags">
              {p.tags.map((t) => (
                <span key={t}># {t}</span>
              ))}
            </span>
          </a>
        ))}
      </div>
    );
  }
  function Heading({ title, to, label }) {
    return (
      <div className="section-heading">
        <h2>{t(title)}</h2>
        {to && (
          <a className="small-button" href={to}>
            {t(label)}
          </a>
        )}
      </div>
    );
  }
  function Notes({ recent = false }) {
    return (
      <div className="shelf-grid notes-grid">
        {(recent ? latestNoteCategories() : noteCategories).map((category) => (
          <a
            className={`shelf-card ${category.color}`}
            key={category.id}
            href={`#/notes/${category.id}`}
          >
            <div className="shelf-top">
              <span>{category.icon}</span>
              <span className="count">
                {notesInCategory(category.id).length}
              </span>
            </div>
            <h3>{t(category.name)}</h3>
            <p>
              {notesInCategory(category.id).length
                ? noteTranslation(notesInCategory(category.id)[0], language)
                    .title
                : t("No notes yet")}
            </p>
            <span className="shelf-label">
              {t("Browse notes")} <span>↗</span>
            </span>
          </a>
        ))}
      </div>
    );
  }
  function Projects() {
    return (
      <div className="project-grid">
        {projects.map((p) => (
          <a className="project-card" href={`#/project/${p.id}`} key={p.id}>
            <div className="project-meta">
              <span>{t(p.year)}</span>
              <span>{p.icon}</span>
            </div>
            <h3 lang={p.language === "zh" ? "zh-CN" : p.language}>{p.title}</h3>
            <p lang={p.language === "zh" ? "zh-CN" : p.language}>
              {p.description}
            </p>
            <span className="project-link">
              {t(p.status)} <span>↗</span>
            </span>
          </a>
        ))}
      </div>
    );
  }
  function Intro() {
    return (
      <>
        <h1>{t("greeting", { name: profile.name })}</h1>
        <p className="subtitle">{t(profile.tagline)}</p>
        <div className="intro-grid">
          <div>
            <h3>{t("A little about this space")}</h3>
            <div className="timeline">
              <div>
                <span>{t("LEARN")}</span>
                <p>
                  <a href="#/blog/learning">{t("保持好奇")}</a>
                  {t("learnBody")}
                </p>
              </div>
              <div>
                <span>{t("BUILD")}</span>
                <p>
                  <a href="#/projects">{t("动手创造")}</a>
                  {t("buildBody")}
                </p>
              </div>
              <div>
                <span>{t("WRITE")}</span>
                <p>
                  <a href="#/blog">{t("记录过程")}</a>
                  {t("writeBody")}
                </p>
              </div>
              <div>
                <span>{t("LIVE")}</span>
                <p>
                  <a href="#/blog/life">{t("认真生活")}</a>
                  {t("liveBody")}
                </p>
              </div>
            </div>
            <p className="also">
              <a href="#/about">{t("Also")}</a>
              {t("alsoBody")}
            </p>
          </div>
          <div className="mascot">
            <Sprout t={t} />
            <div className="speech">
              {t("A little corner of the internet.")}
              <br />
              <strong>{t("Make yourself at home.")}</strong>
            </div>
          </div>
        </div>
      </>
    );
  }
  let content;
  if (page === "home")
    content = (
      <>
        <section className="hero">
          <Intro />
        </section>
        <section>
          <Heading title={t("Latest")} to="#/blog" label={t("All Posts")} />
          <PostList />
        </section>
        <section>
          <Heading title={t("Notes")} to="#/notes" label={t("All Notes")} />
          <p className="section-intro">{t("Recent notes intro")}</p>
          <Notes recent />
        </section>
        <section>
          <Heading
            title={t("Projects")}
            to="#/projects"
            label={t("All Projects")}
          />
          <p className="section-intro">{t("一些正在生长的作品与想法。")}</p>
          <Projects />
        </section>
      </>
    );
  else if (page === "blog")
    content = (
      <section className="page">
        <span className="breadcrumb" aria-hidden="true">
          &nbsp;
        </span>
        <h1>{t(shelves.find((s) => s.id === tag)?.name || "Blog")}</h1>
        <p className="subtitle">
          {t("Notes on learning, building, and everything in between.")}
        </p>
        <label className="search">
          <Icon type="search" />
          <input
            aria-label={t("搜索文章")}
            placeholder={t("搜索文章、主题或关键词…")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd>/</kbd>
        </label>
        <div className="filters">
          <a className={!tag ? "selected" : ""} href="#/blog">
            {t("全部文章")}
          </a>
          {shelves.map((s) => (
            <a
              key={s.id}
              className={tag === s.id ? "selected" : ""}
              href={`#/blog/${s.id}`}
            >
              {t(s.label)}
            </a>
          ))}
        </div>
        <div className="archive-title">
          <h2>{t("All Posts")}</h2>
          <span>{t("postCount", { count: filtered.length })}</span>
        </div>
        {filtered.length ? (
          <PostList items={filtered} />
        ) : (
          <p className="empty" role="status">
            {t("没有找到相关的文章。试试其他关键词？")}
          </p>
        )}
      </section>
    );
  else if (
    page === "notes" &&
    (!tag || noteCategories.some((item) => item.id === tag))
  )
    content = (
      <section className="page">
        {!tag && (
          <span className="breadcrumb" aria-hidden="true">
            &nbsp;
          </span>
        )}
        {tag && (
          <a className="breadcrumb return-link" href="#/notes">
            ← {t("All Notes")}
          </a>
        )}
        <h1>
          {t(noteCategories.find((item) => item.id === tag)?.name || "Notes")}
        </h1>
        <p className="subtitle">{t("Notes intro")}</p>
        {tag ? (
          <NoteList category={tag} language={language} t={t} />
        ) : (
          <Notes />
        )}
      </section>
    );
  else if (page === "note" && studyNotes.some((note) => note.id === tag))
    content = (
      <StudyNote
        note={studyNotes.find((note) => note.id === tag)}
        language={language}
        t={t}
      />
    );
  else if (page === "projects")
    content = (
      <section className="page">
        <span className="breadcrumb" aria-hidden="true">
          &nbsp;
        </span>
        <h1>{t("Projects")}</h1>
        <p className="subtitle">
          {t("Things I've made, and things I'm imagining.")}
        </p>
        <p className="section-intro">
          {t("本站是可运行的作品，其余卡片是可以替换的项目构想。")}
        </p>
        <Projects />
      </section>
    );
  else if (page === "resume")
    content = (
      <section className="page prose resume-page">
        <a className="breadcrumb" href="#/">
          {t("Home")} /
        </a>
        <h1>{t("Resume")}</h1>
        <p className="subtitle">miraie · {t("Resume intro")}</p>
        <aside className="note">{t("Resume placeholder")}</aside>
        {["Education", "Experience", "Skills"].map((section) => (
          <section key={section}>
            <hr className="about-divider" />
            <h2>{t(section)}</h2>
            <p>{t(`${section} placeholder`)}</p>
          </section>
        ))}
      </section>
    );
  else if (page === "about")
    content = (
      <section className="page prose about-page">
        <a className="breadcrumb" href="#/">
          {t("Home")} /
        </a>
        <h1>{t("About me")}</h1>
        <p className="subtitle">{t("aboutGreeting", { name: profile.name })}</p>
        <hr className="about-divider" />
        <div className="about-art">
          <Sprout t={t} />
        </div>
        <h2>{t("Welcome to my little corner.")}</h2>
        <p lang="zh-CN">{profile.intro}</p>
        <p lang="zh-CN">{profile.about}</p>
        <hr className="about-divider" />
        <h2>{t("Elsewhere")}</h2>
        <ul className="contact-list">
          <li>
            <span className="contact-line">
              <ContactIcon kind="email" />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </span>
          </li>
          <li>
            <span className="contact-line">
              <SocialIcon kind="github" />
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub · NormanJiang ↗
              </a>
            </span>
          </li>
          <li>
            <span className="contact-line">
              <ContactIcon kind="wechat" />
              <span>
                {t("WeChat")} · {profile.wechat}
              </span>
            </span>
          </li>
        </ul>
        <hr className="about-divider" />
        <h2>{t("About this website")}</h2>
        <p>
          {t("设计致敬")}{" "}
          <a
            href="https://www.taniarascia.com/"
            target="_blank"
            rel="noreferrer"
          >
            Tania Rascia
          </a>{" "}
          {t("的个人网站：简单的布局、舒适的阅读节奏，以及一点复古的趣味。")}
        </p>
        <p>{t("Font details")}</p>
        <p lang="en">Build with GPT-6 Astra</p>
      </section>
    );
  else if (page === "post" && posts.some((p) => p.id === tag)) {
    const p = posts.find((p) => p.id === tag);
    content = (
      <article className="page prose">
        <a className="breadcrumb" href="#/blog">
          ← {t("All Posts")}
        </a>
        <div className="article-meta">{p.date}</div>
        <h1 lang={p.language === "zh" ? "zh-CN" : p.language}>{p.title}</h1>
        <p
          className="subtitle"
          lang={p.language === "zh" ? "zh-CN" : p.language}
        >
          {p.summary}
        </p>
        <div className="article-tags">
          {p.tags.map((t) => (
            <a key={t} href={`#/blog/${t}`}>
              # {t}
            </a>
          ))}
        </div>
        <MarkdownBody copy={p} language={language} t={t} />
        <div className="article-end">{t("✦ Thanks for reading.")}</div>
      </article>
    );
  } else if (page === "project" && projects.some((p) => p.id === tag)) {
    const p = projects.find((p) => p.id === tag);
    content = (
      <article className="page prose">
        <a className="breadcrumb" href="#/projects">
          ← {t("All Projects")}
        </a>
        <h1>
          {p.icon} {p.title}
        </h1>
        <p
          className="subtitle"
          lang={p.language === "zh" ? "zh-CN" : p.language}
        >
          {p.description}
        </p>
        <span className="badge">{t(p.status)}</span>
        <h2>{t("About the project")}</h2>
        <MarkdownBody copy={p} language={language} t={t} />
      </article>
    );
  } else
    content = (
      <section className="page">
        <h1>{t("Page not found.")}</h1>
        <p>{t("这条小径还没有开辟。")}</p>
        <a href="#/">{t("← 回到首页")}</a>
      </section>
    );
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("main").focus();
        }}
      >
        {t("跳至正文")}
      </a>
      <div className="site-tools">
        <GlobalSearch t={t} route={route} language={language} />
        <LanguageSwitcher
          language={language}
          onChange={selectLanguage}
          label={t("Language")}
        />
      </div>
      {contactOpen && (
        <ContactDialog
          open={contactOpen}
          onClose={() => setContactOpen(false)}
          t={t}
        />
      )}
      <aside className="sidebar">
        <div className="brand-row">
          <a className="brand" href="#/">
            <span>💾</span>
            {profile.brand}
          </a>
          <div className="settings">
            <button
              className="color-toggle"
              aria-label={t("选择强调色")}
              aria-expanded={palette}
              onClick={() => setPalette(!palette)}
            >
              <span />
            </button>
            <button
              className="theme-toggle"
              aria-label={
                theme === "dark" ? t("切换为浅色模式") : t("切换为深色模式")
              }
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Icon type={theme === "dark" ? "sun" : "moon"} />
            </button>
          </div>
          {palette && (
            <div className="palette" aria-label={t("强调色选项")}>
              {colors.map((c) => (
                <button
                  key={c.name}
                  style={{ background: c.value }}
                  aria-label={t(c.name)}
                  aria-pressed={accent === c.value}
                  onClick={() => {
                    setAccent(c.value);
                    setPalette(false);
                  }}
                >
                  {accent === c.value ? "✓" : ""}
                </button>
              ))}
            </div>
          )}
        </div>
        <a
          className="sidebar-portrait"
          href="#/about"
          aria-label={t("About me")}
        >
          <img src="/images/miraie.jpg" alt="miraie" width="220" height="220" />
        </a>
        <p className="sidebar-intro">
          {t("sidebarGreeting")} <a href="#/about">{profile.name}</a>.<br />
          {t("Welcome to my digital garden.")}
          <br />
          {t("A place to learn, build, and grow.")} 🌱
        </p>
        <nav aria-label={t("主导航")}>
          {nav.map(([id, icon, label]) => (
            <a
              key={id}
              className={
                page === id ||
                (page === "post" && id === "blog") ||
                (page === "note" && id === "notes") ||
                (page === "project" && id === "projects")
                  ? "active"
                  : ""
              }
              href={id === "home" ? "#/" : `#/${id}`}
              aria-current={page === id ? "page" : undefined}
            >
              <span>{icon}</span>
              {t(label)}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="social">
            <button
              className="contact-trigger"
              aria-label={t("联系方式")}
              onClick={() => setContactOpen(true)}
            >
              <Icon type="mail" />
            </button>
            <a
              href={profile.github}
              aria-label="GitHub · NormanJiang"
              title="GitHub · NormanJiang"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .75a11.25 11.25 0 0 0-3.558 21.922c.563.104.768-.244.768-.542 0-.267-.01-.975-.015-1.914-3.13.68-3.791-1.508-3.791-1.508-.512-1.3-1.25-1.646-1.25-1.646-1.022-.699.077-.685.077-.685 1.13.08 1.725 1.16 1.725 1.16 1.005 1.723 2.637 1.225 3.28.937.102-.728.393-1.225.715-1.507-2.499-.284-5.126-1.25-5.126-5.563 0-1.229.439-2.233 1.16-3.02-.116-.285-.503-1.43.11-2.98 0 0 .945-.302 3.094 1.154A10.79 10.79 0 0 1 12 6.18c.956.005 1.918.13 2.816.379 2.148-1.456 3.091-1.154 3.091-1.154.615 1.55.228 2.695.112 2.98.722.787 1.158 1.791 1.158 3.02 0 4.325-2.631 5.276-5.138 5.555.404.35.765 1.04.765 2.096 0 1.513-.014 2.733-.014 3.104 0 .3.203.65.774.54A11.252 11.252 0 0 0 12 .75Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/miraie.819/"
              aria-label="Instagram · miraie.819"
              title="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon kind="instagram" />
            </a>
            <a
              href="https://steamcommunity.com/profiles/76561199025590134/"
              aria-label="Steam · miraie"
              title="Steam"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon kind="steam" />
            </a>
            <span title={t("Keep growing")}>🌱</span>
          </div>
          <div className="mini-links">
            <a
              href="#/resume"
              aria-current={page === "resume" ? "page" : undefined}
            >
              {t("Resume")}
            </a>
            <span>|</span>
            <a href="#/notes">{t("Notes")}</a>
            <span>|</span>
            <a
              href="https://github.com/NormanJiang/Homepage_Miraie"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Source")}
            </a>
          </div>
        </div>
      </aside>
      <main id="main" tabIndex="-1">
        {content}
        <footer>
          <div className="mobile-footer-links">
            <a
              href="#/resume"
              aria-current={page === "resume" ? "page" : undefined}
            >
              {t("Resume")}
            </a>
            <span aria-hidden="true">/</span>
            <a href="#/notes">{t("Notes")}</a>
            <span aria-hidden="true">/</span>
            <a
              href="https://github.com/NormanJiang/Homepage_Miraie"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("Source")}
            </a>
          </div>
          <div className="desktop-footer-links">
            <a href="#/blog">{t("Blog")}</a>
            <a href="#/projects">{t("Projects")}</a>
            <button
              className="footer-contact"
              onClick={() => setContactOpen(true)}
            >
              {t("Say hello")}
            </button>
          </div>
          <p>
            {t("Made with")} <span className="heart">♥</span> {t("by")}{" "}
            {profile.name}
            <br />
            <small>{t("A small, independent corner of the internet.")}</small>
          </p>
          <a
            className="back-top"
            href="#main"
            aria-label={t("返回页面顶部")}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              document.getElementById("main").focus({ preventScroll: true });
            }}
          >
            ↑
          </a>
        </footer>
      </main>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
