import { useTranslation } from "react-i18next";
import { IconGithub } from "./icons/IconGithub";

const PROJECTS = [
  {
    title: "bot_titulo",
    meta: "bot_meta",
    stack: "Java · Spring Boot · PostgreSQL",
    bullets: ["bot_1", "bot_2", "bot_3"],
  },
  {
    title: "api_titulo",
    stack: "Java 25 · Spring Boot 4 · Docker",
    bullets: ["api_1", "api_2"],
    repo: "https://github.com/vpodymskiy/cv-backend",
  },
  {
    title: "web_titulo",
    stack: "React · Tailwind · i18next",
    bullets: ["web_1"],
    repo: "https://github.com/vpodymskiy/cv",
  },
];

export const Portfolio = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-6">
      {PROJECTS.map((p, i) => (
        <article
          key={p.title}
          className="bg-main-blue rounded-2xl p-6 border border-white/5 fade-up"
          style={{ animationDelay: `${i * 120}ms` }}
        >
          <h4 className="text-xl font-serif font-bold leading-snug">{t(p.title)}</h4>
          {p.meta && <p className="text-sm text-gray-400 mt-1">{t(p.meta)}</p>}
          <p className="text-sm text-hover-blue font-mono mt-2">{p.stack}</p>
          <ul className="list-disc ml-5 mt-4 space-y-2 text-gray-200">
            {p.bullets.map((b) => (
              <li key={b}>{t(b)}</li>
            ))}
          </ul>
          {p.repo && (
            <a
              href={p.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-lg bg-white/5 text-sm font-semibold hover:bg-white/10 hover:text-hover-yellow transition-colors"
            >
              <IconGithub iconStyle="w-5 h-5" />
              {t("codigo")}
            </a>
          )}
        </article>
      ))}
    </div>
  );
};
