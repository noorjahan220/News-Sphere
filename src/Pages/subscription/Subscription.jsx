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
    { value: '1', label: '1 Minute', price: 1, description: 'Perfect for quick trial and exploration.' },
    { value: '5', label: '5 Days', price: 10, description: 'Ideal for short-term premium access.' },
    { value: '10', label: '10 Days', price: 20, description: 'Best value for long-term premium features.' },
  ];

  const [selectedOption, setSelectedOption] = useState(subscriptionOptions[0]);

  const handleSubscription = async () => {
    try {
      // Update the subscription status on the backend
      const response = await axiosSecure.patch('/update-subscription', {
        subscriptionPeriod: selectedOption.value,
      });

      // Show success SweetAlert
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'Proceed to Payment',
      }).then(() => {
        // Invalidate the subscription status query to refresh data
        queryClient.invalidateQueries(['subscriptionStatus']);
        // Navigate to payment page
        navigate('/payment', { state: { selectedPeriod: selectedOption.value, price: selectedOption.price } });
      });
    } catch (error) {
      // Show error SweetAlert
      Swal.fire({
        title: 'Error!',
        text: 'Error updating subscription, please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again',
      });
      console.error('Error updating subscription:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-4xl">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-teal-400 to-blue-500 text-white text-center py-12 rounded-t-xl shadow-lg mb-6">
          <h1 className="text-4xl font-bold sm:text-5xl">Upgrade to Premium</h1>
          <p className="text-md sm:text-lg mt-4">Unlock exclusive content and features with a premium subscription!</p>
          <div className="mt-6">
            <span className='font-extrabold text-xl'> Get Started</span>
             
            
          </div>
        </div>

        {/* Subscription Plan Section */}
        <div className="p-6 sm:p-8 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Select Subscription Plan</h2>
          
          <select
            value={selectedOption.value}
            onChange={(e) => setSelectedOption(subscriptionOptions.find(option => option.value === e.target.value))}
            className="mb-4 px-4 py-2 w-full sm:w-auto border rounded-lg text-gray-800"
          >
            {subscriptionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="mb-4">
            <p className="text-gray-600 mb-2">{selectedOption.description}</p>
            <p className="text-gray-800 text-lg sm:text-xl font-medium">
              Price: <span className="font-bold">${selectedOption.price}</span>
            </p>
          </div>

          <button
            onClick={handleSubscription}
            className=" bg-gradient-to-r from-teal-400 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold 
                         hover:from-teal-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
