import React, { useState } from 'react';
import { getHijackingsByPeriod, getHijackingsCountByPeriod } from '../../services/queryService';

interface Hijacking {
    car_number: string;
}

const Query10: React.FC = () => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<Hijacking[]>([]);
    const [count, setCount] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const isValidDate = (date: string) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) return false;
        const [year, month, day] = date.split('-').map(Number);
        const dateObj = new Date(year, month - 1, day);
        return dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!startDate || !endDate) {
            setError('Все поля должны быть заполнены');
            setResult([]);
            setCount(null);
            return;
        }

        if (!isValidDate(startDate) || !isValidDate(endDate)) {
            setError('Дата должна быть в формате yyyy-MM-dd и быть корректной');
            setResult([]);
            setCount(null);
            return;
        }

        setError(null);

        try {
            const data = await getHijackingsByPeriod(startDate, endDate);
            setResult(data.map((number) => ({ car_number: number })));

            const countData = await getHijackingsCountByPeriod(startDate, endDate);
            setCount(countData);
        } catch (err: any) {
            setError(`Ошибка при получении данных: ${err.message}`);
            setResult([]);
            setCount(null);
        }
    };

    return (
        <div className="form-container">
            <h2>Перечень и общее число угонов за указанный период</h2>
            <form onSubmit={handleSubmit}>
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
                {result.length > 0 ? (
                    <>
                        <table className="result-table">
                            <thead>
                            <tr>
                                <th>Номер автомобиля</th>
                            </tr>
                            </thead>
                            <tbody>
                            {result.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.car_number}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="count">
                            Общее число угонов: {count}
                        </div>
                    </>
                ) : submitted && !error && <div>Нет данных для отображения</div>}
            </div>
        </div>
    );
};

export default Query10;
