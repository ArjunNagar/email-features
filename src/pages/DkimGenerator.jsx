import React, { useState } from 'react';
import axios from 'axios';

const DkimGenerator = () => {
    const [selector, setSelector] = useState('');
    const [domain, setDomain] = useState('');
    const [keyLength, setKeyLength] = useState(2048);
    const [dkimRecord, setDkimRecord] = useState('');
    const [privateKey, setPrivateKey] = useState('');
    const [error, setError] = useState('');

    const handleGenerate = async (e) => {
        e.preventDefault();
        setError(''); // Reset any previous errors

        try {
            const response = await axios.post('http://localhost:3000/dkim/generate', {
                selector,
                domain,
                keyLength,
            });
            
            setDkimRecord(response.data.dkimRecord);
            setPrivateKey(response.data.privateKey);
        } catch (err) {
            setError('Failed to generate DKIM record. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">DKIM Generator</h2>
            <form onSubmit={handleGenerate} className="space-y-4">
                <div>
                    <label className="block mb-2">Selector:</label>
                    <input
                        type="text"
                        value={selector}
                        onChange={(e) => setSelector(e.target.value)}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Domain:</label>
                    <input
                        type="text"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Key Length:</label>
                    <select
                        value={keyLength}
                        onChange={(e) => setKeyLength(Number(e.target.value))}
                        className="border border-gray-300 p-2 w-full"
                    >
                        <option value={1024}>1024</option>
                        <option value={2048}>2048</option>
                        <option value={4096}>4096</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Generate DKIM Record
                </button>
            </form>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {dkimRecord && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Generated DKIM Record:</h3>
                    <pre className="border border-gray-300 p-2">{dkimRecord}</pre>
                </div>
            )}

            {privateKey && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Private Key:</h3>
                    <pre className="border border-gray-300 p-2">{privateKey}</pre>
                </div>
            )}
        </div>
    );
};

export default DkimGenerator;
