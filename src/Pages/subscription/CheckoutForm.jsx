import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = ({ price, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');
    const [paymentError, setPaymentError] = useState(null); // Renamed error state
    const [processing, setProcessing] = useState(false);
    const [succeeded, setSucceeded] = useState(false);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Fetch the client secret from the backend
        axiosSecure.post('/create-payment-intent', {
            amount: price * 100, // Amount in cents
        })
            .then((res) => setClientSecret(res.data.clientSecret)) // Corrected response handling
            .catch((err) => console.error(err));
    }, [price, axiosSecure]); // Added axiosSecure dependency

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
      
        setProcessing(true);
      
        const card = elements.getElement(CardElement);
        if (card === null) return;
      
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
      
        if (paymentMethodError) {
          setPaymentError(paymentMethodError.message);
          setProcessing(false);
          return;
        }
      
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

        if (error) {
          setPaymentError(error.message);
          setProcessing(false);
        } else if (paymentIntent.status === 'succeeded') {
          setSucceeded(true);
          setProcessing(false);
          setPaymentError(null);
      
          // Call the onPaymentSuccess callback if payment is successful
          if (onPaymentSuccess) {
            onPaymentSuccess();
          }
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Complete Your Payment</h2>
                
                <div className="border rounded-lg p-4 bg-gray-50">
                    <CardElement className="p-2" />
                </div>
                
                {paymentError && <div className="text-red-500 text-sm">{paymentError}</div>}

                <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-700">Amount: <strong>${price}</strong></span>
                    <button
                        type="submit"
                        disabled={processing || !stripe || !clientSecret}
                        className={`py-2 px-6 rounded-lg text-white font-medium w-full sm:w-auto ${
                            processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                        } transition-colors`}
                    >
                        {processing ? 'Processing...' : `Pay $${price}`}
                    </button>
                </div>

                {paymentError && <p className='text-red-600 text-center'>{paymentError}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;
