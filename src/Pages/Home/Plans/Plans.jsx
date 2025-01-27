// src/components/Plans.js
import React from 'react';

const Plans = () => {
  return (
    <section className="plans py-16">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-bold mb-8">Choose Your Plan</h3>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold mb-4">Basic Plan</h4>
            <p className="mb-4">Access to basic articles</p>
            <p className="text-xl font-semibold">$5/month</p>
            <button className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-lg">Subscribe</button>
          </div>
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold mb-4">Premium Plan</h4>
            <p className="mb-4">Access to all articles and exclusive content</p>
            <p className="text-xl font-semibold">$15/month</p>
            <button className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-lg">Subscribe</button>
          </div>
          <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md">
            <h4 className="text-2xl font-bold mb-4">Enterprise Plan</h4>
            <p className="mb-4">For businesses and large teams</p>
            <p className="text-xl font-semibold">Contact us</p>
            <button className="mt-4 bg-orange-500 text-white py-2 px-6 rounded-lg">Inquire</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
