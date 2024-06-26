import axios from 'axios';

export const getOrganizationById = async (id: number) => {
    const response = await axios.get(`/organizations/${id}`);
    return response.data;
};

export const addOrganization = async (organization: any) => {
    try {
        const response = await axios.post('/organizations', organization);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};

export const updateOrganization = async (id: number, organization: any) => {
    try {
        const response = await axios.put(`/organizations/${id}`, organization);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};

export const deleteOrganization = async (id: number) => {
    try {
        await axios.delete(`/organizations/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(`${error.response.data}`);
        } else {
            throw new Error(`${error.message}`);
        }
    }
};
