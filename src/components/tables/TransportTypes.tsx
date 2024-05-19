import React, { useEffect, useState } from 'react';
import { getTransportTypes } from '../../services/tableService';
import { addTransportType, deleteTransportType, updateTransportType } from '../../services/transporttypesService';

interface TransportType {
    id: number;
    name: string;
}

const TransportTypes: React.FC = () => {
    const [transportTypes, setTransportTypes] = useState<TransportType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [action, setAction] = useState<'create' | 'delete' | 'update' | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [inputId, setInputId] = useState<string>('');

    useEffect(() => {
        const fetchTransportTypes = async () => {
            try {
                const data = await getTransportTypes();
                setTransportTypes(data);
            } catch (err: any) {
                setError(`Failed to fetch transport types: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchTransportTypes();
    }, []);

    const handleSave = async () => {
        try {
            setError(null); // Reset error before attempting the operation
            if (action === 'create' && inputValue) {
                await addTransportType(inputValue);
            } else if (action === 'delete' && inputId) {
                await deleteTransportType(Number(inputId));
            } else if (action === 'update' && inputId && inputValue) {
                await updateTransportType(Number(inputId), inputValue);
            } else {
                setError('Please provide valid input.');
                return;
            }

            setInputValue('');
            setInputId('');
            setAction(null);
            const data = await getTransportTypes();
            setTransportTypes(data);
        } catch (err: any) {
            setError(`Failed to ${action}: ${err.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Transport Types</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {transportTypes.map((type) => (
                    <tr key={type.id}>
                        <td>{type.id}</td>
                        <td>{type.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="actions">
                <button onClick={() => setAction('create')}>Создать запись</button>
                <button onClick={() => setAction('delete')}>Удалить запись</button>
                <button onClick={() => setAction('update')}>Изменить запись</button>
            </div>
            {action && (
                <div className="form-container">
                    {action === 'create' && (
                        <div>
                            <h3>Создать запись</h3>
                            <input
                                type="text"
                                placeholder="Название"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                        </div>
                    )}
                    {action === 'delete' && (
                        <div>
                            <h3>Удалить запись</h3>
                            <div className="select-wrapper">
                                <select
                                    value={inputId}
                                    onChange={(e) => setInputId(e.target.value)}
                                >
                                    <option value="">Выберите ID</option>
                                    {transportTypes.map((type) => (
                                        <option key={type.id} value={String(type.id)}>
                                            {type.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    {action === 'update' && (
                        <div>
                            <h3>Изменить запись</h3>
                            <div className="select-wrapper">
                                <select
                                    value={inputId}
                                    onChange={(e) => setInputId(e.target.value)}
                                >
                                    <option value="">Выберите ID</option>
                                    {transportTypes.map((type) => (
                                        <option key={type.id} value={String(type.id)}>
                                            {type.id}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <input
                                type="text"
                                placeholder="Новое название"
                                value={inputValue}
                                className="margin-top"
                                onChange={(e) => setInputValue(e.target.value)}
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

export default TransportTypes;
