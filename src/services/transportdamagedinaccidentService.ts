import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const addTransportDamaged = async (dto: any) => {
    try {
        const response = await axios.post(`${API_URL}/transports-damaged-in-accident`, dto);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to create transport damaged in accident: ${error.response.data}`);
        } else {
            throw new Error(`Failed to create transport damaged in accident: ${error.message}`);
        }
    }
};

export const updateTransportDamaged = async (accidentId: number, transportId: number, dto: any) => {
    try {
        const response = await axios.put(`${API_URL}/transports-damaged-in-accident/${accidentId}/${transportId}`, dto);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to update transport damaged in accident: ${error.response.data}`);
        } else {
            throw new Error(`Failed to update transport damaged in accident: ${error.message}`);
        }
    }
};

export const deleteTransportDamaged = async (accidentId: number, transportId: number) => {
    try {
        await axios.delete(`${API_URL}/transports-damaged-in-accident/${accidentId}/${transportId}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to delete transport damaged in accident: ${error.response.data}`);
        } else {
            throw new Error(`Failed to delete transport damaged in accident: ${error.message}`);
        }
    }
};

export const getTransportDamagedById = async (accidentId: number, transportId: number) => {
    try {
        const response = await axios.get(`/transports-damaged-in-accident/${accidentId}/${transportId}`);
        return response.data;
    } catch (error:any) {
        throw new Error(`Failed to fetch transport damaged in accident by ID: ${error.message}`);
    }
};
