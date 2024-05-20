import React, { useEffect, useState } from 'react';
import { getOrganizations } from '../../services/tableService';
import { getOrganizationById, addOrganization, updateOrganization, deleteOrganization } from '../../services/organizationsService';

interface Organization {
    id: number;
    name: string;
    area: string;
    street?: string;
    building?: string;
    headLastName: string;
    headName: string;
    headFatherName?: string;
}

const Organizations: React.FC = () => {
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formType, setFormType] = useState<'create' | 'update' | 'delete' | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const fetchOrganizations = async () => {
        try {
            const data = await getOrganizations();
            setOrganizations(data);
        } catch (err: any) {
            setError(`Failed to fetch organizations: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const handleSave = async () => {
        try {
            if (formType === 'create') {
                const isValid = validateFormData(formData);
                if (!isValid) {
                    setError('Заполните поля name, area, headname, headlastname.');
                    return;
                }
                await addOrganization(formData);
            } else if (formType === 'update' && selectedId !== null) {
                const isValid = validateFormData(formData);
                if (!isValid) {
                    setError('Заполните поля name, area, headname, headlastname.');
                    return;
                }
                await updateOrganization(selectedId, formData);
            } else if (formType === 'delete' && selectedId !== null) {
                await deleteOrganization(selectedId);
            }
            setFormType(null);
            setFormData({});
            setSelectedId(null);
            await fetchOrganizations();
            setError(null);
        } catch (err: any) {
            setError(`${err.message}`);
        }
    };

    const validateFormData = (data: Organization): boolean => {
        if (!data.name || !data.area || !data.headLastName || !data.headName) {
            return false;
        }
        return true;
    };

    const fetchOrganizationForUpdate = async (id: number) => {
        try {
            const organization = await getOrganizationById(id);
            setFormData(organization);
        } catch (err: any) {
            setError(`Failed to fetch organization: ${err.message}`);
        }
    };

    useEffect(() => {
        if (formType === 'update' && selectedId !== null) {
            fetchOrganizationForUpdate(selectedId);
        }
    }, [selectedId]);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="table-container">
            <h2>Organizations</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Area</th>
                    <th>Street</th>
                    <th>Building</th>
                    <th>Head Last Name</th>
                    <th>Head Name</th>
                    <th>Head Father Name</th>
                </tr>
                </thead>
                <tbody>
                {organizations.map((organization) => (
                    <tr key={organization.id}>
                        <td>{organization.id}</td>
                        <td>{organization.name}</td>
                        <td>{organization.area}</td>
                        <td>{organization.street || '-'}</td>
                        <td>{organization.building || '-'}</td>
                        <td>{organization.headLastName}</td>
                        <td>{organization.headName}</td>
                        <td>{organization.headFatherName || '-'}</td>
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
                                placeholder="Name"
                                value={formData.name || ''}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Area"
                                value={formData.area || ''}
                                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Street"
                                value={formData.street || ''}
                                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Building"
                                value={formData.building || ''}
                                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Head Last Name"
                                value={formData.headLastName || ''}
                                onChange={(e) => setFormData({ ...formData, headLastName: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Head Name"
                                value={formData.headName || ''}
                                onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Head Father Name"
                                value={formData.headFatherName || ''}
                                onChange={(e) => setFormData({ ...formData, headFatherName: e.target.value })}
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
                                    {organizations.map(organization => (
                                        <option key={organization.id} value={organization.id}>{organization.id}</option>
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
                                    {organizations.map(organization => (
                                        <option key={organization.id} value={organization.id}>{organization.id}</option>
                                    ))}
                                </select>
                            </div>
                            {selectedId && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Area"
                                        value={formData.area || ''}
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Street"
                                        value={formData.street || ''}
                                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Building"
                                        value={formData.building || ''}
                                        onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Head Last Name"
                                        value={formData.headLastName || ''}
                                        onChange={(e) => setFormData({ ...formData, headLastName: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Head Name"
                                        value={formData.headName || ''}
                                        onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Head Father Name"
                                        value={formData.headFatherName || ''}
                                        onChange={(e) => setFormData({ ...formData, headFatherName: e.target.value })}
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

export default Organizations;
