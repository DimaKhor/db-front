import axios from 'axios';

export const getOrganizationById = async (id: number) => {
    const response = await axios.get(`/organizations/${id}`);
    return response.data;
};

export const addOrganization = async (organization: any) => {
    const response = await axios.post('/organizations', organization);
    return response.data;
};

export const updateOrganization = async (id: number, organization: any) => {
    const response = await axios.put(`/organizations/${id}`, organization);
    return response.data;
};

export const deleteOrganization = async (id: number) => {
    await axios.delete(`/organizations/${id}`);
};
