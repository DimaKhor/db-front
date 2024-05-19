import React, { useEffect, useState } from 'react';
import { getBrands } from '../../services/tableService';
import { addBrand, deleteBrand, updateBrand } from '../../services/brandsService';

interface Brand {
    id: number;
    name: string;
}

const Brands: React.FC = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [action, setAction] = useState<'create' | 'delete' | 'update' | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [inputId, setInputId] = useState<string>('');

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const data = await getBrands();
                setBrands(data);
            } catch (err: any) {
                setError(`Failed to fetch brands: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    const handleSave = async () => {
        try {
            setError(null); // Reset error before attempting the operation
            if (action === 'create' && inputValue) {
                await addBrand(inputValue);
            } else if (action === 'delete' && inputId) {
                await deleteBrand(Number(inputId));
            } else if (action === 'update' && inputId && inputValue) {
                await updateBrand(Number(inputId), inputValue);
            } else {
                setError('Please provide valid input.');
                return;
            }

            setInputValue('');
            setInputId('');
            setAction(null);
            const data = await getBrands();
            setBrands(data);
        } catch (err: any) {
            setError(`Failed to ${action}: ${err.message}`);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Brands</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {brands.map((brand) => (
                    <tr key={brand.id}>
                        <td>{brand.id}</td>
                        <td>{brand.name}</td>
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
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={String(brand.id)}>
                                            {brand.id}
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
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={String(brand.id)}>
                                            {brand.id}
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
                    <button className="margin-top" onClick={handleSave}>Сохранить</button>
                </div>
            )}
        </div>
    );
};

export default Brands;
