import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const API_URL = "https://cv-backend-1080240364704.us-central1.run.app";
const SLOW_AFTER_MS = 4000; // a partir de aquí avisamos de que el servidor se está despertando
const TIMEOUT_MS = 30000; // Cloud Run arranca en unos segundos; el backend corta el SMTP a los 5 s

export const Contacts = () => {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [estado, setEstado] = useState("idle"); // idle, cargando, enviado, error
  const [lento, setLento] = useState(false);
  const despertado = useRef(false);

  // El backend está en Cloud Run con min-instances=0 y se apaga cuando no hay tráfico.
  // Lo despertamos en cuanto el usuario empieza a rellenar el formulario,
  // para que al pulsar "Enviar" ya esté listo.
  const despertarServidor = () => {
    if (despertado.current) return;
    despertado.current = true;
    fetch(API_URL, { method: "GET", mode: "no-cors" }).catch(() => {});
  };

  useEffect(() => {
    if (estado !== "cargando") {
      setLento(false);
      return;
    }
    const t = setTimeout(() => setLento(true), SLOW_AFTER_MS);
    return () => clearTimeout(t);
  }, [estado]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado("cargando");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setEstado("enviado");
        setForm({ name: "", phone: "", email: "", message: "" });
      } else {
        setEstado("error");
      }
    } catch (error) {
      console.error(error);
      setEstado("error");
    } finally {
      clearTimeout(timeout);
    }
  };

  const fields = [
    { name: "name", type: "text", autoComplete: "name", required: true },
    { name: "email", type: "email", autoComplete: "email", required: true },
    { name: "phone", type: "tel", autoComplete: "tel", required: false },
  ];
  const labels = { name: "form_nombre", email: "form_email", phone: "form_telefono" };

  return (
    <div>
      <p className="text-lg leading-relaxed text-gray-200">{t("form_intro")}</p>

      <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit} onFocus={despertarServidor}>
        {fields.map((f) => (
          <label key={f.name} className={f.name === "phone" ? "sm:col-span-2" : ""}>
            <span className="block mb-1.5 text-sm font-semibold text-gray-300">
              {t(labels[f.name])}
              {!f.required && <span className="font-normal text-gray-500"> · {t("form_opcional")}</span>}
            </span>
            <input
              className="field"
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              value={form[f.name]}
              onChange={handleChange}
              required={f.required}
            />
          </label>
        ))}
        <label className="sm:col-span-2">
          <span className="block mb-1.5 text-sm font-semibold text-gray-300">{t("form_mensaje")}</span>
          <textarea
            className="field min-h-[140px] resize-y"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </label>
        <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            type="submit"
            disabled={estado === "cargando"}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-hover-blue px-8 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:bg-blue-500 disabled:opacity-60 disabled:cursor-wait"
          >
            {estado === "cargando" && (
              <span
                className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
                aria-hidden="true"
              ></span>
            )}
            {estado === "cargando" ? t("form_enviando") : t("form_enviar")}
          </button>
          <div aria-live="polite" className="text-sm">
            {estado === "cargando" && lento && <p className="text-gray-300">{t("form_lento")}</p>}
          </div>
        </div>
      </form>

      <div aria-live="polite">
        {estado === "enviado" && (
          <p className="mt-6 rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-emerald-300">
            {t("form_ok")}
          </p>
        )}
        {estado === "error" && (
          <p className="mt-6 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-red-300">
            {t("form_error")}
          </p>
        )}
      </div>
    </div>
  );
};
