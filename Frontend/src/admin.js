// Importamos las funciones de la API
import { fetchObras, createObra, updateObra, deleteObra } from "./api.js";

// Variables globales
let obras = [];
const token = localStorage.getItem("token");

// Cuando la página se carga completamente
document.addEventListener("DOMContentLoaded", async () => {
<<<<<<< Updated upstream
   // Verificamos si el usuario está autenticado
   if (!token) {
       window.location.href = "login.html";
       return;
   }
   // Cargamos las obras al iniciar
   await cargarObras();
=======
  // Verificar si hay un token válido, si no, redirigir al login
  if (!token) {
    window.location.href = "registro.html";
    return;
  }
  // Cargar obras iniciales
  await cargarObras();
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
   const obrasLista = document.getElementById("obras-lista");
   
   // Creamos el HTML para cada obra
   obrasLista.innerHTML = obras.map(obra => `
       <div class="col-md-4 mb-3">
           <div class="card">
               <img src="http://localhost:8090/uploads/${obra.imagen}" 
                    class="card-img-top" 
                    alt="${obra.descripcion}"
                    onerror="this.src='placeholder.jpg'">
=======
  const obrasLista = document.getElementById("obras-lista");

  // Usar template literals para crear el HTML de cada obra
  obrasLista.innerHTML = obras.map(
      (obra) => `
       <div class="col-md-5 mb-5">
           <div class="card mx-auto" style="max-width: 600px;">
           <div class="text-center p-3">
               <img src="http://localhost:8090/uploads/${obra.imagen}" 
                    class="card-img-top" 
                    alt="${obra.descripcion}"
                     style="width: 90%; height: auto;"
                    onerror="this.src='placeholder.jpg'"> <!-- Imagen de respaldo si falla la carga -->
            </div>
>>>>>>> Stashed changes
               <div class="card-body">
                   <h5 class="card-title">${obra.descripcion}</h5>
                   <p class="card-text">Precio: ${obra.precio}€</p>
                   <button class="btn btn-danger w-100 btn-eliminar" data-id="${obra.ID_obra}">Eliminar</button>
                   <button class="btn btn-primary w-100 mt-2 btn-editar" data-id="${obra.ID_obra}">Editar</button>
               </div>
           </div>
       </div>
   `
    )
    .join("");

<<<<<<< Updated upstream
   // Añadimos los event listeners a los botones
   const botonesEliminar = obrasLista.querySelectorAll(".btn-eliminar");
   const botonesEditar = obrasLista.querySelectorAll(".btn-editar");

   botonesEliminar.forEach(boton => {
       boton.addEventListener("click", () => eliminarObra(boton.dataset.id));
   });

   botonesEditar.forEach(boton => {
       boton.addEventListener("click", () => cargarFormularioEdicion(boton.dataset.id));
   });
=======
  // Añadir event listeners a los botones después de crear el HTML
  const botonesEliminar = obrasLista.querySelectorAll(".btn-eliminar");
  const botonesEditar = obrasLista.querySelectorAll(".btn-editar");

  // Configurar los handlers para eliminar y editar
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", () => eliminarObra(boton.dataset.id));
  });
  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", () =>
      cargarFormularioEdicion(boton.dataset.id)
    );
  });
>>>>>>> Stashed changes
}

// Función para cargar los datos de una obra en el formulario para su edición
function cargarFormularioEdicion(id) {
<<<<<<< Updated upstream
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
// Manejador del formulario para crear/editar obras
document.getElementById("obra-form").addEventListener("submit", async (event) => {
=======
  // Encontrar la obra en el array usando su ID
  const obra = obras.find((o) => o.ID_obra === parseInt(id));
  if (!obra) {
    console.error("No se encontró la obra con ID:", id);
    return;
  }

  const form = document.getElementById("obra-form");
  const encabezado = document.getElementById("form-titulo");

  // Actualizar la interfaz para modo edición
  encabezado.textContent = "Editar Obra";

  // Rellenar el formulario con los datos actuales
  form.descripcion.value = obra.descripcion;
  form.fecha_creacion.value = obra.fecha_creacion;
  form.precio.value = obra.precio;
  form.disciplina.value = obra.ID_disciplina;
  form.subdisciplina.value = obra.ID_subdisciplina;

  // Guardar información necesaria para la edición
  form.dataset.imagenActual = obra.imagen;
  form.dataset.modo = "editar";
  form.dataset.ID_obra = id;
  form.querySelector('button[type="submit"]').textContent = "Actualizar";
}

// Manejador del envío del formulario (crear/editar obra)
document
  .getElementById("obra-form")
  .addEventListener("submit", async (event) => {
>>>>>>> Stashed changes
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
<<<<<<< Updated upstream
        if (form.dataset.modo === "editar") {
            const ID_obra = form.dataset.ID_obra;
            
            // Crear objeto con los datos del formulario
            const datosActualizacion = {
                descripcion: formData.get('descripcion'),
                fecha_creacion: formData.get('fecha_creacion'),
                precio: Number(formData.get('precio')),
                ID_disciplina: Number(formData.get('ID_disciplina')),
                ID_subdisciplina: Number(formData.get('ID_subdisciplina'))
            };

            // Manejar la imagen separadamente
            const imagenInput = form.querySelector('input[type="file"]');
            if (imagenInput.files.length === 0) {
                // Si no hay nueva imagen, usar la imagen actual
                datosActualizacion.imagen = form.dataset.imagenActual;
            } else {
                // Si hay nueva imagen, usar la del input
                datosActualizacion.imagen = formData.get('imagen').name;
            }

            console.log('Datos de actualización:', datosActualizacion);
            await updateObra(ID_obra, datosActualizacion);
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
=======
      if (form.dataset.modo === "editar") {
        const ID_obra = form.dataset.ID_obra;

        // Preparar datos para actualización
        const datosActualizacion = {
          descripcion: formData.get("descripcion"),
          fecha_creacion: formData.get("fecha_creacion"),
          precio: Number(formData.get("precio")),
          ID_disciplina: Number(formData.get("ID_disciplina")),
          ID_subdisciplina: Number(formData.get("ID_subdisciplina")),
        };

        // Manejar la imagen: mantener la actual o usar la nueva
        const imagenInput = form.querySelector('input[type="file"]');
        if (imagenInput.files.length === 0) {
          datosActualizacion.imagen = form.dataset.imagenActual;
        } else {
          datosActualizacion.imagen = formData.get("imagen").name;
        }

        await updateObra(ID_obra, datosActualizacion);
        alert("Obra actualizada correctamente");
      } else {
        // Crear nueva obra
        await createObra(formData);
        alert("Obra creada correctamente");
      }

      // Resetear formulario y UI
      form.reset();
      form.dataset.modo = "crear";
      document.getElementById("form-titulo").textContent = "Agregar Nueva Obra";
      form.querySelector('button[type="submit"]').textContent = "Agregar";
      await cargarObras();
>>>>>>> Stashed changes
    } catch (error) {
      console.error("Error en el formulario:", error);
      alert(error.message);
    }
  });

// Función para eliminar una obra
async function eliminarObra(id) {
<<<<<<< Updated upstream
   if (!confirm("¿Estás seguro de que quieres eliminar esta obra?")) return;
   
   try {
       await deleteObra(id);
       alert("Obra eliminada correctamente");
       await cargarObras();
   } catch (error) {
       console.error("Error al eliminar:", error);
       alert(error.message);
   }
=======
  if (!confirm("¿Estás seguro de que quieres eliminar esta obra?")) return;

  try {
    await deleteObra(id);
    alert("Obra eliminada correctamente");
    await cargarObras();
  } catch (error) {
    console.error("Error al eliminar:", error);
    alert(error.message);
  }
>>>>>>> Stashed changes
}

// Manejador para cerrar sesión
document.getElementById("cerrar-sesion").addEventListener("click", () => {
<<<<<<< Updated upstream
   localStorage.removeItem("token");
   window.location.href = "index.html";
});
=======
  localStorage.removeItem("token");
  window.location.href = "index.html";
});
>>>>>>> Stashed changes
