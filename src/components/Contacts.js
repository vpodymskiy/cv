import React, { useState } from "react";
import { GoogleMapa } from "./GoogleMapa";

export const Contacts = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [estado, setEstado] = useState("idle"); // idle, cargando, enviado, error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado("cargando");

    try {
      const response = await fetch("https://cv-backend-wks3.onrender.com/contact", {
        method: "POST",
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
    }
  };

  return (
    <div>
      {/* <GoogleMapa /> */}
      <h3>Formulario de contacto</h3>

      <form className="contact_form flex flex-col gap-3" onSubmit={handleSubmit}>
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

      {estado === "enviado" && (
        <p className="text-green-600 mt-2">Mensaje enviado con éxito.</p>
      )}
      {estado === "error" && (
        <p className="text-red-600 mt-2">Hubo un error al enviar el mensaje.</p>
      )}
    </div>
  );
};
