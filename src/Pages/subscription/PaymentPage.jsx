import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Swal from 'sweetalert2';
// TODO: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk); // Replace with your Stripe publishable key

const PaymentPage = () => {
    const location = useLocation();
    const { state } = location;
    const { selectedPeriod, price } = state || {}; // Extract subscription details
    const navigate =useNavigate()
    // Function to format selectedPeriod into readable text
    const formatPeriod = (period) => {
        switch (period) {
            case '1':
                return '1 Minute';
            case '5':
                return '5 Days';
            case '10':
                return '10 Days';
            default:
                return 'Unknown Period'; // Fallback for invalid or missing periods
        }
    };
    const handlePaymentSuccess = () => {
        // Show a SweetAlert success message
        Swal.fire({
            title: 'Payment Successful!',
            text: 'Your subscription has been activated successfully.',
            icon: 'success',
            confirmButtonText: 'Okay',
        }).then(() => {
            navigate('/'); // Redirect to the home page or any other page after success
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Complete Your Payment</h1>

                {price ? (
                    <>
                        <p className="text-lg text-gray-700 mb-4">
                            You have selected a subscription for <strong>{formatPeriod(selectedPeriod)}</strong>.
                        </p>
                        <p className="text-xl font-semibold text-gray-800 mb-6">
                            Amount to Pay: <span className="text-blue-600">${price}</span>
                        </p>

                        <Elements stripe={stripePromise}>
                            <CheckoutForm price={price} onPaymentSuccess={handlePaymentSuccess}  />
                        </Elements>
                    </>
                ) : (
                    <p className="text-red-500 font-medium">No subscription details found. Please go back and select a plan.</p>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;
