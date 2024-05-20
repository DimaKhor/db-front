import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080';

export const getRoadAccidentById = async (id: number): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/roadaccidents/${id}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to get road accident: ${error.response.data}`);
        } else {
            throw new Error(`Failed to get road accident: ${error.message}`);
        }
    }
};

export const addRoadAccident = async (dto: any): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/roadaccidents`, dto);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to create road accident: ${error.response.data}`);
        } else {
            throw new Error(`Failed to create road accident: ${error.message}`);
        }
    }
};

export const updateRoadAccident = async (id: number, dto: any): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/roadaccidents/${id}`, dto);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to update road accident: ${error.response.data}`);
        } else {
            throw new Error(`Failed to update road accident: ${error.message}`);
        }
    }
};

export const deleteRoadAccident = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/roadaccidents/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`Failed to delete road accident: ${error.response.data}`);
        } else {
            throw new Error(`Failed to delete road accidente: ${error.message}`);
        }
    }
};
