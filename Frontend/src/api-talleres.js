//api-talleres.js

// URL base para todas las peticiones a la API de arte
const API_URL = 'http://localhost:8090/api/arte';

// Función asíncrona para obtener todos los talleres
export const fetchTalleres = async () => {
   try {
       // Realizar petición GET al endpoint de talleres
       const response = await fetch(`${API_URL}/talleres`);
       
       // Verificar si la respuesta es exitosa
       if (!response.ok) {
           const errorData = await response.json();
           // Si hay error, lanzar excepción con mensaje 
           throw new Error(errorData.message || 'Error al obtener talleres');
       }
       
       // Devolver los datos en formato JSON
       return await response.json();
   } catch (error) {
       // Registrar y propagar el error
       console.error("Error en fetchTalleres:", error);
       throw error;
   }
};

// Función asíncrona para obtener un taller específica
export const fetchTaller = async (id) => {
   try {
       // Realizar petición GET con el ID del taller
       const response = await fetch(`${API_URL}/talleres/${id}`);
       
       if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.message || 'Error al obtener taller');
       }
       
       return await response.json();
   } catch (error) {
       console.error("Error en fetchTaller:", error);
       throw error;
   }
};

// Función asíncrona para crear un nuevo taller
export const createTaller = async (formData) => {
   try {
    console.log("Datos que se envían:", Object.fromEntries(formData));
       // Realizar petición POST con los datos del formulario
       const response = await fetch(`${API_URL}/talleres`, {
           method: 'POST',
           body: formData  // FormData permite enviar archivos (imágenes)
       });

       console.log("Status del servidor:", response.status);
       
       if (!response.ok) {
           const errorData = await response.json();
           console.log("Mensaje de error del servidor:", errorData);
           throw new Error(errorData.message || 'Error al crear taller');
       }
       
       const data = await response.json();
       console.log("Respuesta exitosa:", data);
       return data;
   } catch (error) {
       console.error("Error detallado en createTaller:", error);
       throw error;
   }
};

// Función asíncrona para actualizar un taller existente
export const updateTaller = async (id, datos) => {
   try {
       // Realizar petición PUT con los datos actualizados
       const response = await fetch(`${API_URL}/talleres/${id}`, {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json'  // Indicar que enviamos JSON
           },
           body: JSON.stringify(datos)  // Convertir datos a formato JSON
       });

       if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.error || 'Error al actualizar el taller');
       }

       return await response.json();
   } catch (error) {
       console.error("Error en updateTaller:", error);
       throw error;
   }
};

// Función asíncrona para eliminar un taller
export const deleteTaller = async (id) => {
   try {
       // Realizar petición DELETE para eliminar el taller
       const response = await fetch(`${API_URL}/talleres/${id}`, {
           method: 'DELETE'
       });
       
       if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.message || 'Error al eliminar taller');
       }
   } catch (error) {
       console.error("Error en deleteTaller:", error);
       throw error;
   }
};