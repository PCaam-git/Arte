import { fetchObras, createObra, updateObra, deleteObra } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const obrasContainer = document.getElementById('obras-container');

    // Cargar obras de la API
    const obras = await fetchObras();
    obras.forEach(obra => {
        const obraElement = document.createElement('div');
        obraElement.classList.add('obra');
        obraElement.innerHTML = `
            <h3>${obra.descripcion}</h3>
            <p>Fecha: ${obra.fecha_creacion}</p>
            <p>Precio: $${obra.precio}</p>
            <img src="${obra.imagen}" alt="${obra.descripcion}" width="200">
            <button onclick="deleteObra(${obra.id})">Eliminar</button>
        `;
        obrasContainer.appendChild(obraElement);
    });
});

    //Formulario creación de obras
document.getElementById('obra-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const descripcion = document.getElementById('descripcion').value;
    const fecha_creacion = document.getElementById('fecha_creacion').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;
    const ID_subdisciplina = document.getElementById('ID_subdisciplina').value;

    await createObra({ descripcion, fecha_creacion, precio, imagen, ID_subdisciplina });
    location.reload();
});
