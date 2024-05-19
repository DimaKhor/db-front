import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080';

export const addAccidentType = async (name: string): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/accidenttypes`, { name });
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
    }
};

export const updateAccidentType = async (id: number, name: string): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/accidenttypes/${id}`, { name });
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
    }
};

export const deleteAccidentType = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/accidenttypes/${id}`);
    } catch (error: any) {
        handleRequestError(error);
    }
};

const handleRequestError = (error: AxiosError): void => {
    if (error.response) {
        // Запрос был сделан и сервер ответил с кодом состояния, который не находится в диапазоне 2xx
        console.error('Request failed with status code:', error.response.status);
        console.error('Response data:', error.response.data);
        throw new Error(`Request failed with status code: ${error.response.status}`);
    } else if (error.request) {
        // Запрос был сделан, но сервер не получил ответ
        console.error('No response received:', error.request);
        throw new Error('No response received from server');
    } else {
        // Произошла ошибка при настройке запроса
        console.error('Error setting up the request:', error.message);
        throw new Error(`Error setting up the request: ${error.message}`);
    }
};
