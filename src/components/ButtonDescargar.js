import { useTranslation } from "react-i18next";
import { IconClip } from "./icons/IconClip";

export const ButtonDescargar = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage === "en" ? "en" : "es";

  return (
    <a
      href={`/files/cv-vladislav-podymskiy-${lang}.pdf`}
      download={`CV-Vladislav-Podymskiy-${lang.toUpperCase()}.pdf`}
      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-hover-blue px-6 py-3 text-lg font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 active:scale-[.98]"
    >
      {t("download")}
      <IconClip iconStyle="w-5 h-5" />
    </a>
  );
};
