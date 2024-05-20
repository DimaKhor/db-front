import React, { useEffect, useState } from 'react';
import { getTransportNumberDirectory, getTransportTypes, getPersons, getOrganizations, getBrands, getColors } from '../../services/tableService';
import { getTransportNumberById, createTransportNumber, updateTransportNumber, deleteTransportNumber } from '../../services/transportnumberdirectoryService';

interface TransportNumber {
    id: number;
    transportTypeId: string;
    personId: string;
    organizationId?: string;
    brandId: string;
    colorId: string;
    issueDate: string;
    engineCapacity: number;
    engineId: string;
    chassisId: string;
    coachbuilderId: string;
    number: string;
}

const TransportNumberDirectory: React.FC = () => {
    const [transportNumbers, setTransportNumbers] = useState<TransportNumber[]>([]);
    const [transportTypes, setTransportTypes] = useState([]);
    const [persons, setPersons] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [brands, setBrands] = useState([]);
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formType, setFormType] = useState<'create' | 'update' | 'delete' | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const fetchTransportNumbers = async () => {
        try {
            const data = await getTransportNumberDirectory();
            setTransportNumbers(data);
        } catch (err: any) {
            setError(`Failed to fetch transport numbers: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedData = async () => {
        try {
            const [transportTypes, persons, organizations, brands, colors] = await Promise.all([
                getTransportTypes(),
                getPersons(),
                getOrganizations(),
                getBrands(),
                getColors(),
            ]);
            setTransportTypes(transportTypes);
            setPersons(persons);
            setOrganizations(organizations);
            setBrands(brands);
            setColors(colors);
        } catch (err: any) {
            setError(`Failed to fetch related data: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchTransportNumbers();
        fetchRelatedData();
    }, []);

    const today = new Date().toISOString().split('T')[0];

    const validateFormData = () => {
        if (!formData.transportTypeId || !formData.personId || !formData.brandId || !formData.colorId || !formData.issueDate || !formData.engineCapacity || !formData.engineId || !formData.chassisId || !formData.coachbuilderId || !formData.number) {
            setError('Все поля, кроме организации, обязательны для заполнения.');
            return false;
        }
        return true;
    };


    const handleSave = async () => {
        if (formData.engineCapacity <= 0) {
            setError("Engine capacity must be greater than zero.");
            return;
        }

        try {
            if (formType === 'create') {
                if (!validateFormData()) return;
                await createTransportNumber(formData);
            } else if (formType === 'update' && selectedId !== null) {
                if (!validateFormData()) return;
                await updateTransportNumber(selectedId, formData);
            } else if (formType === 'delete' && selectedId !== null) {
                await deleteTransportNumber(selectedId);
            }
            setFormType(null);
            setFormData({});
            setSelectedId(null);
            await fetchTransportNumbers();
            setError(null);
        } catch (err: any) {
            let errorMessage = '';
            if (err.response && err.response.data && err.response.data.error) {
                switch (formType) {
                    case 'create':
                        errorMessage = `Failed to create transport number: ${err.response.data.error}`;
                        break;
                    case 'update':
                        errorMessage = `Failed to update transport number: ${err.response.data.error}`;
                        break;
                    case 'delete':
                        errorMessage = `Failed to delete transport number: ${err.response.data.error}`;
                        break;
                    default:
                        errorMessage = `Error: ${err.message}`;
                }
            } else if (err.message) {
                errorMessage = `Error: ${err.message}`;
            } else {
                errorMessage = 'An unexpected error occurred.';
            }
            setError(errorMessage);
        }
    };

    const fetchTransportNumberForUpdate = async (id: number) => {
        try {
            const transportNumber = await getTransportNumberById(id);
            setFormData({
                ...transportNumber,
                issueDate: new Date(transportNumber.issueDate).toISOString().split('T')[0]
            });
        } catch (err: any) {
            setError(`Failed to fetch transport number: ${err.message}`);
        }
    };

    useEffect(() => {
        if (formType === 'update' && selectedId !== null) {
            fetchTransportNumberForUpdate(selectedId);
        }
    }, [selectedId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Transport Number Directory</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Transport Type</th>
                    <th>Person</th>
                    <th>Organization</th>
                    <th>Brand</th>
                    <th>Color</th>
                    <th>Issue Date</th>
                    <th>Engine Capacity</th>
                    <th>Engine ID</th>
                    <th>Chassis ID</th>
                    <th>Coachbuilder ID</th>
                    <th>Number</th>
                </tr>
                </thead>
                <tbody>
                {transportNumbers.map((transportNumber) => (
                    <tr key={transportNumber.id}>
                        <td>{transportNumber.id}</td>
                        <td>{transportNumber.transportTypeId}</td>
                        <td>{transportNumber.personId}</td>
                        <td>{transportNumber.organizationId || '-'}</td>
                        <td>{transportNumber.brandId}</td>
                        <td>{transportNumber.colorId}</td>
                        <td>{new Date(transportNumber.issueDate).toLocaleDateString()}</td>
                        <td>{transportNumber.engineCapacity}</td>
                        <td>{transportNumber.engineId}</td>
                        <td>{transportNumber.chassisId}</td>
                        <td>{transportNumber.coachbuilderId}</td>
                        <td>{transportNumber.number}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="actions">
                <button onClick={() => setFormType('create')}>Добавить запись</button>
                <button onClick={() => setFormType('delete')}>Удалить запись</button>
                <button onClick={() => setFormType('update')}>Изменить запись</button>
            </div>
            {formType && (
                <div className="form-container">
                    {formType === 'create' && (
                        <div>
                            <h3>Добавить запись</h3>
                            <select
                                className="styled-select"
                                value={formData.transportTypeId || ''}
                                onChange={(e) => setFormData({...formData, transportTypeId: e.target.value})}
                            >
                                <option value="">Выберите тип транспорта</option>
                                {transportTypes.map((type: any) => (
                                    <option key={type.id} value={type.id}>{[type.id, ', ', type.name]}</option>
                                ))}
                            </select>
                            <select
                                className="styled-select"
                                value={formData.personId || ''}
                                onChange={(e) => setFormData({...formData, personId: e.target.value})}
                            >
                                <option value="">Выберите человека</option>
                                {persons.map((person: any) => (
                                    <option key={person.id}
                                            value={person.id}>{[person.id, ', ', person.name, ' ', person.lastname, ' ', person.fathername]}</option>
                                ))}
                            </select>
                            <select
                                className="styled-select"
                                value={formData.organizationId || ''}
                                onChange={(e) => setFormData({...formData, organizationId: e.target.value})}
                            >
                                <option value="">Выберите организацию</option>
                                {organizations.map((org: any) => (
                                    <option key={org.id} value={org.id}>{[org.id, ', ', org.name]}</option>
                                ))}
                            </select>
                            <select
                                className="styled-select"
                                value={formData.brandId || ''}
                                onChange={(e) => setFormData({...formData, brandId: e.target.value})}
                            >
                                <option value="">Выберите марку</option>
                                {brands.map((brand: any) => (
                                    <option key={brand.id} value={brand.id}>{[brand.id, ', ', brand.name]}</option>
                                ))}
                            </select>
                            <select
                                className="styled-select"
                                value={formData.colorId || ''}
                                onChange={(e) => setFormData({...formData, colorId: e.target.value})}
                            >
                                <option value="">Выберите цвет</option>
                                {colors.map((color: any) => (
                                    <option key={color.id} value={color.id}>{[color.id, ', ', color.name]}</option>
                                ))}
                            </select>
                            <input
                                type="date"
                                max={today}
                                placeholder="Дата выпуска"
                                value={formData.issueDate || ''}
                                onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                            />
                            <input
                                type="number"
                                placeholder="Объем двигателя"
                                value={formData.engineCapacity || ''}
                                onChange={(e) => setFormData({...formData, engineCapacity: e.target.value})}
                                min="1"
                            />
                            <input
                                type="text"
                                placeholder="ID двигателя"
                                value={formData.engineId || ''}
                                onChange={(e) => setFormData({...formData, engineId: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="ID шасси"
                                value={formData.chassisId || ''}
                                onChange={(e) => setFormData({...formData, chassisId: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="ID кузова"
                                value={formData.coachbuilderId || ''}
                                onChange={(e) => setFormData({...formData, coachbuilderId: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Номер"
                                value={formData.number || ''}
                                onChange={(e) => setFormData({...formData, number: e.target.value})}
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
                                    {transportNumbers.map(transportNumber => (
                                        <option key={transportNumber.id}
                                                value={transportNumber.id}>{transportNumber.id}</option>
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
                                    {transportNumbers.map(transportNumber => (
                                        <option key={transportNumber.id}
                                                value={transportNumber.id}>{transportNumber.id}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedId && (
                                <div>
                                    <select
                                        className="styled-select"
                                        value={formData.transportTypeId || ''}
                                        onChange={(e) => setFormData({...formData, transportTypeId: e.target.value})}
                                    >
                                        <option value="">Выберите тип транспорта</option>
                                        {transportTypes.map((type: any) => (
                                            <option key={type.id} value={type.id}>{[type.id, ', ', type.name]}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="styled-select"
                                        value={formData.personId || ''}
                                        onChange={(e) => setFormData({...formData, personId: e.target.value})}
                                    >
                                        <option value="">Выберите человека</option>
                                        {persons.map((person: any) => (
                                            <option key={person.id}
                                                    value={person.id}>{[person.id, ', ', person.name, ' ', person.lastname, ' ', person.fathername]}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="styled-select"
                                        value={formData.organizationId || ''}
                                        onChange={(e) => setFormData({...formData, organizationId: e.target.value})}
                                    >
                                        <option value="">Выберите организацию</option>
                                        {organizations.map((org: any) => (
                                            <option key={org.id} value={org.id}>{[org.id, ', ', org.name]}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="styled-select"
                                        value={formData.brandId || ''}
                                        onChange={(e) => setFormData({...formData, brandId: e.target.value})}
                                    >
                                        <option value="">Выберите марку</option>
                                        {brands.map((brand: any) => (
                                            <option key={brand.id} value={brand.id}>{[brand.id, ', ', brand.name]}</option>
                                        ))}
                                    </select>
                                    <select
                                        className="styled-select"
                                        value={formData.colorId || ''}
                                        onChange={(e) => setFormData({...formData, colorId: e.target.value})}
                                    >
                                        <option value="">Выберите цвет</option>
                                        {colors.map((color: any) => (
                                            <option key={color.id} value={color.id}>{[color.id, ', ', color.name]}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="date"
                                        max={today}
                                        placeholder="Дата выпуска"
                                        value={formData.issueDate || ''}
                                        onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Объем двигателя"
                                        value={formData.engineCapacity || ''}
                                        onChange={(e) => setFormData({...formData, engineCapacity: e.target.value})}
                                        min="1"
                                    />
                                    <input
                                        type="text"
                                        placeholder="ID двигателя"
                                        value={formData.engineId || ''}
                                        onChange={(e) => setFormData({...formData, engineId: e.target.value})}
                                    />
                                    <input
                                        type="text"
                                        placeholder="ID шасси"
                                        value={formData.chassisId || ''}
                                        onChange={(e) => setFormData({...formData, chassisId: e.target.value})}
                                    />
                                    <input
                                        type="text"
                                        placeholder="ID кузова"
                                        value={formData.coachbuilderId || ''}
                                        onChange={(e) => setFormData({...formData, coachbuilderId: e.target.value})}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Номер"
                                        value={formData.number || ''}
                                        onChange={(e) => setFormData({...formData, number: e.target.value})}
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

export default TransportNumberDirectory;
