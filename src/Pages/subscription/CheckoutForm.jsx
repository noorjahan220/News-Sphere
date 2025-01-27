import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);

    useEffect(() => {
        // Fetch the client secret from the backend
        fetch('/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: price * 100 }), // Amount in cents
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
            .catch((err) => console.error(err));
    }, [price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);

        const card = elements.getElement(CardElement);
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: { card },
        });

        if (error) {
            setError(error.message);
            setProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
            setSucceeded(true);
            setProcessing(false);
            setError(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border rounded-lg p-4 bg-gray-50">
                <CardElement className="p-2" />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
                type="submit"
                disabled={processing || !stripe || !clientSecret}
                className={`w-full py-2 px-4 rounded-lg text-white ${
                    processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {processing ? 'Processing...' : `Pay $${price}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
