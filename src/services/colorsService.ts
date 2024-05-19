import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const addColor = async (name: string) => {
    const response = await axios.post(`${API_URL}/colors`, { name });
    return response.data;
};

export const deleteColor = async (id: number) => {
    await axios.delete(`${API_URL}/colors/${id}`);
};

export const updateColor = async (id: number, name: string) => {
    const response = await axios.put(`${API_URL}/colors/${id}`, { name });
    return response.data;
};
