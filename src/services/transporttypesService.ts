import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const addTransportType = async (name: string) => {
    const response = await axios.post(`${API_URL}/transporttypes`, { name });
    return response.data;
};

export const deleteTransportType = async (id: number) => {
    await axios.delete(`${API_URL}/transporttypes/${id}`);
};

export const updateTransportType = async (id: number, name: string) => {
    const response = await axios.put(`${API_URL}/transporttypes/${id}`, { name });
    return response.data;
};
