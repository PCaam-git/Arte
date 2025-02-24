// URL base para todas las peticiones a la API de arte
const API_URL = 'http://localhost:8090/api/arte';

// Función asíncrona para obtener todas las obras
export const fetchObras = async () => {
   try {
       // Realizar petición GET al endpoint de obras
       const response = await fetch(`${API_URL}/obras`);
       
       // Verificar si la respuesta es exitosa
       if (!response.ok) {
           const errorData = await response.json();
           // Si hay error, lanzar excepción con el mensaje del servidor o uno genérico
           throw new Error(errorData.message || 'Error al obtener obras');
       }
       
       // Devolver los datos en formato JSON
       return await response.json();
   } catch (error) {
       // Registrar y propagar el error
       console.error("Error en fetchObras:", error);
       throw error;
   }
};

// Función asíncrona para obtener una obra específica
export const fetchObra = async (id) => {
   try {
       // Realizar petición GET con el ID de la obra
       const response = await fetch(`${API_URL}/obras/${id}`);
       
       if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.message || 'Error al obtener obra');
       }
       
       return await response.json();
   } catch (error) {
       console.error("Error en fetchObra:", error);
       throw error;
   }
};

// Función asíncrona para crear una nueva obra
export const createObra = async (formData) => {
   try {
       // Realizar petición POST con los datos del formulario
       const response = await fetch(`${API_URL}/obras`, {
           method: 'POST',
           body: formData  // FormData permite enviar archivos (imágenes)
       });
       
       if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.message || 'Error al crear obra');
       }
       
       return await response.json();
   } catch (error) {
       console.error("Error en createObra:", error);
       throw error;
   }
};

// Función asíncrona para actualizar una obra existente
export const updateObra = async (id, datos) => {
   try {
       // Realizar petición PUT con los datos actualizados
       const response = await fetch(`${API_URL}/obras/${id}`, {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json'  // Indicar que enviamos JSON
           },
           body: JSON.stringify(datos)  // Convertir datos a formato JSON
       });

       if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.error || 'Error al actualizar obra');
       }

       return await response.json();
   } catch (error) {
       console.error("Error en updateObra:", error);
       throw error;
   }
};

// Función asíncrona para eliminar una obra
export const deleteObra = async (id) => {
   try {
       // Realizar petición DELETE para eliminar la obra
       const response = await fetch(`${API_URL}/obras/${id}`, {
           method: 'DELETE'
       });
       
       if (!response.ok) {
           const errorData = await response.json();
           throw new Error(errorData.message || 'Error al eliminar obra');
       }
   } catch (error) {
       console.error("Error en deleteObra:", error);
       throw error;
   }
};