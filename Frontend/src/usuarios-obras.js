// usuario-obras.js

// Importamos solo la función necesaria para obtener obras
import { fetchObras } from "./api.js";

// Array global para almacenar las obras cargadas desde el servidor
let obras = [];

// Event listener que se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", async () => {
  // Cargar obras iniciales
  await cargarObras();
});

// Función asíncrona para obtener las obras del servidor y mostrarlas
async function cargarObras() {
  try {
    obras = await fetchObras();
    mostrarObras();
  } catch (error) {
    console.error("Error al cargar obras:", error);
    const obrasLista = document.getElementById("obras-lista");
    obrasLista.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-danger">
          No se pudieron cargar las obras. Por favor, inténtalo de nuevo más tarde.
        </div>
      </div>
    `;
  }
}

// Función para crear y mostrar las tarjetas de obras en el DOM
function mostrarObras() {
  const obrasLista = document.getElementById("obras-lista");

  // Si no hay obras, mostrar un mensaje
  if (obras.length === 0) {
    obrasLista.innerHTML = `
      <div class="col-12 text-center">
        <p class="alert alert-info">No hay obras disponibles en este momento.</p>
      </div>
    `;
    return;
  }

  // Usar template literals para crear el HTML de cada obra
  obrasLista.innerHTML = obras.map(obra => `
    <div class="col-md-4 mb-5">
      <div class="card mx-auto h-100" style="max-width: 400px;">
        <div class="text-center p-3">
          <img src="http://localhost:8090/uploads/${obra.imagen}" 
               class="card-img-top" 
               alt="${obra.descripcion}"
               style="width: 90%; height: auto; object-fit: cover;"
               onerror="this.src='placeholder.jpg'">
        </div>
        <div class="card-body px-4">
          <h5 class="card-title">${obra.descripcion}</h5>
          <p class="card-text">Precio: ${obra.precio}€</p>
          <p class="card-text"><small class="text-muted">Fecha de creación: ${new Date(obra.fecha_creacion).toLocaleDateString()}</small></p>
          
          <!-- Podríamos añadir un botón para ver detalles o añadir al carrito -->
          <button class="btn btn-outline-primary w-100">Ver detalles</button>
        </div>
      </div>
    </div>
  `).join("");
}

// Manejador para cerrar sesión: elimina el token y redirige
document.getElementById("cerrar-sesion").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});