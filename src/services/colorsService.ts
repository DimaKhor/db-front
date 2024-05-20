import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const addColor = async (name: string) => {
    try {
        const response = await axios.post(`${API_URL}/colors`, { name });
        return response.data;
    }  catch (error: any) {
        if (error.response) {
            throw new Error(` ${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};

export const deleteColor = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/colors/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};

export const updateColor = async (id: number, name: string) => {
    try {
        const response = await axios.put(`${API_URL}/colors/${id}`, { name });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to update color: ${error.response.data}`);
        } else {
            throw new Error(`Failed to update color: ${error.message}`);
        }
    }
};
