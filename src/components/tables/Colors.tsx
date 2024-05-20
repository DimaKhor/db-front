import React, { useEffect, useState } from 'react';
import { getColors } from '../../services/tableService';
import { addColor, deleteColor, updateColor } from '../../services/colorsService';

interface Color {
    id: number;
    name: string;
}

const Colors: React.FC = () => {
    const [colors, setColors] = useState<Color[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [action, setAction] = useState<'create' | 'delete' | 'update' | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [inputId, setInputId] = useState<string>('');

    useEffect(() => {
        const fetchColors = async () => {
            try {
                const data = await getColors();
                setColors(data);
            } catch (err: any) {
                setError(`Failed to fetch colors: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchColors();
    }, []);

    const handleSave = async () => {
        try {
            setError(null);
            if (action === 'create' && inputValue) {
                await addColor(inputValue);
            } else if (action === 'delete' && inputId) {
                await deleteColor(Number(inputId));
            } else if (action === 'update' && inputId && inputValue) {
                await updateColor(Number(inputId), inputValue);
            } else {
                setError('Заполните поле.');
                return;
            }

            setInputValue('');
            setInputId('');
            setAction(null);
            const data = await getColors();
            setColors(data);
        } catch (err: any) {
            setError(`${err.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Colors</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {colors.map((color) => (
                    <tr key={color.id}>
                        <td>{color.id}</td>
                        <td>{color.name}</td>
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
                                required
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
                                    {colors.map((color) => (
                                        <option key={color.id} value={String(color.id)}>
                                            {color.id}
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
                                    {colors.map((color) => (
                                        <option key={color.id} value={String(color.id)}>
                                            {color.id}
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

export default Colors;
