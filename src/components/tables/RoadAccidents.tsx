import React, { useEffect, useState } from 'react';
import { getRoadAccidents } from '../../services/tableService';

interface RoadAccident {
    id: number;
    date: string;
    place: string;
    brief: string;
    victimsNumber: number;
    damagePrice: number;
    reason: string;
    roadConditions: string;
    typeId: string;
}

const RoadAccidents: React.FC = () => {
    const [roadAccidents, setRoadAccidents] = useState<RoadAccident[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoadAccidents = async () => {
            try {
                const data = await getRoadAccidents();
                setRoadAccidents(data);
            } catch (err: any) {
                setError(`Failed to fetch road accidents: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRoadAccidents();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="table-container">
            <h2>Road Accidents</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Place</th>
                    <th>Brief</th>
                    <th>Victims Number</th>
                    <th>Damage Price</th>
                    <th>Reason</th>
                    <th>Road Conditions</th>
                    <th>Accident Type</th>
                </tr>
                </thead>
                <tbody>
                {roadAccidents.map((accident) => (
                    <tr key={accident.id}>
                        <td>{accident.id}</td>
                        <td>{new Date(accident.date).toLocaleDateString()}</td>
                        <td>{accident.place}</td>
                        <td>{accident.brief}</td>
                        <td>{accident.victimsNumber}</td>
                        <td>{accident.damagePrice}</td>
                        <td>{accident.reason}</td>
                        <td>{accident.roadConditions}</td>
                        <td>{accident.typeId}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoadAccidents;
