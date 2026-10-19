import { IconEducation } from "./icons/IconEducation";
import { IconExperience } from "./icons/IconExperience";
import { useTranslation } from "react-i18next";

const Entry = ({ title, children }) => (
  <div className="relative pl-6 pb-8 last:pb-0 border-l border-hover-blue/30">
    <span className="absolute -left-[7px] top-1.5 w-3.5 h-3.5 rounded-full bg-hover-blue ring-4 ring-hover-blue/20"></span>
    <h4 className="font-serif text-lg font-bold leading-snug">{title}</h4>
    {children}
  </div>
);

const Column = ({ icon, title, children }) => (
  <section className="md:w-1/2 w-full">
    <h3 className="section-title mt-0">
      {icon}
      {title}
    </h3>
    <div className="ml-2">{children}</div>
  </section>
);

export const Resumen = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <Column icon={<IconExperience iconStyle="w-8 h-8 fill-hover-blue" />} title={t("experiencia")}>
        <Entry title="Soluciones Web 365 SL">
          <p className="mt-1 text-gray-200">{t("sw365_puesto")}</p>
          <p className="text-sm text-gray-400">{t("sw365_fecha")}</p>
          <ul className="list-disc ml-5 mt-3 space-y-2 text-gray-200">
            <li>{t("sw365_1")}</li>
            <li>{t("sw365_2")}</li>
          </ul>
        </Entry>
      </Column>

      <Column icon={<IconEducation iconStyle="w-8 h-8 fill-hover-blue" />} title={t("educacion")}>
        <Entry title={t("fp_titulo")}>
          <p className="mt-1 text-sm text-gray-400">{t("fp_fecha")}</p>
        </Entry>
        <Entry title={t("grado_titulo")}>
          <p className="mt-1 text-sm text-gray-400">{t("grado_fecha")}</p>
        </Entry>
      </Column>
    </div>
  );
};
