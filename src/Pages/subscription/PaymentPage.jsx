import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import Swal from 'sweetalert2';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_Pk);

const PaymentPage = () => {
    const location = useLocation();
    const { state } = location;
    const { selectedPeriod, price } = state || {};
    const navigate = useNavigate();

    const formatPeriod = (period) => {
        switch (period) {
            case '1':
                return '1 Month';
            case '5':
                return '5 Months';
            case '10':
                return '10 Months';
            default:
                return 'Unknown Period';
        }
    };

    const handlePaymentSuccess = () => {
        Swal.fire({
            title: 'Payment Successful!',
            text: 'Your subscription has been activated successfully.',
            icon: 'success',
            confirmButtonText: 'Okay',
            background: '#1f2937',
            color: '#f3f4f6',
            confirmButtonColor: '#d97706',
        }).then(() => {
            navigate('/');
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 p-6">
            <div className="max-w-lg w-full bg-zinc-800 shadow-lg rounded-xl p-8 space-y-6 border border-zinc-700">
                <h1 className="text-3xl font-bold text-center text-white mb-4">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-amber-300">
                        Complete Payment
                    </span>
                </h1>

                {price ? (
                    <>
                        <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600 mb-6">
                            <p className="text-lg text-gray-300 mb-2">
                                Subscription: <span className="font-semibold text-amber-400">{formatPeriod(selectedPeriod)}</span>
                            </p>
                            <p className="text-xl font-semibold text-white">
                                Total Amount: <span className="text-amber-400">${price}</span>
                            </p>
                        </div>

                        <div className="bg-zinc-700 p-6 rounded-lg border border-zinc-600">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm 
                                    price={price} 
                                    onPaymentSuccess={handlePaymentSuccess} 
                                />
                            </Elements>
                        </div>
                    </>
                ) : (
                    <div className="bg-zinc-700 p-4 rounded-lg border border-amber-500/30">
                        <p className="text-amber-400 font-medium text-center">
                            No subscription details found. Please select a plan first.
                        </p>
                        <button
                            onClick={() => navigate('/subscription')}
                            className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                        >
                            View Plans
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;