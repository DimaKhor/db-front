import React, { useEffect, useState } from 'react';
import { getHijackingsResult } from '../../services/tableService';
import { addHijackingsResult, deleteHijackingsResult, updateHijackingsResult } from '../../services/hijackingsresultService';

interface HijackingResult {
    id: number;
    resultName: string;
}

const HijackingsResult: React.FC = () => {
    const [hijackingResults, setHijackingResults] = useState<HijackingResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [action, setAction] = useState<'create' | 'delete' | 'update' | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [inputId, setInputId] = useState<string>('');

    useEffect(() => {
        const fetchHijackingResults = async () => {
            try {
                const data = await getHijackingsResult();
                setHijackingResults(data);
            } catch (err: any) {
                setError(`Failed to fetch hijacking results: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchHijackingResults();
    }, []);

    const handleSave = async () => {
        try {
            setError(null);
            if (action === 'create' && inputValue) {
                await addHijackingsResult(inputValue);
            } else if (action === 'delete' && inputId) {
                await deleteHijackingsResult(Number(inputId));
            } else if (action === 'update' && inputId && inputValue) {
                await updateHijackingsResult(Number(inputId), inputValue);
            } else {
                setError('Заполните поле.');
                return;
            }

            setInputValue('');
            setInputId('');
            setAction(null);
            const data = await getHijackingsResult();
            setHijackingResults(data);
        } catch (err: any) {
            setError(`Failed to ${action}: ${err.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Hijackings Result</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {hijackingResults.map((result) => (
                    <tr key={result.id}>
                        <td>{result.id}</td>
                        <td>{result.resultName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="actions">
                <button onClick={() => setAction('create')}>Добавить запись</button>
                <button onClick={() => setAction('delete')}>Удалить запись</button>
                <button onClick={() => setAction('update')}>Изменить запись</button>
            </div>
            {action && (
                <div className="form-container">
                    {action === 'create' && (
                        <div>
                            <h3>Добавить запись</h3>
                            <input
                                type="text"
                                placeholder="Название"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                    )}
                    {action === 'delete' && (
                        <div className="select-container">
                            <h3 className="select-label">Удалить запись</h3>
                            <div className="select-wrapper">
                                <select
                                    value={inputId}
                                    onChange={(e) => setInputId(e.target.value)}
                                >
                                    <option value="">Выберите ID</option>
                                    {hijackingResults.map((result) => (
                                        <option key={result.id} value={String(result.id)}>
                                            {result.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    {action === 'update' && (
                        <div className="select-container">
                            <h3 className="select-label">Изменить запись</h3>
                            <div className="select-wrapper">
                                <select
                                    value={inputId}
                                    onChange={(e) => setInputId(e.target.value)}
                                >
                                    <option value="">Выберите ID</option>
                                    {hijackingResults.map((result) => (
                                        <option key={result.id} value={String(result.id)}>
                                            {result.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <input
                                type="text"
                                placeholder="Новое название"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="margin-top"
                            />
                        </div>
                    )}
                    {error && <div className="error-message">{error}</div>}
                    <button onClick={handleSave}>Сохранить</button>
                </div>
            )}
        </div>
    );
};

export default HijackingsResult;
