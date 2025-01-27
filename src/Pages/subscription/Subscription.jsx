import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';  

const Subscription = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const subscriptionOptions = [
    { value: '1', label: '1 Minute', price: 1, description: 'Perfect for quick trial and exploration.' },
    { value: '5', label: '5 Days', price: 10, description: 'Ideal for short-term premium access.' },
    { value: '10', label: '10 Days', price: 20, description: 'Best value for long-term premium features.' },
  ];

  const [selectedOption, setSelectedOption] = useState(subscriptionOptions[0]);

  const handleSubscription = async () => {
    try {
      const response = await axiosSecure.patch('/update-subscription', {
        subscriptionPeriod: selectedOption.value,
      });
  
      alert(response.data.message);
      navigate('/payment', { state: { selectedPeriod: selectedOption.value, price: selectedOption.price } });
    } catch (error) {
      alert('Error updating subscription, please try again.');
      console.error('Error updating subscription:', error);
    }
  };
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl w-full">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-8 rounded-t-xl shadow-xl">
          <h1 className="text-4xl font-bold">Upgrade to Premium</h1>
          <p className="text-lg mt-2">Choose a plan and enjoy exclusive articles and features!</p>
        </div>
        <div className="p-8 bg-white shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Subscription Plan</h2>
          <select
            value={selectedOption.value}
            onChange={(e) => setSelectedOption(subscriptionOptions.find(option => option.value === e.target.value))}
            className="mb-4 px-4 py-2 border rounded-lg text-gray-800"
          >
            {subscriptionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="mb-4">
            <p className="text-gray-600 mb-2">{selectedOption.description}</p>
            <p className="text-gray-800 text-lg font-medium">Price: <span className="font-bold">${selectedOption.price}</span></p>
          </div>
          <button
            onClick={handleSubscription}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
          >
            Choose Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
