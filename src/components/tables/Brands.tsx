import React, { useEffect, useState } from 'react';
import { getBrands } from '../../services/tableService';

interface Brand {
    id: number;
    name: string;
}

const Brands: React.FC = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
        </div>
    );
};

export default Brands;
