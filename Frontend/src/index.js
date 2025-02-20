// Importar funciones necesarias para manejar las obras desde la API
import { fetchObras, createObra, updateObra, deleteObra } from "./api.js";

// Event listener para el botón de login que redirige a la página de inicio de sesión
document.getElementById("login-button").addEventListener("click", () => {
 window.location.href = "login.html";
});

// Cuando el DOM está completamente cargado, inicializar la página
document.addEventListener("DOMContentLoaded", async () => {
 // Obtener el contenedor donde se mostrarán las obras
 const obrasContainer = document.getElementById("obras-container");

 // Event listener para manejar el cierre de sesión
 document.getElementById("cerrar-sesion").addEventListener("click", () => {
   // Eliminar token del almacenamiento local
   localStorage.removeItem("token");
   // Notificar al usuario
   alert("Sesión cerrada correctamente");
   // Redirigir a la página principal
   window.location.href = "index.html";
 });

 // Cargar y mostrar las obras desde la API
 const obras = await fetchObras();
 // Crear elementos HTML para cada obra
 obras.forEach((obra) => {
   const obraElement = document.createElement("div");
   // Añadir clase CSS para estilizado
   obraElement.classList.add("obra");
   // Crear el HTML para mostrar la información de la obra
   obraElement.innerHTML = `
           <h3>${obra.descripcion}</h3>
           <p>Fecha: ${obra.fecha_creacion}</p>
           <p>Precio: $${obra.precio}</p>
           <img src="${obra.imagen}" alt="${obra.descripcion}" width="200">
           <button onclick="deleteObra(${obra.ID_obra})">Eliminar</button>
       `;
   // Añadir la obra al contenedor
   obrasContainer.appendChild(obraElement);
 });

 // Manejar el envío del formulario para crear nuevas obras
 document
   .getElementById("obra-form")
   .addEventListener("submit", async (event) => {
     // Prevenir el comportamiento por defecto del formulario
     event.preventDefault();
     // Crear FormData con los datos del formulario
     const formData = new FormData(event.target);

     // Enviar los datos a la API y crear la obra
     await createObra(formData);
     // Recargar la página para mostrar la nueva obra
     location.reload();
   });
});