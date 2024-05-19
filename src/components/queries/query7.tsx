import React, { useState, useEffect } from 'react';
import { getDrunkDrivingAccidentsAndPercentage } from '../../services/queryService';

const Query7: React.FC = () => {
    const [drunkDrivingData, setDrunkDrivingData] = useState<[number, number] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [dataFetched, setDataFetched] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDrunkDrivingAccidentsAndPercentage();
                if (data.length > 0) {
                    setDrunkDrivingData(data[0]);
                }
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
            <h2>ДТП, совершенные водителями в нетрезвом виде</h2>
            <div className="results">
                {drunkDrivingData ? (
                    <table className="result-table">
                        <thead>
                        <tr>
                            <th>Количество ДТП</th>
                            <th>Доля в общем количестве ДТП</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{drunkDrivingData[0]}</td>
                            <td>{(drunkDrivingData[1] * 100).toFixed(2)}%</td>
                        </tr>
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

export default Query7;
