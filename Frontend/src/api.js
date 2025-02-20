const API_URL = 'http://localhost:8090/api/arte';

// Obtiene todas las obras de la base de datos
export const fetchObras = async () => {
    try {
        const response = await fetch(`${API_URL}/obras`);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al obtener obras');
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error en fetchObras:", error);
        throw error;
    }
};

// Obtiene una obra específica por su ID
export const fetchObra = async (id) => {
    try {
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

// Crea una nueva obra en la base de datos
export const createObra = async (formData) => {
    try {
        const response = await fetch(`${API_URL}/obras`, {
            method: 'POST',
            body: formData
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

// Actualiza una obra existente por su ID
export const updateObra = async (id, datos) => {
    try {
        const response = await fetch(`${API_URL}/obras/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
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

// Elimina una obra por su ID
export const deleteObra = async (id) => {
    try {
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