import React, { useEffect, useState } from 'react';
import { getPersons } from '../../services/tableService';

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

const User: React.FC = () => {
    const [persons, setPersons] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

        fetchPersons();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
        </div>
    );
};

export default User;
