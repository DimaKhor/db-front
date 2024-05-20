import axios from 'axios';

const API_URL = 'http://localhost:8080';

interface AccidentStatistics {
    name: string;
    count: number;
}

export const getOrganizationsBySeriesOrPeriod = async (series?: string, startDate?: string, endDate?: string) => {
    try {
        let url = `${API_URL}/organizations/by-series-or-period?`;
        if (series) url += `series=${series}&`;
        if (startDate) url += `startDate=${startDate}&`;
        if (endDate) url += `endDate=${endDate}&`;
        url = url.slice(0, -1);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getOrganizationsCountBySeriesOrPeriod = async (series?: string, startDate?: string, endDate?: string) => {
    try {
        let url = `${API_URL}/organizations/count-by-series-or-period?`;
        if (series) url += `series=${series}&`;
        if (startDate) url += `startDate=${startDate}&`;
        if (endDate) url += `endDate=${endDate}&`;
        url = url.slice(0, -1);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPersonByTransportNumber = async (number: string) => {
    const response = await axios.get(`${API_URL}/persons/by-transport-number`, {
        params: { number }
    });
    return response.data;
};

export const getCarProfileByTransportNumber = async (number: string) => {
    const response = await axios.get(`${API_URL}/transport-number/car-profile/${number}`);
    return response.data;
};

export const getFailedInspectionOwners = async (): Promise<number[]> => {
    const response = await axios.get<number[]>(`${API_URL}/failed-inspection`);
    return response.data;
};

export const getFailedInspectionOwnersCount = async (): Promise<number | null> => {
    const response = await axios.get<number>(`${API_URL}/failed-inspection-count-owners`);
    return response.data;
};

export const getAccidentStatisticsByTypeAndPeriod = async (typeName: string, startDate: string, endDate: string): Promise<AccidentStatistics[]> => {
    try {
        const response = await axios.get<[string, number][]>(`${API_URL}/accident-statistics?type=${typeName}&startDate=${startDate}&endDate=${endDate}`);
        const data: AccidentStatistics[] = response.data.map(([name, count]) => ({ name, count }));
        return data;
    } catch (error) {
        throw error;
    }
};

export const getMostDangerousPlaces = async (): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>(`${API_URL}/most-dangerous-places`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMostPopularReason = async (): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>(`${API_URL}/most-popular-reasons`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDrunkDrivingAccidentsAndPercentage = async (): Promise<[number, number][]> => {
    const response = await axios.get<[number, number][]>(`${API_URL}/drunk-driving-accidents`);
    return response.data;
};

export const getWantedVehicles = async (): Promise<string[]> => {
    const response = await axios.get<string[]>(`${API_URL}/wanted-vehicles`);
    return response.data;
};

export const getHijackingsEfficiency = async (): Promise<number> => {
    const response = await axios.get<number>(`${API_URL}/hijackings/efficiency`);
    return response.data;
};

export const getHijackingsByPeriod = async (startDate: string, endDate: string): Promise<string[]> => {
    try {
        const response = await axios.get<string[]>(`${API_URL}/hijackings/period`, {
            params: { startDate, endDate }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getHijackingsCountByPeriod = async (startDate: string, endDate: string): Promise<number> => {
    try {
        const response = await axios.get<number>(`${API_URL}/hijackings/period/count`, {
            params: { startDate, endDate }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const findMostStolenBrandNames = async (): Promise<string[]> => {
    const response = await axios.get<string[]>(`${API_URL}/most_stolen_brand`);
    return response.data;
};

export const  findMostPopularSignaling = async (): Promise<string[]> => {
    const response = await axios.get<string[]>(`${API_URL}/hijackings/most_popular_signaling`);
    return response.data;
};