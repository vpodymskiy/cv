import styles from "../styles/About.module.scss";
import { useTranslation } from "react-i18next";

const SKILLS = [
  ["Java", "Spring Boot", "REST API", "MyBatis", "Flyway", "Concurrency"],
  ["PostgreSQL", "MySQL", "JUnit 5 · Mockito", "Testcontainers", "Docker", "Git · Linux"],
];

const LANGUAGES = [
  { key: "ruso", level: "nativo" },
  { key: "espanol", level: "C1" },
  { key: "ingles", level: "B1" },
];

export const AboutMe = () => {
  const { t } = useTranslation();
  return (
    <div>
      <p className="text-lg leading-relaxed text-gray-200 max-w-prose">{t("text_about")}</p>
      <div>
        <h3 className="section-title">{t("aptitudes")}</h3>
        <div className="flex flex-wrap gap-2 md:flex-nowrap md:gap-0">
          {SKILLS.map((column, i) => (
            <ul key={i} className={styles.column}>
              {column.map((skill, j) => (
                <li key={skill} className="fade-up" style={{ animationDelay: `${(j * 2 + i) * 60}ms` }}>
                  {skill}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <h3 className="section-title">{t("idiomas")}</h3>
        <ul className="flex flex-wrap gap-3">
          {LANGUAGES.map(({ key, level }) => (
            <li key={key} className="bg-main-blue rounded-lg px-4 py-2">
              {t(key)} · <span className="text-gray-300">{level === "nativo" ? t("nativo") : level}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
