import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getPersonById = async (id: number) => {
    try {
        const response = await axios.get(`${API_URL}/persons/${id}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to get person: ${error.response.data}`);
        } else {
            throw new Error(`Failed to get person: ${error.message}`);
        }
    }
};

export const addPerson = async (person: any) => {
    try {
        const response = await axios.post(`${API_URL}/persons`, person);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};

export const updatePerson = async (id: number, person: any) => {
    try {
        const response = await axios.put(`${API_URL}/persons/${id}`, person);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};

export const deletePerson = async (id: number) => {
    try {
        await axios.delete(`${API_URL}/persons/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};