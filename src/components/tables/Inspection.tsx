import React, { useEffect, useState } from 'react';
import { getInspection } from '../../services/tableService';

interface Inspection {
    id: number;
    transportId: string;
    paymentForLiter: number;
    periodicityInMonths: number;
    lastTime: string;
}

const Inspection: React.FC = () => {
    const [inspections, setInspections] = useState<Inspection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInspections = async () => {
            try {
                const data = await getInspection();
                setInspections(data);
            } catch (err: any) {
                setError(`Failed to fetch inspections: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchInspections();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="table-container">
            <h2>Inspection</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Transport</th>
                    <th>Payment For Liter</th>
                    <th>Periodicity In Months</th>
                    <th>Last Time</th>
                </tr>
                </thead>
                <tbody>
                {inspections.map((inspection) => (
                    <tr key={inspection.id}>
                        <td>{inspection.id}</td>
                        <td>{inspection.transportId}</td>
                        <td>{inspection.paymentForLiter}</td>
                        <td>{inspection.periodicityInMonths}</td>
                        <td>{new Date(inspection.lastTime).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Inspection;
