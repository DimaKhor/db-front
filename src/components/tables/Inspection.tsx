import React, { useEffect, useState } from 'react';
import { getInspection } from '../../services/tableService';
import { getInspectionById, addInspection, updateInspection, deleteInspection } from '../../services/inspectionService';

interface Inspection {
    id: number;
    transportId: string;
    paymentForLiter: number;
    periodicityInMonths: number;
    lastTime: string;
}

const Inspection: React.FC = () => {
    const [inspections, setInspections] = useState<Inspection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formType, setFormType] = useState<'create' | 'update' | 'delete' | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const fetchInspections = async () => {
        try {
            const data = await getInspection();
            setInspections(data);
        } catch (err: any) {
            setError(`Failed to fetch inspections: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInspections();
    }, []);

    const handleSave = async () => {
        try {
            if (formType === 'create') {
                await addInspection(formData);
            } else if (formType === 'update' && selectedId !== null) {
                await updateInspection(selectedId, formData);
            } else if (formType === 'delete' && selectedId !== null) {
                await deleteInspection(selectedId);
            }
            setFormType(null);
            setFormData({});
            setSelectedId(null);
            await fetchInspections(); // Обновление данных после операции
            setError(null); // Убрать сообщение об ошибке
        } catch (err: any) {
            setError(`Failed to ${formType}: ${err.message}`);
        }
    };

    const fetchInspectionForUpdate = async (id: number) => {
        try {
            const inspection = await getInspectionById(id);
            const date = new Date(inspection.lastTime);
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset()); // Применение часового пояса
            inspection.lastTime = date.toISOString().split('T')[0]; // Преобразование даты
            setFormData(inspection);
        } catch (err: any) {
            setError(`Failed to fetch inspection: ${err.message}`);
        }
    };

    useEffect(() => {
        if (formType === 'update' && selectedId !== null) {
            fetchInspectionForUpdate(selectedId);
        }
    }, [selectedId]);

    const today = new Date().toISOString().split('T')[0];

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Inspections</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Transport</th>
                    <th>Payment For Liter</th>
                    <th>Periodicity In Months</th>
                    <th>Last Time</th>
                </tr>
                </thead>
                <tbody>
                {inspections.map((inspection) => (
                    <tr key={inspection.id}>
                        <td>{inspection.id}</td>
                        <td>{inspection.transportId}</td>
                        <td>{inspection.paymentForLiter}</td>
                        <td>{inspection.periodicityInMonths}</td>
                        <td>{new Date(inspection.lastTime).toLocaleDateString()}</td>
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
                                type="text"
                                placeholder="Transport ID"
                                value={formData.transportId || ''}
                                onChange={(e) => setFormData({ ...formData, transportId: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Payment For Liter"
                                value={formData.paymentForLiter || ''}
                                onChange={(e) => setFormData({ ...formData, paymentForLiter: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Periodicity In Months"
                                value={formData.periodicityInMonths || ''}
                                onChange={(e) => setFormData({ ...formData, periodicityInMonths: e.target.value })}
                            />
                            <input
                                type="date"
                                max={today}
                                placeholder="Last Time"
                                value={formData.lastTime || ''}
                                onChange={(e) => setFormData({ ...formData, lastTime: e.target.value })}
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
                                    {inspections.map(inspection => (
                                        <option key={inspection.id} value={inspection.id}>{inspection.id}</option>
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
                                    {inspections.map(inspection => (
                                        <option key={inspection.id} value={inspection.id}>{inspection.id}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedId && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Transport ID"
                                        value={formData.transportId || ''}
                                        onChange={(e) => setFormData({ ...formData, transportId: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Payment For Liter"
                                        value={formData.paymentForLiter || ''}
                                        onChange={(e) => setFormData({ ...formData, paymentForLiter: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Periodicity In Months"
                                        value={formData.periodicityInMonths || ''}
                                        onChange={(e) => setFormData({ ...formData, periodicityInMonths: e.target.value })}
                                    />
                                    <input
                                        type="date"
                                        max={today}
                                        placeholder="Last Time"
                                        value={formData.lastTime || ''}
                                        onChange={(e) => setFormData({ ...formData, lastTime: e.target.value })}
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

export default Inspection;
