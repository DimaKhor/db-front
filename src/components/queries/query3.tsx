import React, { useState } from 'react';
import { getCarProfileByTransportNumber } from '../../services/queryService';

const Query3: React.FC = () => {
    const [number, setNumber] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<any | null>(null);
    const [searched, setSearched] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);
        setResult(null);
        setSearched(true);

        try {
            const data = await getCarProfileByTransportNumber(number);
            if (!data || data.length === 0) {
                setError('Нет данных для отображения');
            } else {
                setResult(data[0]); // Берем первый элемент массива данных
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
                        <input
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
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
