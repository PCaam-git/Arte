const API_URL = 'http://localhost:8090/api/obras';

export const fetchObras = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};

export const fetchObra = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    return await response.json();
};

export const createObra = async (obra) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obra)
    });
    return await response.json();
};

export const updateObra = async (id, obra) => {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obra)
    });
};

export const deleteObra = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
