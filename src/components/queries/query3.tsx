import React, { useState, useEffect } from 'react';
import { getCarProfileByTransportNumber } from '../../services/queryService';
import { getTransportNumberDirectory } from '../../services/tableService';

const Query3: React.FC = () => {
    const [selectedNumberId, setSelectedNumberId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any | null>(null);
    const [searched, setSearched] = useState<boolean>(false);
    const [numbers, setNumbers] = useState<any[]>([]);

    useEffect(() => {
        const fetchTransportNumbers = async () => {
            try {
                const data = await getTransportNumberDirectory();
                setNumbers(data);
            } catch (err: any) {
                console.error('Failed to fetch transport numbers:', err.message);
            }
        };

        fetchTransportNumbers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setResult(null);
        setSearched(true);

        try {
            const data = await getCarProfileByTransportNumber(selectedNumberId);
            if (!data || data.length === 0) {
                setError('Нет данных для отображения');
            } else {
                setResult(data[0]);
            }
        } catch (err: any) {
            setError(`Ошибка при получении данных: ${err.message}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Досье на автомобиль по государственному номеру</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Государственный номер:
                        <select
                            className="styled-select"
                            value={selectedNumberId}
                            onChange={(e) => setSelectedNumberId(e.target.value)}
                        >
                            <option value="">Выберите транспорт</option>
                            {numbers.map((number) => (
                                <option key={number.id} value={number.number}>{number.number}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit">Найти</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {result && (
                <div className="results">
                    <table className="result-table">
                    <thead>
                        <tr>
                            <th>Номер двигателя</th>
                            <th>Номер кузова</th>
                            <th>Номер шасси</th>
                            <th>Участвовал в ДТП</th>
                            <th>Прошел техосмотр</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{result[0]}</td>
                            <td>{result[1]}</td>
                            <td>{result[2]}</td>
                            <td>{result[3] ? 'Да' : 'Нет'}</td>
                            <td>{result[4] ? 'Да' : 'Нет'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Query3;
