import { useTranslation } from "react-i18next";
import { ButtonDescargar } from "./ButtonDescargar";
import { LanguageSwitch } from "./LanguageSwitch";
import { IconGithub } from "./icons/IconGithub";
import { IconLinkedin } from "./icons/IconLinkedin";
import { IconMail } from "./icons/IconMail";

const SOCIAL = [
  { href: "mailto:vpodymskiy@icloud.com", label: "Email", Icon: IconMail, icon: "w-6 h-6" },
  {
    href: "https://www.linkedin.com/in/vladislav-podymskiy",
    label: "LinkedIn",
    Icon: IconLinkedin,
    icon: "w-5 h-5",
  },
  { href: "https://github.com/vpodymskiy", label: "GitHub", Icon: IconGithub, icon: "w-6 h-6" },
];

export const ShortInformation = () => {
  const { t } = useTranslation();

  return (
    <aside className="lg:sticky lg:top-8 lg:self-start lg:w-[29%] w-full bg-main-containers rounded-3xl p-8 flex flex-col md:flex-row lg:flex-col items-center md:justify-center gap-8 md:gap-12 lg:gap-0">
      <LanguageSwitch />
      <img
        src="/images/me.jpg"
        alt="Vladislav Podymskiy"
        width="192"
        height="240"
        className="object-cover object-top h-60 w-48 rounded-3xl shadow-2xl shrink-0"
      />
      <div className="flex flex-col items-center md:items-start lg:items-center text-center md:text-left lg:text-center lg:mt-7">
        <h2 className="font-serif font-bold text-[1.7rem] leading-tight">
          Vladislav
          <br />
          Podymskiy
        </h2>
        <span className="block w-10 h-1 mt-4 rounded bg-hover-blue md:mx-0 lg:mx-auto"></span>
        <p className="mt-4 text-lg font-semibold leading-snug text-hover-blue">{t("role")}</p>
        <p className="mt-1 text-sm text-gray-400">{t("stack_line")}</p>
        <ul className="flex items-center gap-1 mt-4 md:-ml-2.5 lg:ml-0">
          {SOCIAL.map(({ href, label, Icon, icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full text-gray-200 hover:text-hover-yellow hover:bg-main-blue transition-colors"
              >
                <Icon iconStyle={icon} />
              </a>
            </li>
          ))}
        </ul>
        <ButtonDescargar />
      </div>
    </aside>
  );
};
