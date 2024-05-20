import React, { useEffect, useState } from 'react';
import { getAccidentTypes } from '../../services/tableService';
import { addAccidentType, deleteAccidentType, updateAccidentType } from '../../services/accidenttypesService';

interface AccidentType {
    id: number;
    name: string;
}

const AccidentTypes: React.FC = () => {
    const [accidentTypes, setAccidentTypes] = useState<AccidentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [action, setAction] = useState<'create' | 'delete' | 'update' | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [inputId, setInputId] = useState<string>('');

    useEffect(() => {
        const fetchAccidentTypes = async () => {
            try {
                const data = await getAccidentTypes();
                setAccidentTypes(data);
            } catch (err: any) {
                setError(`Failed to fetch accident types: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchAccidentTypes();
    }, []);

    const handleSave = async () => {
        try {
            setError(null); // Reset error before attempting the operation
            if (action === 'create' && inputValue) {
                await addAccidentType(inputValue);
            } else if (action === 'delete' && inputId) {
                await deleteAccidentType(Number(inputId));
            } else if (action === 'update' && inputId && inputValue) {
                await updateAccidentType(Number(inputId), inputValue);
            } else {
                setError('Заполните поле.');
                return;
            }

            setInputValue('');
            setInputId('');
            setAction(null);
            const data = await getAccidentTypes();
            setAccidentTypes(data);
        } catch (err: any) {
            setError(`Failed to ${action}: ${err.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Accident Types</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {accidentTypes.map((type) => (
                    <tr key={type.id}>
                        <td>{type.id}</td>
                        <td>{type.name}</td>
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
                                    {accidentTypes.map((type) => (
                                        <option key={type.id} value={String(type.id)}>
                                            {type.id}
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
                                    {accidentTypes.map((type) => (
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

export default AccidentTypes;
