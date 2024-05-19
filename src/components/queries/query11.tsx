import React, { useState, useEffect } from 'react';
import { findMostPopularSignaling, findMostStolenBrandNames } from '../../services/queryService';

interface MostPopularSignaling {
    mostPopularSignaling: string;
}

interface MostStolenBrand {
    mostStolenBrand: string;
}

const Query11: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const [mostPopularSignaling, setMostPopularSignaling] = useState<string[]>([]);
    const [mostStolenBrand, setMostStolenBrand] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const signalingData = await findMostPopularSignaling();
                setMostPopularSignaling(signalingData);
            } catch (error: any) {
                setError(`Ошибка при получении данных: ${error.message}`);
            }

            try {
                const brandData = await findMostStolenBrandNames();
                setMostStolenBrand(brandData);
            } catch (error: any) {
                setError(`Ошибка при получении данных: ${error.message}`);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="form-container">
            {error && <div className="error-message">{error}</div>}
            <div className="results">
                <h2>Самые угоняемые марки машин</h2>
                <table className="result-table">
                    <thead>
                    <tr>
                        <th>Марки машин</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mostStolenBrand.map((brand, index) => (
                        <tr key={index}>
                            <td>{brand}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <h2 className="margin">Самые надежные сигнализации</h2>
                <table className="result-table">
                    <thead>
                    <tr>
                        <th>Cигнализации</th>
                    </tr>
                    </thead>
                    <tbody>
                    {mostPopularSignaling.map((signaling, index) => (
                        <tr key={index}>
                            <td>{signaling}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Query11;
