import React, { useState, useEffect } from 'react';
import { getPersonByTransportNumber } from '../../services/queryService';
import { getTransportNumberDirectory } from '../../services/tableService';

interface Person {
    id: number;
    lastname: string;
    name: string;
    fathername: string;
    city: string;
    street: string;
    house: string;
    apartment: number | null;
}

const Query2: React.FC = () => {
    const [selectedNumberId, setSelectedNumberId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<Person | null>(null);
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
            const data = await getPersonByTransportNumber(selectedNumberId);
            setResult(data);
        } catch (err: any) {
            setError(`Ошибка при получении данных: ${err.message}`);
        }
    };

    return (
        <div className="form-container">
            <h2>Сведения о владельце автотранспортного средства по государственному номеру</h2>
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
                            <th>ID</th>
                            <th>Фамилия</th>
                            <th>Имя</th>
                            <th>Отчество</th>
                            <th>Город</th>
                            <th>Улица</th>
                            <th>Дом</th>
                            <th>Квартира</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{result.id}</td>
                            <td>{result.lastname}</td>
                            <td>{result.name}</td>
                            <td>{result.fathername}</td>
                            <td>{result.city}</td>
                            <td>{result.street}</td>
                            <td>{result.house}</td>
                            <td>{result.apartment ?? 'Нет'}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Query2;
