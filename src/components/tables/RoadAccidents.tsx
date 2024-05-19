import React, { useEffect, useState } from 'react';
import { getRoadAccidents } from '../../services/tableService';
import { getRoadAccidentById, addRoadAccident, updateRoadAccident, deleteRoadAccident } from '../../services/roadaccidentsService';

interface RoadAccident {
    id: number;
    date: string;
    place: string;
    brief: string;
    victimsNumber: number;
    damagePrice: number;
    reason: string;
    roadConditions: string;
    typeId: string;
}

const RoadAccidents: React.FC = () => {
    const [roadAccidents, setRoadAccidents] = useState<RoadAccident[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formType, setFormType] = useState<'create' | 'update' | 'delete' | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const fetchRoadAccidents = async () => {
        try {
            const data = await getRoadAccidents();
            setRoadAccidents(data);
        } catch (err: any) {
            setError(`Failed to fetch road accidents: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRoadAccidents();
    }, []);

    const handleSave = async () => {
        try {
            if (formType === 'create') {
                await addRoadAccident(formData);
            } else if (formType === 'update' && selectedId !== null) {
                await updateRoadAccident(selectedId, formData);
            } else if (formType === 'delete' && selectedId !== null) {
                await deleteRoadAccident(selectedId);
            }
            setFormType(null);
            setFormData({});
            setSelectedId(null);
            await fetchRoadAccidents(); // Обновление данных после операции
            setError(null); // Убрать сообщение об ошибке
        } catch (err: any) {
            setError(`Failed to ${formType}: ${err.message}`);
        }
    };

    const fetchRoadAccidentForUpdate = async (id: number) => {
        try {
            const roadAccident = await getRoadAccidentById(id);
            const date = new Date(roadAccident.date);
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // Применение часового пояса
            roadAccident.date = date.toISOString().split('T')[0]; // Преобразование даты
            setFormData(roadAccident);
        } catch (err: any) {
            setError(`Failed to fetch road accident: ${err.message}`);
        }
    };

    useEffect(() => {
        if (formType === 'update' && selectedId !== null) {
            fetchRoadAccidentForUpdate(selectedId);
        }
    }, [selectedId]);

    const today = new Date().toISOString().split('T')[0];

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Road Accidents</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Place</th>
                    <th>Brief</th>
                    <th>Victims Number</th>
                    <th>Damage Price</th>
                    <th>Reason</th>
                    <th>Road Conditions</th>
                    <th>Accident Type</th>
                </tr>
                </thead>
                <tbody>
                {roadAccidents.map((accident) => (
                    <tr key={accident.id}>
                        <td>{accident.id}</td>
                        <td>{new Date(accident.date).toLocaleDateString()}</td>
                        <td>{accident.place}</td>
                        <td>{accident.brief}</td>
                        <td>{accident.victimsNumber}</td>
                        <td>{accident.damagePrice}</td>
                        <td>{accident.reason}</td>
                        <td>{accident.roadConditions}</td>
                        <td>{accident.typeId}</td>
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
                            <input
                                type="date"
                                max={today}
                                placeholder="Date"
                                value={formData.date || ''}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Place"
                                value={formData.place || ''}
                                onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Brief"
                                value={formData.brief || ''}
                                onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Victims Number"
                                value={formData.victimsNumber || ''}
                                onChange={(e) => setFormData({ ...formData, victimsNumber: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Damage Price"
                                value={formData.damagePrice || ''}
                                onChange={(e) => setFormData({ ...formData, damagePrice: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Reason"
                                value={formData.reason || ''}
                                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Road Conditions"
                                value={formData.roadConditions || ''}
                                onChange={(e) => setFormData({ ...formData, roadConditions: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Accident Type"
                                value={formData.typeId || ''}
                                onChange={(e) => setFormData({ ...formData, typeId: e.target.value })}
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
                                    {roadAccidents.map(accident => (
                                        <option key={accident.id} value={accident.id}>{accident.id}</option>
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
                                    {roadAccidents.map(accident => (
                                        <option key={accident.id} value={accident.id}>{accident.id}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedId && (
                                <div>
                                    <input
                                        type="date"
                                        max={today}
                                        placeholder="Date"
                                        value={formData.date || ''}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Place"
                                        value={formData.place || ''}
                                        onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Brief"
                                        value={formData.brief || ''}
                                        onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Victims Number"
                                        value={formData.victimsNumber || ''}
                                        onChange={(e) => setFormData({ ...formData, victimsNumber: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Damage Price"
                                        value={formData.damagePrice || ''}
                                        onChange={(e) => setFormData({ ...formData, damagePrice: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Reason"
                                        value={formData.reason || ''}
                                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                    />
                                    <input

                                        type="text"
                                        placeholder="Road Conditions"
                                        value={formData.roadConditions || ''}
                                        onChange={(e) => setFormData({ ...formData, roadConditions: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Accident Type"
                                        value={formData.typeId || ''}
                                        onChange={(e) => setFormData({ ...formData, typeId: e.target.value })}
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

export default RoadAccidents;
