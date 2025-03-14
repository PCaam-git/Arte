//admin-talleres.js

// Importamos las funciones necesarias para interactuar con la API
import { fetchTalleres, createTaller, updateTaller, deleteTaller } from "./api-talleres.js";

// Array global para almacenar los talleres cargados desde el servidor
let talleres = [];
// Obtener el token de autenticación almacenado en el navegador
const token = localStorage.getItem("token");

// Event listener que se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", async () => {

// Verificar si hay un token válido, si no, redirigir al login
  if (!token) {
    window.location.href = "registro.html";
    return;
  }
// Cargar obras iniciales
  await cargarTalleres();
});

// Función asíncrona para obtener los talleres del servidor y mostrarlas
async function cargarTalleres() {
  try {
    talleres = await fetchTalleres();
    mostrarTalleres();
  } catch (error) {
    console.error("Error al cargar talleres:", error);
    alert(error.message);
  }
}

// Función para crear y mostrar las tarjetas de talleres en el DOM
function mostrarTalleres() {
  const talleresLista = document.getElementById("talleres-lista");

  // Usar template literals para crear el HTML de cada taller
  talleresLista.innerHTML = talleres.map(taller => `
       <div class="col-md-5 mb-5">
           <div class="card mx-auto" style="max-width: 600px;">
           <div class="text-center p-3">
               <img src="http://localhost:8090/uploads/${taller.imagen}" 
                    class="card-img-top" 
                    alt="${taller.tematica}"
                     style="width: 90%; height: auto;"
                    onerror="this.src='placeholder.jpg'"> <!-- Imagen de respaldo si falla la carga -->
            </div>
               <div class="card-body px-4">
                   <h5 class="card-title">${taller.tematica}</h5>
                   <button class="btn btn-custom-delete w-100 btn-eliminar" data-id="${taller.ID_taller}">Eliminar</button>
                   <button class="btn btn-custom-edit w-100 mt-2 btn-editar" data-id="${taller.ID_taller}">Editar</button>
               </div>
           </div>
       </div>
   `).join("");

  // Añadir event listeners a los botones después de crear el HTML
  const botonesEliminar = talleresLista.querySelectorAll(".btn-eliminar");
  const botonesEditar = talleresLista.querySelectorAll(".btn-editar");

  // Configurar los handlers para eliminar y editar
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", () => eliminarTaller(boton.dataset.id));
  });
  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", () =>
      cargarFormularioEdicion(boton.dataset.id)
    );
  });
}

// Función para preparar el formulario para editar un taller existente
function cargarFormularioEdicion(id) {
   // Encontrar la obra en el array usando su ID
   const taller = talleres.find(o => o.ID_taller === parseInt(id));
   if (!taller) {
       console.error("No se encontró el taller con ID:", id);
       return;
   }

   const form = document.getElementById("taller-form");
   const encabezado = document.getElementById("form-titulo");

   // Actualizar la interfaz para modo edición
   encabezado.textContent = "Editar Taller";
   
   // Rellenar el formulario con los datos actuales
   form.tematica.value = taller.tematica;
   form.fecha.value = taller.fecha;
   form.lugar.value = taller.lugar;
   form.descripcion.value = taller.descripcion;

   // Guardar información necesaria para la edición
   form.dataset.imagenActual = taller.imagen;
   form.dataset.modo = "editar";
   form.dataset.ID_taller = id;
   form.querySelector('button[type="submit"]').textContent = "Actualizar";
}

// Manejador del envío del formulario (crear/editar taller)
document.getElementById("taller-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        if (form.dataset.modo === "editar") {
            const ID_taller = form.dataset.ID_taller;
            
            // Preparar datos para actualización
            const datosActualizacion = {
                tematica: formData.get('tematica'),
                fecha: formData.get('fecha'),
                lugar: formData.get('lugar'),
                descripcion: formData.get('descripcion'),
            };

            // Manejar la imagen: mantener la actual o usar la nueva
            const imagenInput = form.querySelector('input[type="file"]');
            if (imagenInput.files.length === 0) {
                datosActualizacion.imagen = form.dataset.imagenActual;
            } else {
                datosActualizacion.imagen = formData.get('imagen').name;
            }

            await updateTaller(ID_taller, datosActualizacion);
            alert("Taller actualizado correctamente");
            console.log("Actualización completada. Reseteando formulario...");
        } else {
            // Crear nuevo taller
            await createTaller(formData);
            alert("Taller creado correctamente");
        }

        // Resetear formulario y UI
        console.log("Estado antes de resetear:", form.dataset.modo);
        form.reset();
        form.dataset.modo = "crear";
        console.log("Estado después de resetear:", form.dataset.modo);
        document.getElementById("form-titulo").textContent = "Agregar Nuevo Taller";
        form.querySelector('button[type="submit"]').textContent = "Agregar";
        await cargarTalleres();
        console.log("Talleres recargados.");

    } catch (error) {
      console.error("Error en el formulario:", error);
      alert(error.message);
    }
  });

// Función para eliminar un taller con confirmación
async function eliminarTaller(id) {
   if (!confirm("¿Estás seguro de que quieres eliminar este taller?")) return;
   
   try {
       await deleteTaller(id);
       alert("Taller eliminado correctamente");
       await cargarTalleres();
   } catch (error) {
       console.error("Error al eliminar:", error);
       alert(error.message);
   }
}

// Manejador para cerrar sesión: elimina el token y redirige
document.getElementById("cerrar-sesion").addEventListener("click", () => {
   localStorage.removeItem("token");
   window.location.href = "index.html";
});