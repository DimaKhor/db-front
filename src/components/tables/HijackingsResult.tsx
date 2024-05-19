import React, { useEffect, useState } from 'react';
import { getHijackingsResult } from '../../services/tableService';

interface HijackingResult {
    id: number;
    resultName: string;
}

const HijackingsResult: React.FC = () => {
    const [hijackingResults, setHijackingResults] = useState<HijackingResult[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHijackingResults = async () => {
            try {
                const data = await getHijackingsResult();
                setHijackingResults(data);
            } catch (err: any) {
                setError(`Failed to fetch hijacking results: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchHijackingResults();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="table-container">
            <h2>Hijackings Result</h2>
            <table className="data-table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {hijackingResults.map((result) => (
                    <tr key={result.id}>
                        <td>{result.id}</td>
                        <td>{result.resultName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default HijackingsResult;
