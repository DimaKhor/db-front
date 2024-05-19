import React, { useEffect, useState } from 'react';
import { getColors } from '../../services/tableService';

interface Color {
    id: number;
    name: string;
}

const Colors: React.FC = () => {
    const [colors, setColors] = useState<Color[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
        </div>
    );
};

export default Colors;
