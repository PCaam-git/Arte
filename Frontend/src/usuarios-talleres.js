// usuarios-talleres.js

// Importamos solo la función necesaria para obtener talleres
import { fetchTalleres } from "./api-talleres.js";

// Array global para almacenar los talleres cargados desde el servidor
let talleres = [];

// Event listener que se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", async () => {
  // Cargar talleres iniciales
  await cargarTalleres();
});

// Función asíncrona para obtener los talleres del servidor y mostrarlos
async function cargarTalleres() {
  try {
    talleres = await fetchTalleres();
    mostrarTalleres();
  } catch (error) {
    console.error("Error al cargar talleres:", error);
    const talleresLista = document.getElementById("talleres-lista");
    talleresLista.innerHTML = `
      <div class="col-12 text-center">
        <div class="alert alert-danger">
          No se pudieron cargar los talleres. Por favor, inténtalo de nuevo más tarde.
        </div>
      </div>
    `;
  }
}

// Función para crear y mostrar las tarjetas de talleres en el DOM
function mostrarTalleres() {
  const talleresLista = document.getElementById("talleres-lista");

  // Si no hay talleres, mostrar un mensaje
  if (talleres.length === 0) {
    talleresLista.innerHTML = `
      <div class="col-12 text-center">
        <p class="alert alert-info">No hay talleres disponibles en este momento.</p>
      </div>
    `;
    return;
  }

  // Usar template literals para crear el HTML de cada taller
  talleresLista.innerHTML = talleres.map(taller => `
    <div class="col-md-4 mb-5">
      <div class="card mx-auto h-100" style="max-width: 400px;">
        ${taller.imagen ? `
        <div class="text-center p-3">
          <img src="http://localhost:8090/uploads/${taller.imagen}" 
               class="card-img-top" 
               alt="${taller.tematica}"
               style="width: 90%; height: auto; object-fit: cover;"
               onerror="this.src='placeholder.jpg'">
        </div>` : ''}
        <div class="card-body px-4">
          <h5 class="card-title">${taller.tematica}</h5>
          <p class="card-text"><strong>Fecha:</strong> ${new Date(taller.fecha).toLocaleDateString()}</p>
          <p class="card-text"><strong>Lugar:</strong> ${taller.lugar}</p>
          <p class="card-text">${taller.descripcion || ''}</p>
          
          <!-- Botón para más información o inscripción -->
          <button class="btn btn-outline-primary w-100">Más información</button>
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