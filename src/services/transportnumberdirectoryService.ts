import axios from 'axios';

export const getTransportNumberById = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:8080/transport-number/${id}`);
        return response.data;
    } catch (error:any) {
        console.error(error);
        throw new Error('Failed to fetch transport number by ID: ' + error.message);
    }
};

export const createTransportNumber = async (data: any) => {
    try {
        const response = await axios.post('/transport-number', data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};

export const updateTransportNumber = async (id: number, data: any) => {
    try {
        const response = await axios.put(`/transport-number/${id}`, data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};

export const deleteTransportNumber = async (id: number) => {
    try {
        await axios.delete(`/transport-number/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};