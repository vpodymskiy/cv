import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LANGS = ["es", "en"];

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const current = i18n.resolvedLanguage || "es";

  useEffect(() => {
    document.documentElement.lang = current;
  }, [current]);

  return (
    <div
      role="group"
      aria-label="Language"
      className="absolute lg:fixed top-4 right-4 z-50 flex gap-1 p-1 rounded-full bg-main-blue/90 backdrop-blur shadow-lg text-sm font-semibold"
    >
      {LANGS.map((lng) => (
        <button
          key={lng}
          type="button"
          onClick={() => i18n.changeLanguage(lng)}
          aria-pressed={current === lng}
          className={`px-3 py-1.5 rounded-full uppercase tracking-wide transition-colors ${
            current === lng ? "bg-hover-blue text-white" : "text-gray-300 hover:text-white"
          }`}
        >
          {lng}
        </button>
      ))}
    </div>
  );
};
