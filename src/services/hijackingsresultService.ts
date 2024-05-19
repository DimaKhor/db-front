import axios, { AxiosError } from 'axios';

const API_URL = 'http://localhost:8080';

export const addHijackingsResult = async (resultName: string): Promise<any> => {
    try {
        const response = await axios.post(`${API_URL}/hijackings-result`, { resultName });
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
    }
};

export const updateHijackingsResult = async (id: number, resultName: string): Promise<any> => {
    try {
        const response = await axios.put(`${API_URL}/hijackings-result/${id}`, { resultName });
        return response.data;
    } catch (error: any) {
        handleRequestError(error);
    }
};

export const deleteHijackingsResult = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/hijackings-result/${id}`);
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
