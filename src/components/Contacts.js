import React, { useState } from "react";

export const Contacts = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    mensaje: ""
  });

  const [estadoEnvio, setEstadoEnvio] = useState("");

  const manejarCambio = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setEstadoEnvio("Enviando...");

    try {
      const respuesta = await fetch("https://cv-backend-wks3.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formulario)
      });

      if (respuesta.ok) {
        setEstadoEnvio("¡Mensaje enviado correctamente!");
        setFormulario({ nombre: "", telefono: "", correo: "", mensaje: "" });
      } else {
        setEstadoEnvio("Hubo un error al enviar el mensaje.");
      }
    } catch (error) {
      setEstadoEnvio("Servidor no disponible. Inténtalo más tarde.");
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Formulario de Contacto</h3>

      <form className="contact_form flex flex-col gap-3" onSubmit={manejarEnvio}>
        <input
          name="nombre"
          placeholder="Nombre"
          value={formulario.nombre}
          onChange={manejarCambio}
          required
        />
        <input
          name="telefono"
          placeholder="Teléfono"
          value={formulario.telefono}
          onChange={manejarCambio}
        />
        <input
          name="correo"
          placeholder="Correo electrónico"
          value={formulario.correo}
          onChange={manejarCambio}
          required
        />
        <textarea
          name="mensaje"
          placeholder="Mensaje"
          value={formulario.mensaje}
          onChange={manejarCambio}
          required
        />
        <button type="submit">Enviar</button>
      </form>

      {estadoEnvio && (
        <p className="text-sm mt-2">
          {estadoEnvio}
        </p>
      )}
    </div>
  );
};
