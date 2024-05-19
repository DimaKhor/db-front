import React, { useEffect, useState } from 'react';
import { getAccidentTypes } from '../../services/tableService';

interface AccidentType {
    id: number;
    name: string;
}

const AccidentTypes: React.FC = () => {
    const [accidentTypes, setAccidentTypes] = useState<AccidentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAccidentTypes = async () => {
            try {
                const data = await getAccidentTypes();
                setAccidentTypes(data);
            } catch (err: any) {
                setError(`Failed to fetch accident types: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAccidentTypes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="table-container">
            <h2>Accident Types</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {accidentTypes.map((type) => (
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

export default AccidentTypes;
