import React, { useState, useEffect } from 'react';
import { getMostDangerousPlaces, getMostPopularReason } from '../../services/queryService';

const Query6: React.FC = () => {
    const [mostDangerousPlaces, setMostDangerousPlaces] = useState<string[]>([]);
    const [mostPopularReason, setMostPopularReason] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dangerousPlaces = await getMostDangerousPlaces();
                const popularReason = await getMostPopularReason();
                setMostDangerousPlaces(dangerousPlaces);
                setMostPopularReason(popularReason);
            } catch (err: any) {
                setError(`Ошибка при получении данных: ${err.message}`);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="form-container">
            <h2>Самые опасные места в городе</h2>
            <div className="results">
                <table className="result-table">
                    <thead>
                    <tr>
                        <th>Место</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mostDangerousPlaces.map((place, index) => (
                        <tr key={index}>
                            <td>{place}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <h2 className="margin">Самая частая причина ДТП</h2>
            <div className="results">
                <table className="result-table">
                    <thead>
                    <tr>
                        <th>Причина</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mostPopularReason.map((reason, index) => (
                        <tr key={index}>
                            <td>{reason}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {error && <div className="error-message">{error}</div>}
            {!error && mostDangerousPlaces.length === 0 && mostPopularReason.length === 0 && <div>Нет данных для отображения</div>}
        </div>
    );
};

export default Query6;
