import React, { useState } from 'react';
import axios from 'axios';

const EmailDeliverability = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [senderEmail] = useState('arjunnagar579@gmail.com'); // Example sender email
    const [receiverEmail] = useState('ritzer565@gmail.com'); // Example receiver email
    const [emailContent] = useState('This is a test email to check if it goes to the Inbox or Spam.'); // Example email content
    const [error, setError] = useState('');

    const handleTestDeliverability = async () => {
        setLoading(true);
        setError('');
        setResult('');

        try {
            const response = await axios.post('http://localhost:3000/deliverability/test');
            setResult(response.data.message);
        } catch (err) {
            setError('Failed to test email deliverability. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Email Deliverability Test</h2>
            <button
                onClick={handleTestDeliverability}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Test Deliverability
            </button>

            {loading && (
                <div className="mt-4">
                    <p>Loading... Please wait.</p>
                    <p><strong>Sender Email:</strong> {senderEmail}</p>
                    <p><strong>Receiver Email:</strong> {receiverEmail}</p>
                    <p><strong>Email Content:</strong> {emailContent}</p>
                    {/* You can also display intermediate responses here if you have that data */}
                </div>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {result && (
                <div className="mt-4">
                    <h3 className="text-lg font-bold">Test Result:</h3>
                    <pre className="border border-gray-300 p-2">{result}</pre>
                </div>
            )}
        </div>
    );
};

export default EmailDeliverability;
