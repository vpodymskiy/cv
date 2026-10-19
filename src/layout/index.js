import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Layout = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const menu = [
    { url: "/", name: t("about") },
    { url: "/resumen", name: t("resumen") },
    { url: "/portfolio", name: t("proyectos") },
    { url: "/contacts", name: t("contacto") },
  ];
  const pageName = menu.find((item) => item.url === location.pathname)?.name || "";

  return (
    <div className="relative">
      <nav className="sticky top-3 z-30 -mx-2 pt-3 md:pt-0 md:mx-0 md:absolute md:top-0 md:-right-8">
        <ul className="flex justify-between md:justify-start gap-1 md:gap-0 p-1 md:px-4 md:py-0 rounded-2xl md:rounded-3xl bg-main-blue md:bg-hover-blue shadow-xl">
          {menu.map((item) => (
            <li key={item.url} className="flex-1 md:flex-none">
              <NavLink
                to={item.url}
                end
                className={({ isActive }) =>
                  `block text-center whitespace-nowrap text-[13px] sm:text-sm md:text-base px-2 sm:px-3 md:px-5 py-2.5 md:py-4 rounded-xl md:rounded-none font-semibold transition-colors ${
                    isActive
                      ? "bg-hover-blue text-white md:bg-transparent md:underline md:decoration-2 md:underline-offset-8"
                      : "text-gray-300 md:text-blue-100/80 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <header className="pt-5 md:pt-8">
        <h1 className="mt-7 md:mt-0 text-3xl font-bold leading-tight">
          {pageName}
          <span className="block w-12 h-[5px] bg-hover-blue mt-4 mb-8 rounded"></span>
        </h1>
      </header>
      <main className="fade-in" key={location.pathname}>
        <Outlet />
      </main>
    </div>
  );
};
