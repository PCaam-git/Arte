// Importamos las funciones de la API
import { fetchObras, createObra, updateObra, deleteObra } from "./api.js";

// Variables globales
let obras = [];
const token = localStorage.getItem("token");

// Cuando la página se carga completamente
document.addEventListener("DOMContentLoaded", async () => {
   // Verificamos si el usuario está autenticado
   if (!token) {
       window.location.href = "login.html";
       return;
   }
   // Cargamos las obras al iniciar
   await cargarObras();
});

// Función para cargar todas las obras desde el servidor
async function cargarObras() {
   try {
       obras = await fetchObras();
       mostrarObras();
   } catch (error) {
       console.error("Error al cargar obras:", error);
       alert(error.message);
   }
}

// Función para mostrar las obras en el HTML
function mostrarObras() {
   const obrasLista = document.getElementById("obras-lista");
   
   // Creamos el HTML para cada obra
   obrasLista.innerHTML = obras.map(obra => `
       <div class="col-md-4 mb-3">
           <div class="card">
               <img src="http://localhost:8090/uploads/${obra.imagen}" 
                    class="card-img-top" 
                    alt="${obra.descripcion}"
                    onerror="this.src='placeholder.jpg'">
               <div class="card-body">
                   <h5 class="card-title">${obra.descripcion}</h5>
                   <p class="card-text">Precio: ${obra.precio}€</p>
                   <button class="btn btn-danger w-100 btn-eliminar" data-id="${obra.ID_obra}">Eliminar</button>
                   <button class="btn btn-primary w-100 mt-2 btn-editar" data-id="${obra.ID_obra}">Editar</button>
               </div>
           </div>
       </div>
   `).join("");

   // Añadimos los event listeners a los botones
   const botonesEliminar = obrasLista.querySelectorAll(".btn-eliminar");
   const botonesEditar = obrasLista.querySelectorAll(".btn-editar");

   botonesEliminar.forEach(boton => {
       boton.addEventListener("click", () => eliminarObra(boton.dataset.id));
   });

   botonesEditar.forEach(boton => {
       boton.addEventListener("click", () => cargarFormularioEdicion(boton.dataset.id));
   });
}

// Función para cargar los datos de una obra en el formulario para su edición
function cargarFormularioEdicion(id) {
   const obra = obras.find(o => o.ID_obra === parseInt(id));
   
   if (!obra) {
       console.error("No se encontró la obra con ID:", id);
       return;
   }

   const form = document.getElementById("obra-form");
   
   // Rellenamos los campos del formulario
   form.descripcion.value = obra.descripcion;
   form.fecha_creacion.value = obra.fecha_creacion;
   form.precio.value = obra.precio;
   form.ID_disciplina.value = obra.ID_disciplina;
   form.ID_subdisciplina.value = obra.ID_subdisciplina;

   // Guardamos la imagen actual y configuramos modo edición
   form.dataset.imagenActual = obra.imagen;
   form.dataset.modo = "editar";
   form.dataset.ID_obra = id;
   form.querySelector('button[type="submit"]').textContent = "Actualizar";
}

// Manejador del formulario para crear/editar obras
document.getElementById("obra-form").addEventListener("submit", async (event) => {
   event.preventDefault();
   const form = event.target;
   const formData = new FormData(form);

   try {
       if (form.dataset.modo === "editar") {
           const ID_obra = form.dataset.ID_obra;
           
           // Si no hay nueva imagen, mantener la actual
           const imagenInput = form.querySelector('input[type="file"]');
           if (imagenInput.files.length === 0) {
               formData.set('imagen', form.dataset.imagenActual);
           }

           await updateObra(ID_obra, formData);
           alert("Obra actualizada correctamente");
       } else {
           await createObra(formData);
           alert("Obra creada correctamente");
       }

       // Resetear formulario y recargar obras
       form.reset();
       form.dataset.modo = "crear";
       form.querySelector('button[type="submit"]').textContent = "Agregar";
       await cargarObras();
   } catch (error) {
       console.error("Error en el formulario:", error);
       alert(error.message);
   }
});

// Función para eliminar una obra
async function eliminarObra(id) {
   if (!confirm("¿Estás seguro de que quieres eliminar esta obra?")) return;
   
   try {
       await deleteObra(id);
       alert("Obra eliminada correctamente");
       await cargarObras();
   } catch (error) {
       console.error("Error al eliminar:", error);
       alert(error.message);
   }
}

// Manejador para cerrar sesión
document.getElementById("cerrar-sesion").addEventListener("click", () => {
   localStorage.removeItem("token");
   window.location.href = "index.html";
});