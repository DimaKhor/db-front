import React, { useState, useEffect } from 'react';
import { getHijackingsEfficiency } from '../../services/queryService';

const Query9: React.FC = () => {
    const [efficiency, setEfficiency] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getHijackingsEfficiency();
                setEfficiency(data);
            } catch (err: any) {
                setError(`Ошибка при получении данных: ${err.message}`);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="form-container">
            <h2>Данные об эффективности розыскной работы</h2>
            {error && <div className="error-message">{error}</div>}
            {efficiency !== null ? (
                <div className="efficiency-result">
                    <p>Количество найденных машин в процентном отношении:</p>
                    <span className="efficiency-value">{efficiency * 100}%</span>
                </div>
            ) : (
                !error && <div>Нет данных для отображения</div>
            )}
        </div>
    );
};

export default Query9;
