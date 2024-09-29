import React, { useState } from 'react';
import axios from 'axios';

const DmarcGenerator = () => {
    const [domain, setDomain] = useState('');
    const [policy, setPolicy] = useState('none');
    const [rua, setRUA] = useState('');
    const [ruf, setRUF] = useState('');
    const [subdomainPolicy, setSubdomainPolicy] = useState('');
    const [dkimAlignment, setDKIMAlignment] = useState('r');
    const [spfAlignment, setSPFAlignment] = useState('r');
    const [generatedRecord, setGeneratedRecord] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:3000/dmarc/generate', {
                domain,
                policy,
                rua,
                ruf,
                subdomainPolicy,
                dkimAlignment,
                spfAlignment
            });
            setGeneratedRecord(response.data);
        } catch (err) {
            setError('Error generating DMARC record');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10 p-5 border rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">DMARC Record Generator</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="domain">Domain:</label>
                    <input
                        type="text"
                        id="domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="policy">Policy:</label>
                    <select
                        id="policy"
                        value={policy}
                        onChange={(e) => setPolicy(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="none">none</option>
                        <option value="quarantine">quarantine</option>
                        <option value="reject">reject</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="rua">RUA Email:</label>
                    <input
                        type="email"
                        id="rua"
                        value={rua}
                        onChange={(e) => setRUA(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="ruf">RUF Email:</label>
                    <input
                        type="email"
                        id="ruf"
                        value={ruf}
                        onChange={(e) => setRUF(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="subdomainPolicy">Subdomain Policy:</label>
                    <select
                        id="subdomainPolicy"
                        value={subdomainPolicy}
                        onChange={(e) => setSubdomainPolicy(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select...</option>
                        <option value="none">none</option>
                        <option value="quarantine">quarantine</option>
                        <option value="reject">reject</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="dkimAlignment">DKIM Alignment:</label>
                    <select
                        id="dkimAlignment"
                        value={dkimAlignment}
                        onChange={(e) => setDKIMAlignment(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="s">Strict (s)</option>
                        <option value="r">Relaxed (r)</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2" htmlFor="spfAlignment">SPF Alignment:</label>
                    <select
                        id="spfAlignment"
                        value={spfAlignment}
                        onChange={(e) => setSPFAlignment(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="s">Strict (s)</option>
                        <option value="r">Relaxed (r)</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className={`w-full p-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    disabled={loading}
                >
                    {loading ? 'Generating...' : 'Generate DMARC Record'}
                </button>
            </form>
            {generatedRecord && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Generated DMARC Record:</h3>
                    <p className="text-xl">{generatedRecord}</p>
                </div>
            )}
            {error && (
                <div className="mt-4 text-red-500">
                    {error}
                </div>
            )}
        </div>
    );
};

export default DmarcGenerator;
