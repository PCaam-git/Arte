const API_URL = "http://localhost:8090/api/arte";
let obras = []; // Declaración global para almacenar las obras
let token = localStorage.getItem('token');
const obrasLista = document.getElementById("obras-lista");
const obraForm = document.getElementById("obra-form");
const logoutButton = document.getElementById("cerrar-sesion");

document.addEventListener("DOMContentLoaded", async () => {
  await cargarObras(); // Cargar las obras cuando la página se cargue
});

async function cargarObras() {
  try {
    const response = await fetch(`${API_URL}/obras`);
    obras = await response.json();
    console.log("Obras cargadas desde la API:", obras); // Verificación
    mostrarObras();
  } catch (error) {
    console.error("Error al cargar las obras", error);
  }
}

function mostrarObras() {
  console.log("Ejecutando mostrarObras(). Datos de obras:", obras);
  const obrasLista = document.getElementById("obras-lista");
  obrasLista.innerHTML = "";

  obras.forEach((obra) => {
    const obraElemento = document.createElement("div");
    obraElemento.classList.add("col-md-4", "mb-3");

    obraElemento.innerHTML = `
            <div class="card">
                <img src="${obra.imagen}" class="card-img-top obra-imagen" alt="${obra.descripcion}" data-id="${obra.id}">
                <div class="card-body">
                    <h5 class="card-title">${obra.descripcion}</h5>
                    <p class="card-text">Precio: ${obra.precio}€</p>
                    <button onclick="eliminarObra(${obra.id})" class="btn btn-danger w-100">Eliminar</button>
                    <button onclick="cargarFormularioEdicion(${obra.id})" class="btn btn-primary w-100 mt-2">Editar</button>
                </div>
            </div>
        `;
    obrasLista.appendChild(obraElemento);
  });
}

// Hacemos las funciones accesibles desde el HTML
window.cargarFormularioEdicion = function (id) {
  console.log("ID de la obra seleccionada:", id);

  const obra = obras.find((o) => o.id === id);
  if (!obra) {
    console.error("No se encontró la obra con ID:", id);
    return;
  }

  console.log("Datos de la obra encontrada:", obra);

  document.getElementById("descripcion").value = obra.descripcion;
  document.getElementById("precio").value = obra.precio;
  obraForm.dataset.id = obra.id;
};

window.eliminarObra = async function (id) {
  if (confirm("¿Estás seguro de que quieres eliminar esta obra?")) {
    try {
      const response = await fetch(`${API_URL}/obras/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        alert("Obra eliminada correctamente");
        obras = obras.filter((obra) => obra.id !== id);
        mostrarObras();
      } else {
        alert("Error al eliminar la obra");
      }
    } catch (error) {
      console.error("Error al eliminar la obra:", error);
    }
  }
};

// Definir función validarObra
function validarObra() {
  const descripcion = document.getElementById("descripcion").value.trim();
  const precio = document.getElementById("precio").value.trim();

  if (!descripcion || !precio) {
    alert("Todos los campos son obligatorios.");
    return false;
  }
  return true;
}

obraForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!validarObra()) return;

  const id = obraForm.dataset.id;
  const formData = new FormData(obraForm);
  formData.append(
    "descripcion",
    document.getElementById("descripcion").value.trim()
  );
  formData.append("precio", document.getElementById("precio").value.trim());

  try {
    const response = await fetch(`${API_URL}/obras/${id ? id : ""}`, {
      method: id ? "PUT" : "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (response.ok) {
      alert(
        id ? "Obra actualizada correctamente" : "Obra agregada correctamente"
      );
      obraForm.reset();
      cargarObras();
    } else {
      alert("Error al guardar la obra");
    }
  } catch (error) {
    console.error("Error al guardar la obra", error);
  }
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  alert("Sesión cerrada correctamente");
  window.location.href = "index.html";
});
