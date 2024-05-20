import React, { useEffect, useState } from 'react';
import { getRoadAccidents, getTransportNumberDirectory, getTransportsDamagedInAccident } from '../../services/tableService';
import { addTransportDamaged, updateTransportDamaged, deleteTransportDamaged, getTransportDamagedById } from '../../services/transportdamagedinaccidentService';

interface TransportDamaged {
    accidentId: number;
    transportId: number;
    didRunAway: boolean;
    found: boolean | null;
}

const TransportsDamagedInAccident: React.FC = () => {
    const [transportsDamaged, setTransportsDamaged] = useState<TransportDamaged[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formType, setFormType] = useState<'create' | 'update' | 'delete' | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [selectedId, setSelectedId] = useState<{ accidentId: number, transportId: number } | null>(null);
    const [accidents, setAccidents] = useState<any[]>([]);
    const [transportNumbers, setTransportNumbers] = useState<any[]>([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [transportsData, accidentsData, transportNumbersData] = await Promise.all([
                getTransportsDamagedInAccident(),
                getRoadAccidents(),
                getTransportNumberDirectory()
            ]);
            setTransportsDamaged(transportsData);
            setAccidents(accidentsData);
            setTransportNumbers(transportNumbersData);
        } catch (err: any) {
            setError(`Failed to fetch data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async () => {
        setError(null);
        try {
            if (formType === 'create') {
                if (formData.didRunAway === false) {
                    if (!formData.accidentId || !formData.transportId || formData.didRunAway === undefined) {
                        throw new Error('Заполните все поля');
                    }
                } else {
                    if (!formData.accidentId || !formData.transportId || formData.didRunAway === undefined || formData.found === undefined) {
                        throw new Error('Заполните все поля');
                    }
                }
                await addTransportDamaged(formData);
            } else if (formType === 'update' && selectedId !== null) {
                await updateTransportDamaged(selectedId.accidentId, selectedId.transportId, formData);
            } else if (formType === 'delete' && selectedId !== null) {
                await deleteTransportDamaged(selectedId.accidentId, selectedId.transportId);
            }
            setFormType(null);
            setFormData({});
            setSelectedId(null);
            await fetchData();
        } catch (err: any) {
            setError(`Error: ${err.message}`);
        }
    };

    const fetchTransportDamagedForUpdate = async (accidentId: number, transportId: number) => {
        setError(null);
        try {
            const transportDamaged = await getTransportDamagedById(accidentId, transportId);
            setFormData(transportDamaged);
        } catch (err: any) {
            setError(`Failed to fetch transport damaged record: ${err.message}`);
        }
    };

    useEffect(() => {
        if (formType === 'update' && selectedId !== null) {
            fetchTransportDamagedForUpdate(selectedId.accidentId, selectedId.transportId);
        }
    }, [selectedId]);

    useEffect(() => {
        if (formData.didRunAway === false) {
            setFormData((prevState:any) => ({ ...prevState, found: null }));
        }
    }, [formData.didRunAway]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Transports Damaged In Accident</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>Accident ID</th>
                    <th>Transport ID</th>
                    <th>Did Run Away</th>
                    <th>Found</th>
                </tr>
                </thead>
                <tbody>
                {transportsDamaged.map((transport) => (
                    <tr key={`${transport.accidentId}-${transport.transportId}`}>
                        <td>{transport.accidentId}</td>
                        <td>{transport.transportId}</td>
                        <td>{transport.didRunAway ? 'Yes' : 'No'}</td>
                        <td>{transport.found === null ? '-' : transport.found ? 'Yes' : 'No'}</td>
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
                                value={formData.accidentId || ''}
                                onChange={(e) => setFormData({ ...formData, accidentId: parseInt(e.target.value) })}
                            >
                                <option value="">Выберите аварию</option>
                                {accidents.map(accident => (
                                    <option key={accident.id} value={accident.id}>{accident.id}</option>
                                ))}
                            </select>
                            <select
                                className="styled-select"
                                value={formData.transportId || ''}
                                onChange={(e) => setFormData({ ...formData, transportId: parseInt(e.target.value) })}
                            >
                                <option value="">Выберите транспорт</option>
                                {transportNumbers.map(number => (
                                    <option key={number.id} value={number.id}>{[number.id, ', ', number.number]}</option>
                                ))}
                            </select>
                            <select
                                className="styled-select"
                                value={formData.didRunAway !== undefined ? formData.didRunAway.toString() : ''}
                                onChange={(e) => setFormData({ ...formData, didRunAway: e.target.value === 'true' })}
                            >
                                <option value="">Did Run Away?</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                            {formData.didRunAway && (
                                <select
                                    className="styled-select"
                                    value={formData.found !== undefined ? formData.found?.toString() : ''}
                                    onChange={(e) => setFormData({ ...formData, found: e.target.value === 'true' })}
                                >
                                    <option value="">Found?</option>
                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            )}
                        </div>
                    )}
                    {formType === 'delete' && (
                        <div>
                            <h3>Удалить запись</h3>
                            <div className="select-wrapper">
                                <select
                                    className="select-input"
                                    value={selectedId ? `${selectedId.accidentId}-${selectedId.transportId}` : ''}
                                    onChange={(e) => {
                                        const [accidentId, transportId] = e.target.value.split('-').map(Number);
                                        setSelectedId({ accidentId, transportId });
                                    }}
                                >
                                    <option value="">Выберите ID</option>
                                    {transportsDamaged.map(({ accidentId, transportId }) => (
                                        <option key={`${accidentId}-${transportId}`} value={`${accidentId}-${transportId}`}>
                                            {`Accident: ${accidentId}, Transport: ${transportId}`}
                                        </option>
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
                                    value={selectedId ? `${selectedId.accidentId}-${selectedId.transportId}` : ''}
                                    onChange={(e) => {
                                        const [accidentId, transportId] = e.target.value.split('-').map(Number);
                                        setSelectedId({ accidentId, transportId });
                                    }}
                                >
                                    <option value="">Выберите ID</option>
                                    {transportsDamaged.map(({ accidentId, transportId }) => (
                                        <option key={`${accidentId}-${transportId}`} value={`${accidentId}-${transportId}`}>
                                            {`Accident: ${accidentId}, Transport: ${transportId}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {selectedId && (
                                <div>
                                    <select
                                        className="styled-select"
                                        value={formData.didRunAway !== undefined ? formData.didRunAway.toString() : ''}
                                        onChange={(e) => setFormData({ ...formData, didRunAway: e.target.value === 'true' })}
                                    >
                                        <option value="">Did Run Away?</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                    {formData.didRunAway && (
                                        <select
                                            className="styled-select"
                                            value={formData.found !== undefined ? formData.found?.toString() : ''}
                                            onChange={(e) => setFormData({ ...formData, found: e.target.value === 'true' })}
                                        >
                                            <option value="">Found?</option>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    )}
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

export default TransportsDamagedInAccident;

