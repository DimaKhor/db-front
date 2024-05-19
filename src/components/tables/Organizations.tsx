import React, { useEffect, useState } from 'react';
import { getOrganizations } from '../../services/tableService';

interface Organization {
    id: number;
    name: string;
    area: string;
    street?: string;
    building?: string;
    headLastName: string;
    headName: string;
    headFatherName?: string;
}

const Organizations: React.FC = () => {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const data = await getOrganizations();
                setOrganizations(data);
            } catch (err: any) {
                setError(`Failed to fetch organizations: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchOrganizations();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="table-container">
            <h2>Organizations</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Area</th>
                    <th>Street</th>
                    <th>Building</th>
                    <th>Head Last Name</th>
                    <th>Head Name</th>
                    <th>Head Father Name</th>
                </tr>
                </thead>
                <tbody>
                {organizations.map((organization) => (
                    <tr key={organization.id}>
                        <td>{organization.id}</td>
                        <td>{organization.name}</td>
                        <td>{organization.area}</td>
                        <td>{organization.street || '-'}</td>
                        <td>{organization.building || '-'}</td>
                        <td>{organization.headLastName}</td>
                        <td>{organization.headName}</td>
                        <td>{organization.headFatherName || '-'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Organizations;
