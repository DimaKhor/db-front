import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const addBrand = async (name: string) => {
    const response = await axios.post(`${API_URL}/brands`, { name });
    return response.data;
};

export const updateBrand = async (id: number, name: string) => {
    const response = await axios.put(`${API_URL}/brands/${id}`, { name });
    return response.data;
};

export const deleteBrand = async (id: number) => {
    await axios.delete(`${API_URL}/brands/${id}`);
};
