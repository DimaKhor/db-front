import axios from 'axios';

const API_URL = 'http://localhost:8080/colors';

export const getColors = async () => {
    try {
        console.log(`Requesting data from ${API_URL}`);
        const response = await axios.get(API_URL);
        console.log('Response data:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching colors:', error);
        throw error;
    }
};
