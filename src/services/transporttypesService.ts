import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const addTransportType = async (name: string) => {
    try {
        const response = await axios.post(`${API_URL}/transporttypes`, { name });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to create transport type: ${error.response.data}`);
        } else {
            throw new Error(`Failed to create transport type: ${error.message}`);
        }
    }
};

export const deleteTransportType = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/transporttypes/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to delete transport type: ${error.response.data}`);
        } else {
            throw new Error(`Failed to delete transport type: ${error.message}`);
        }
    }
};

export const updateTransportType = async (id: number, name: string) => {
    try {
        const response = await axios.put(`${API_URL}/transporttypes/${id}`, { name });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to update transport type: ${error.response.data}`);
        } else {
            throw new Error(`Failed to update transport type: ${error.message}`);
        }
    }
};
