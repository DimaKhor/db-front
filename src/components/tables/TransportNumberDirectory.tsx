import React, { useEffect, useState } from 'react';
import { getTransportNumberDirectory } from '../../services/tableService';

interface TransportNumber {
    id: number;
    transportTypeId: string;
    personId: string;
    organizationId?: string;
    brandId: string;
    colorId: string;
    issueDate: string;
    engineCapacity: number;
    engineId: string;
    chassisId: string;
    coachbuilderId: string;
    number: string;
}

const TransportNumberDirectory: React.FC = () => {
    const [transportNumbers, setTransportNumbers] = useState<TransportNumber[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransportNumbers = async () => {
            try {
                const data = await getTransportNumberDirectory();
                setTransportNumbers(data);
            } catch (err: any) {
                setError(`Failed to fetch transport numbers: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchTransportNumbers();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="table-container">
            <h2>Transport Number Directory</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Transport Type</th>
                    <th>Person</th>
                    <th>Organization</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Issue Date</th>
                    <th>Engine Capacity</th>
                    <th>Engine ID</th>
                    <th>Chassis ID</th>
                    <th>Coachbuilder ID</th>
                    <th>Number</th>
                </tr>
                </thead>
                <tbody>
                {transportNumbers.map((transportNumber) => (
                    <tr key={transportNumber.id}>
                        <td>{transportNumber.id}</td>
                        <td>{transportNumber.transportTypeId}</td>
                        <td>{transportNumber.personId}</td>
                        <td>{transportNumber.organizationId || '-'}</td>
                        <td>{transportNumber.brandId}</td>
                        <td>{transportNumber.colorId}</td>
                        <td>{new Date(transportNumber.issueDate).toLocaleDateString()}</td>
                        <td>{transportNumber.engineCapacity}</td>
                        <td>{transportNumber.engineId}</td>
                        <td>{transportNumber.chassisId}</td>
                        <td>{transportNumber.coachbuilderId}</td>
                        <td>{transportNumber.number}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransportNumberDirectory;
