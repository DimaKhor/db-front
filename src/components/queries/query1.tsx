import React, { useState } from 'react';
import { getOrganizationsBySeriesOrPeriod, getOrganizationsCountBySeriesOrPeriod } from '../../services/queryService';

const Query1: React.FC = () => {
    const [series, setSeries] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string[]>([]);
    const [count, setCount] = useState<number | null>(null);
    const [searched, setSearched] = useState<boolean>(false);

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

        if ((startDate && !isValidDate(startDate)) || (endDate && !isValidDate(endDate))) {
            setError('Дата должна быть в формате yyyy-MM-dd и быть корректной');
            setResult([]);
            setCount(null);
            return;
        }

        if ((!startDate && endDate) || (startDate && !endDate)) {
            setError('Необходимо заполнить обе даты или ни одну');
            setResult([]);
            setCount(null);
            return;
        }

        setError(null);
        setSearched(true);

        try {
            const data = await getOrganizationsBySeriesOrPeriod(series, startDate, endDate);
            setResult(data);

            const countData = await getOrganizationsCountBySeriesOrPeriod(series, startDate, endDate);
            setCount(countData);
        } catch (err: any) {
            setError(`Ошибка при получении данных: ${err.message}`);
            setResult([]);
            setCount(null);
        }
    };

    return (
        <div className="form-container">
            <h2>Перечень организаций, которым выделены номера либо с указанной серией, либо за указанный период</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Серия:
                        <input
                            type="text" value={series} onChange={(e) => setSeries(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Начальная дата:
                        <input
                            type="date"
                            max={today}
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Конечная дата:
                        <input type="date"
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
                {searched && !result.length && !error && <div>Нет данных для отображения</div>}
                {result.length > 0 && (
                    <>
                        <table className="result-table">
                            <thead>
                            <tr>
                                <th>Название организации</th>
                            </tr>
                            </thead>
                            <tbody>
                            {result.map((orgName, index) => (
                                <tr key={index}>
                                    <td>{orgName}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="count">Число организаций: {count}</div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Query1;
