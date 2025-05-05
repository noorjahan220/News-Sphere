import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Subscription = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const subscriptionOptions = [
    { value: '1', label: '1 Month', price: 9.99, description: 'Perfect for quick trial and exploration.' },
    { value: '5', label: '5 Months', price: 39.99, description: 'Ideal for short-term premium access.' },
    { value: '10', label: '10 Months', price: 79.99, description: 'Best value for long-term premium features.' },
  ];

  const [selectedOption, setSelectedOption] = useState(subscriptionOptions[0]);

  const handleSubscription = async () => {
    try {
      const response = await axiosSecure.patch('/update-subscription', {
        subscriptionPeriod: selectedOption.value,
      });

      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'Proceed to Payment',
        background: '#1f2937',
        color: '#f3f4f6',
        confirmButtonColor: '#d97706',
      }).then(() => {
        queryClient.invalidateQueries(['subscriptionStatus']);
        navigate('/payment', { 
          state: { 
            selectedPeriod: selectedOption.value, 
            price: selectedOption.price 
          } 
        });
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error updating subscription, please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        background: '#1f2937',
        color: '#f3f4f6',
        confirmButtonColor: '#d97706',
      });
      console.error('Error updating subscription:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 p-6">
      <div className="w-full max-w-4xl">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-400 text-white text-center py-12 rounded-t-xl shadow-lg mb-6 border border-amber-500/30">
          <h1 className="text-4xl font-bold sm:text-5xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-white">
              Upgrade to Premium
            </span>
          </h1>
          <p className="text-md sm:text-lg mt-4 text-gray-100">
            Unlock exclusive content and features with a premium subscription!
          </p>
          <div className="mt-6">
            <span className="font-extrabold text-xl text-white">Get Started</span>
          </div>
        </div>

        {/* Subscription Plan Section */}
        <div className="p-6 sm:p-8 bg-zinc-800 shadow-lg rounded-lg border border-zinc-700">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Select Subscription Plan
          </h2>
          
          <div className="mb-6">
            <select
              value={selectedOption.value}
              onChange={(e) => setSelectedOption(subscriptionOptions.find(option => option.value === e.target.value))}
              className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              {subscriptionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - ${option.price}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6 p-4 bg-zinc-700 rounded-lg border border-zinc-600">
            <p className="text-gray-300 mb-3">{selectedOption.description}</p>
            <p className="text-white text-lg sm:text-xl font-medium">
              Price: <span className="font-bold text-amber-400">${selectedOption.price}</span>
            </p>
          </div>

          <button
            onClick={handleSubscription}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-white py-3 px-6 rounded-lg font-semibold 
                     hover:from-amber-700 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl
                     focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-zinc-800"
          >
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;