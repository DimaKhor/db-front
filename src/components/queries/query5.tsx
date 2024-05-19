import React, { useState } from 'react';
import { getAccidentStatisticsByTypeAndPeriod } from '../../services/queryService';

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
    const [searched, setSearched] = useState<boolean>(false); // Добавлено состояние для проверки выполнения запроса

    const isValidDate = (date: string) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) return false;
        const [year, month, day] = date.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        return dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;
    };

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
        setSearched(true); // Установка флага поиска

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
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Начальная дата (yyyy-MM-dd):
                        <input type="text" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Конечная дата (yyyy-MM-dd):
                        <input type="text" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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
