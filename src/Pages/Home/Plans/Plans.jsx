import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiStar, FiZap, FiArrowRight } from "react-icons/fi";

const Plans = () => {
  const navigate = useNavigate();
  const plans = [
    {
      title: "1 Minute Trial",
      price: "$1",
      duration: "1 minute access",
      features: [
        "Basic Articles Access",
        "Limited Premium Content",
        "Ad-supported Experience",
        "Single Device Access"
      ],
      gradient: "from-amber-400 to-amber-600",
      icon: <FiZap className="text-amber-400" />,
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
      icon: <FiStar className="text-purple-400" />,
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
      gradient: "from-blue-400 to-cyan-500",
      icon: <FiStar className="text-blue-400" />,
      popular: false
    }
  ];

  // Find the plan with the most features to ensure equal height
  const maxFeatures = Math.max(...plans.map(plan => plan.features.length));

  return (
    <section className="bg-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center mb-4">
            <FiStar className="text-amber-500 mr-3 text-xl" />
            <h2 className="text-3xl font-bold text-white tracking-tight">Subscription Plans</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-zinc-800 via-amber-500 to-zinc-800"></div>
          <p className="mt-4 text-gray-400 text-center max-w-2xl">
            Choose the perfect plan for your news reading experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group bg-zinc-800 rounded-xl overflow-hidden border ${
                plan.popular ? "border-amber-500/50" : "border-zinc-700"
              } shadow-lg transition-all duration-300 hover:shadow-2xl hover:translate-y-[-4px] flex flex-col h-full`} // Added flex and h-full
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-bl-lg text-sm font-semibold flex items-center">
                  <FiStar className="mr-1" /> Popular
                </div>
              )}
              
              <div className="p-6 flex flex-col flex-grow"> {/* Added flex-grow */}
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-zinc-700/50 mb-4 border border-zinc-600">
                    {plan.icon}
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                    {plan.title}
                  </h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-2">/ {plan.duration}</span>
                  </div>
                </div>

                <ul className="mb-8 space-y-3 flex-grow"> {/* Added flex-grow */}
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start text-gray-400">
                      <FiCheck className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {/* Add empty list items to equalize height */}
                  {Array.from({ length: maxFeatures - plan.features.length }).map((_, i) => (
                    <li key={`empty-${i}`} className="invisible">
                      <FiCheck className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                      <span>Placeholder</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto"> {/* Pushes button to bottom */}
                  <button 
                    onClick={() => navigate('/subscription')}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white"
                        : "bg-zinc-700 hover:bg-zinc-600 text-white border border-zinc-600"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Plans;