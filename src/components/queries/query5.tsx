import React, { useState, useEffect } from 'react';
import { getAccidentStatisticsByTypeAndPeriod } from '../../services/queryService';
import { getAccidentTypes } from "../../services/tableService";

interface AccidentStatistics {
    name: string;
    count: number;
}

const Query5: React.FC = () => {
    const [type, setType] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<AccidentStatistics[]>([]);
    const [searched, setSearched] = useState<boolean>(false);
    const [accidentTypes, setAccidentTypes] = useState<any[]>([]);

    useEffect(() => {
        const fetchAccidentTypes = async () => {
            try {
                const data = await getAccidentTypes();
                setAccidentTypes(data);
            } catch (err: any) {
                console.error('Failed to fetch accident types:', err.message);
            }
        };

        fetchAccidentTypes();
    }, []);

    const isValidDate = (date: string) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) return false;
        const [year, month, day] = date.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        return dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;
    };

    const today = new Date().toISOString().split('T')[0];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!type || !startDate || !endDate) {
            setError('Все поля должны быть заполнены');
            setResult([]);
            return;
        }

        if (!isValidDate(startDate) || !isValidDate(endDate)) {
            setError('Дата должна быть в формате yyyy-MM-dd и быть корректной');
            setResult([]);
            return;
        }

        setError(null);
        setSearched(true);

        try {
            const data = await getAccidentStatisticsByTypeAndPeriod(type, startDate, endDate);
            setResult(data);
        } catch (err: any) {
            setError(`Ошибка при получении данных: ${err.message}`);
            setResult([]);
        }
    };

    return (
        <div className="form-container">
            <h2>Статистика по типу ДТП за указанный период</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Тип ДТП:
                        <select
                            className="styled-select"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Выберите тип ДТП</option>
                            {accidentTypes.map((accidentType) => (
                                <option key={accidentType.id} value={accidentType.name}>{accidentType.name}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Начальная дата:
                        <input
                            type="date"
                            value={startDate}
                            max={today}
                            onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Конечная дата:
                        <input
                            type="date"
                            value={endDate}
                            min={startDate}
                            max={today}
                            onChange={(e) => setEndDate(e.target.value)} />
                    </label>
                </div>
                <button type="submit">Найти</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <div className="results">
                {searched && result.length === 0 && !error ? (
                    <div>Нет данных для отображения</div>
                ) : null}
                {result.length > 0 ? (
                    <table className="result-table">
                        <thead>
                        <tr>
                            <th>Тип ДТП</th>
                            <th>Количество</th>
                        </tr>
                        </thead>
                        <tbody>
                        {result.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : null}
            </div>
        </div>
    );
};

export default Query5;
