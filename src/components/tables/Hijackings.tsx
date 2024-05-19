import React, { useEffect, useState } from 'react';
import { getHijackings } from '../../services/tableService';

interface Hijacking {
    id: number;
    transportId: string;
    resultId: string;
    signaling: string;
    date: string;
}

const Hijackings: React.FC = () => {
    const [hijackings, setHijackings] = useState<Hijacking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHijackings = async () => {
            try {
                const data = await getHijackings();
                setHijackings(data);
            } catch (err: any) {
                setError(`Failed to fetch hijackings: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchHijackings();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="table-container">
            <h2>Hijackings</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Transport</th>
                    <th>Result</th>
                    <th>Signaling</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {hijackings.map((hijacking) => (
                    <tr key={hijacking.id}>
                        <td>{hijacking.id}</td>
                        <td>{hijacking.transportId}</td>
                        <td>{hijacking.resultId}</td>
                        <td>{hijacking.signaling}</td>
                        <td>{new Date(hijacking.date).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Hijackings;
