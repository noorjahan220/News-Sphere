import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const CheckoutForm = ({ price , onPaymentSuccess}) => {
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
        console.log("Amount to be paid:", price * 100)
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
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border rounded-lg p-4 bg-gray-50">
                <CardElement className="p-2" />
            </div>
            {paymentError && <div className="text-red-500 text-sm">{paymentError}</div>}
            <button
                type="submit"
                disabled={processing || !stripe || !clientSecret}
                className={`w-full py-2 px-4 rounded-lg text-white ${
                    processing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {processing ? 'Processing...' : `Pay $${price}`}
            </button>
            {paymentError && <p className='text-red-600'>{paymentError}</p>}
        </form>
    );
};

export default CheckoutForm;
