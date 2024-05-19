import React, { useEffect, useState } from 'react';
import { getTransportTypes } from '../../services/tableService';

interface TransportType {
    id: number;
    name: string;
}

const TransportTypes: React.FC = () => {
    const [transportTypes, setTransportTypes] = useState<TransportType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransportTypes = async () => {
            try {
                const data = await getTransportTypes();
                setTransportTypes(data);
            } catch (err: any) {
                setError(`Failed to fetch transport types: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchTransportTypes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="table-container">
            <h2>Transport Types</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {transportTypes.map((type) => (
                    <tr key={type.id}>
                        <td>{type.id}</td>
                        <td>{type.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransportTypes;
