import { fetchObras, createObra, updateObra, deleteObra } from "./api.js";

document.getElementById("login-button").addEventListener("click", () => {
  window.location.href = "login.html";
});

document.addEventListener("DOMContentLoaded", async () => {
  const obrasContainer = document.getElementById("obras-container");

  // Manejo del cierre de sesión
  document.getElementById("cerrar-sesion").addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("Sesión cerrada correctamente");
    window.location.href = "index.html";
  });

  // Cargar obras de la API
  const obras = await fetchObras();
  obras.forEach((obra) => {
    const obraElement = document.createElement("div");
    obraElement.classList.add("obra");
    obraElement.innerHTML = `
            <h3>${obra.descripcion}</h3>
            <p>Fecha: ${obra.fecha_creacion}</p>
            <p>Precio: $${obra.precio}</p>
            <img src="${obra.imagen}" alt="${obra.descripcion}" width="200">
            <button onclick="deleteObra(${ID_obra})">Eliminar</button>
        `;
    obrasContainer.appendChild(obraElement);
  });

  // Formulario creación de obras
  document
    .getElementById("obra-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);

      await createObra(formData);
      location.reload();
    });
});
