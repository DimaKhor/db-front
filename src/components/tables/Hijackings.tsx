import React, { useEffect, useState } from 'react';
import {
    getBrands, getColors,
    getHijackings,
    getHijackingsResult, getOrganizations, getPersons,
    getTransportNumberDirectory,
    getTransportTypes
} from '../../services/tableService';
import { getHijackingById, addHijacking, updateHijacking, deleteHijacking } from '../../services/hijackingsService';

interface Hijacking {
    id: number;
    transportId: string;
    resultId: string;
    signaling: string;
    date: string;
}

const Hijackings: React.FC = () => {
    const [hijackings, setHijackings] = useState<Hijacking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formType, setFormType] = useState<'create' | 'update' | 'delete' | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [hijackingResult, setResult] = useState([]);
    const [number, setNumber] = useState([]);

    const fetchHijackings = async () => {
        try {
            const data = await getHijackings();
            setHijackings(data);
        } catch (err: any) {
            setError(`Failed to fetch hijackings: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedData = async () => {
        try {
            const [hijackingResult, number] = await Promise.all([
                getHijackingsResult(),
                getTransportNumberDirectory()
            ]);
            setResult(hijackingResult);
            setNumber(number);
        } catch (err: any) {
            setError(`Failed to fetch related data: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchHijackings();
        fetchRelatedData()
    }, []);

    const validateFormData = (): boolean => {
        if (!formData.transportId || !formData.date || !formData.resultId || !formData.signaling) {
            setError('Все поля обязательны для заполнения.');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        try {
            if (formType === 'create') {
                if (!validateFormData()) return;
                await addHijacking(formData);
            } else if (formType === 'update' && selectedId !== null) {
                if (!validateFormData()) return;
                await updateHijacking(selectedId, formData);
            } else if (formType === 'delete' && selectedId !== null) {
                await deleteHijacking(selectedId);
            }
            setFormType(null);
            setFormData({});
            setSelectedId(null);
            await fetchHijackings();
            setError(null);
        } catch (err: any) {
            setError(`Failed to ${formType}: ${err.message}`);
        }
    };

    const fetchHijackingForUpdate = async (id: number) => {
        try {
            const hijacking = await getHijackingById(id);
            const date = new Date(hijacking.date);
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            hijacking.date = date.toISOString().split('T')[0];
            setFormData(hijacking);
        } catch (err: any) {
            setError(`Failed to fetch hijacking: ${err.message}`);
        }
    };

    useEffect(() => {
        if (formType === 'update' && selectedId !== null) {
            fetchHijackingForUpdate(selectedId);
        }
    }, [selectedId]);

    const today = new Date().toISOString().split('T')[0];

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Hijackings</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Transport</th>
                    <th>Result</th>
                    <th>Signaling</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>
                {hijackings.map((hijacking) => (
                    <tr key={hijacking.id}>
                        <td>{hijacking.id}</td>
                        <td>{hijacking.transportId}</td>
                        <td>{hijacking.resultId}</td>
                        <td>{hijacking.signaling}</td>
                        <td>{new Date(hijacking.date).toLocaleDateString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="actions">
                <button onClick={() => setFormType('create')}>Создать запись</button>
                <button onClick={() => setFormType('delete')}>Удалить запись</button>
                <button onClick={() => setFormType('update')}>Изменить запись</button>
            </div>
            {formType && (
                <div className="form-container">
                    {formType === 'create' && (
                        <div>
                            <h3>Создать запись</h3>
                            <select
                                className="styled-select"
                                value={formData.transportId || ''}
                                onChange={(e) => setFormData({...formData, transportId: e.target.value})}
                            >
                                <option value="">Выберите транспорт</option>
                                {number.map((number: any) => (
                                    <option key={number.id}
                                            value={number.id}>{[number.id, ', ', number.number]}</option>
                                ))}
                            </select>
                            <select
                                className="styled-select"
                                value={formData.resultId || ''}
                                onChange={(e) => setFormData({...formData, resultId: e.target.value})}
                            >
                                <option value="">Выберите тип</option>
                                {hijackingResult.map((hijackingResult: any) => (
                                    <option key={hijackingResult.id}
                                            value={hijackingResult.id}>{[hijackingResult.id, ', ', hijackingResult.resultName]}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Signaling"
                                value={formData.signaling || ''}
                                onChange={(e) => setFormData({...formData, signaling: e.target.value})}
                            />
                            <input
                                type="date"
                                max={today}
                                placeholder="Date"
                                value={formData.date || ''}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                            />
                        </div>
                    )}
                    {formType === 'delete' && (
                        <div>
                            <h3>Удалить запись</h3>
                            <div className="select-wrapper">
                                <select
                                    className="select-input"
                                    value={selectedId || ''}
                                    onChange={(e) => setSelectedId(Number(e.target.value))}
                                >
                                    <option value="">Выберите ID</option>
                                    {hijackings.map(hijacking => (
                                        <option key={hijacking.id} value={hijacking.id}>{hijacking.id}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                    {formType === 'update' && (
                        <div>
                            <h3>Изменить запись</h3>
                            <div className="select-wrapper">
                                <select
                                    className="select-input"
                                    value={selectedId || ''}
                                    onChange={(e) => setSelectedId(Number(e.target.value))}
                                >
                                    <option value="">Выберите ID</option>
                                    {hijackings.map(hijacking => (
                                        <option key={hijacking.id} value={hijacking.id}>{hijacking.id}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedId && (
                                <div>
                                    <select
                                        className="styled-select"
                                        value={formData.transportId || ''}
                                        onChange={(e) => setFormData({...formData, transportId: e.target.value})}
                                    >
                                        <option value="">Выберите транспорт</option>
                                        {number.map((number: any) => (
                                            <option key={number.id}
                                                    value={number.id}>{[number.id, ', ', number.number]}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="styled-select"
                                        value={formData.resultId || ''}
                                        onChange={(e) => setFormData({...formData, resultId: e.target.value})}
                                    >
                                        <option value="">Выберите тип</option>
                                        {hijackingResult.map((hijackingResult: any) => (
                                            <option key={hijackingResult.id}
                                                    value={hijackingResult.id}>{[hijackingResult.id, ', ', hijackingResult.resultName]}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Signaling"
                                        value={formData.signaling || ''}
                                        onChange={(e) => setFormData({...formData, signaling: e.target.value})}
                                    />
                                    <input
                                        type="date"
                                        max={today}
                                        placeholder="Date"
                                        value={formData.date || ''}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                    {error && <div className="error-message">{error}</div>}
                    <button onClick={handleSave}>Сохранить</button>
                </div>
            )}
        </div>
    );
};

export default Hijackings;
