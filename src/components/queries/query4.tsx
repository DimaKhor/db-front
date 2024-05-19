import React, { useState, useEffect } from 'react';
import { getFailedInspectionOwners, getFailedInspectionOwnersCount } from '../../services/queryService';

const Query4: React.FC = () => {
    const [owners, setOwners] = useState<number[]>([]);
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ownersData = await getFailedInspectionOwners();
                setOwners(ownersData);

                const countData = await getFailedInspectionOwnersCount();
                setCount(countData);
            } catch (err: any) {
                setError(`Ошибка при получении данных: ${err.message}`);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="form-container">
            <h2>Перечень и общее число машин, не прошедших вовремя техосмотр</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="results">
                <table className="result-table">
                    <thead>
                    <tr>
                        <th>Transport ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {owners.map((owner, index) => (
                        <tr key={index}>
                            <td>{owner}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <div className="count">Общее число машин: {count}</div>
            </div>
        </div>
    );
};

export default Query4;
