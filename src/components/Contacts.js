import React, { useEffect, useRef, useState } from "react";
// import { GoogleMapa } from "./GoogleMapa";

const API_URL = "https://cv-backend-wks3.onrender.com";
const SLOW_AFTER_MS = 4000; // a partir de aquí avisamos de que el servidor se está despertando
const TIMEOUT_MS = 90000; // Render puede tardar hasta ~1 min en despertar

export const Contacts = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [estado, setEstado] = useState("idle"); // idle, cargando, enviado, error
  const [lento, setLento] = useState(false);
  const despertado = useRef(false);

  // El backend está en el plan gratuito de Render y se duerme tras 15 min sin uso.
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
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

  return (
    <div>
      {/* <GoogleMapa /> */}
      <h3>Formulario de contacto</h3>

      <form
        className="contact_form flex flex-col gap-3"
        onSubmit={handleSubmit}
        onFocus={despertarServidor}
      >
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Mensaje"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={estado === "cargando"}>
          {estado === "cargando" ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {estado === "cargando" && lento && (
        <p className="text-gray-500 mt-2">
          El servidor se está despertando, puede tardar hasta un minuto. No cierres la página.
        </p>
      )}
      {estado === "enviado" && (
        <p className="text-green-600 mt-2">Mensaje enviado con éxito.</p>
      )}
      {estado === "error" && (
        <p className="text-red-600 mt-2">
          Hubo un error al enviar el mensaje. Inténtalo de nuevo en un momento.
        </p>
      )}
    </div>
  );
};
