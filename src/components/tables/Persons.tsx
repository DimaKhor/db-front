import React, { useEffect, useState } from 'react';
import { getPersons } from '../../services/tableService';
import { getPersonById, addPerson, updatePerson, deletePerson } from '../../services/personsService';

interface Person {
    id: number;
    lastname: string;
    name: string;
    fathername?: string;
    city: string;
    street?: string;
    house?: string;
    apartment?: number;
}

const Persons: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formType, setFormType] = useState<'create' | 'update' | 'delete' | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const fetchPersons = async () => {
        try {
            const data = await getPersons();
            setPersons(data);
        } catch (err: any) {
            setError(`Failed to fetch persons: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPersons();
    }, []);

    const validateFormData = () => {
        if (!formData.lastname || !formData.name || !formData.city) {
            setError('Фамилия, Имя и Город обязательны для заполнения.');
            return false;
        }
        return true;
    };

    const handleSave = async () => {
        try {
            if (formType === 'create') {
                if (!validateFormData()) return;
                await addPerson(formData);
            } else if (formType === 'update' && selectedId !== null) {
                if (!validateFormData()) return;
                await updatePerson(selectedId, formData);
            } else if (formType === 'delete' && selectedId !== null) {
                await deletePerson(selectedId);
            }
            setFormType(null);
            setFormData({});
            setSelectedId(null);
            await fetchPersons();
            setError(null);
        } catch (err: any) {
            setError(`Failed to ${formType}: ${err.message}`);
        }
    };

    const fetchPersonForUpdate = async (id: number) => {
        try {
            const person = await getPersonById(id);
            setFormData(person);
        } catch (err: any) {
            setError(`Failed to fetch person: ${err.message}`);
        }
    };

    useEffect(() => {
        if (formType === 'update' && selectedId !== null) {
            fetchPersonForUpdate(selectedId);
        }
    }, [selectedId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Persons</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Last Name</th>
                    <th>Name</th>
                    <th>Father Name</th>
                    <th>City</th>
                    <th>Street</th>
                    <th>House</th>
                    <th>Apartment</th>
                </tr>
                </thead>
                <tbody>
                {persons.map((person) => (
                    <tr key={person.id}>
                        <td>{person.id}</td>
                        <td>{person.lastname}</td>
                        <td>{person.name}</td>
                        <td>{person.fathername || '-'}</td>
                        <td>{person.city}</td>
                        <td>{person.street || '-'}</td>
                        <td>{person.house || '-'}</td>
                        <td>{person.apartment !== undefined ? person.apartment : '-'}</td>
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
                                placeholder="Фамилия"
                                value={formData.lastname || ''}
                                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Имя"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Отчество"
                                value={formData.fathername || ''}
                                onChange={(e) => setFormData({ ...formData, fathername: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Город"
                                value={formData.city || ''}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Улица"
                                value={formData.street || ''}
                                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Дом"
                                value={formData.house || ''}
                                onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Квартира"
                                value={formData.apartment || ''}
                                onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
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
                                    {persons.map(person => (
                                        <option key={person.id} value={person.id}>{person.id}</option>
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
                                    {persons.map(person => (
                                        <option key={person.id} value={person.id}>{person.id}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedId && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Фамилия"
                                        value={formData.lastname || ''}
                                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Имя"
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Отчество"
                                        value={formData.fathername || ''}
                                        onChange={(e) => setFormData({ ...formData, fathername: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Город"
                                        value={formData.city || ''}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Улица"
                                        value={formData.street || ''}
                                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Дом"
                                        value={formData.house || ''}
                                        onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Квартира"
                                        value={formData.apartment || ''}
                                        onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
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

export default Persons;
