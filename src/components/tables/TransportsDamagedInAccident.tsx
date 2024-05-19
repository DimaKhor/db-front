import React, { useEffect, useState } from 'react';
import { getTransportsDamagedInAccident } from '../../services/tableService';

interface TransportDamaged {
    accidentId: number;
    transportId: number;
    didRunAway: boolean;
    found: boolean | null;
}

const TransportsDamagedInAccident: React.FC = () => {
    const [transportsDamaged, setTransportsDamaged] = useState<TransportDamaged[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransportsDamaged = async () => {
            try {
                const data = await getTransportsDamagedInAccident();
                setTransportsDamaged(data);
            } catch (err: any) {
                setError(`Failed to fetch transports damaged in accident: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchTransportsDamaged();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="table-container">
            <h2>Transports Damaged In Accident</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>Accident ID</th>
                    <th>Transport ID</th>
                    <th>Did Run Away</th>
                    <th>Found</th>
                </tr>
                </thead>
                <tbody>
                {transportsDamaged.map((transport) => (
                    <tr key={`${transport.accidentId}-${transport.transportId}`}>
                        <td>{transport.accidentId}</td>
                        <td>{transport.transportId}</td>
                        <td>{transport.didRunAway ? 'Yes' : 'No'}</td>
                        <td>{transport.found === null ? '-' : transport.found ? 'Yes' : 'No'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransportsDamagedInAccident;
