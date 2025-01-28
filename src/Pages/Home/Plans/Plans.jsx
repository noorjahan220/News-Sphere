import React from 'react';
import { useNavigate } from 'react-router-dom';

const Plans = () => {
  const navigate = useNavigate();
  const plans = [
    {
      title: "1 minute Trial",
      price: "1$",
      duration: "1 minute Access",
      features: [
        "Basic Articles Access",
        "Limited Premium Content",
        "Ad-supported Experience",
        "Single Device Access"
      ],
      gradient: "from-teal-400 to-blue-500",
      popular: false
    },
    {
      title: "Premium Plan",
      price: "$10",
      duration: "5 Days Access",
      features: [
        "All Premium Articles",
        "Ad-free Experience",
        "Multiple Device Access",
        "Early Content Access",
        "Priority Support"
      ],
      gradient: "from-purple-400 to-indigo-500",
      popular: true
    },
    {
      title: "Pro Plan",
      price: "$20",
      duration: "10 Days Access",
      features: [
        "All Premium Features",
        "4K Media Access",
        "Team Access (Up to 5 users)",
        "Advanced Analytics",
        "24/7 Priority Support"
      ],
      gradient: "from-green-400 to-emerald-500",
      popular: false
    }
  ];

  return (
    <section className="relative py-16 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Subscription Plans
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 ${
                plan.popular ? "border-4 border-purple-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-purple-500 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="flex flex-col items-center text-center">
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                  {plan.title}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-800 dark:text-white">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-300 ml-2">/ {plan.duration}</span>
                </div>
                <ul className="mb-8 space-y-3 text-left w-full">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                      <svg
                        className="w-5 h-5 mr-2 text-teal-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button onClick={()=>navigate('/subscription')}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    plan.popular 
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white"
                      : "bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-400 text-white"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;