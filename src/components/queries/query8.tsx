import React, { useState, useEffect } from 'react';
import { getWantedVehicles } from '../../services/queryService';

const Query8: React.FC = () => {
    const [wantedVehicles, setWantedVehicles] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [dataFetched, setDataFetched] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getWantedVehicles();
                setWantedVehicles(data);
                setDataFetched(true);
            } catch (err: any) {
                setError(`Ошибка при получении данных: ${err.message}`);
                setDataFetched(true);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="form-container">
            <h2>Список машин, отданных в розыск</h2>
            <div className="results">
                {wantedVehicles.length > 0 ? (
                    <table className="result-table">
                        <thead>
                        <tr>
                            <th>Номер машины</th>
                        </tr>
                        </thead>
                        <tbody>
                        {wantedVehicles.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{vehicle}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    dataFetched && <div>Нет данных для отображения</div>
                )}
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default Query8;
