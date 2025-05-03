import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { FiGrid, FiArrowRight, FiUsers } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const Statistics = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const fetchUserStatistics = async () => {
    const response = await axiosPublic.get("/users?limit=10000");
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["userStatistics"],
    queryFn: fetchUserStatistics
  });

  const totalUsers = data?.totalUsers || 0;
  const normalUsers = data?.users?.filter(user => user.premiumTaken === null).length || 0;
  const premiumUsers = data?.users?.filter(user => user.premiumTaken !== null).length || 0;

  const stats = [
    { 
      title: "Total Users", 
      value: totalUsers, 
      icon: <FiUsers className="text-amber-500" />,
      bg: "bg-gradient-to-br from-amber-500/20 to-amber-800/10",
      border: "border-amber-500/30"
    },
    { 
      title: "Normal Users", 
      value: normalUsers, 
      icon: <FiUsers className="text-blue-400" />,
      bg: "bg-gradient-to-br from-blue-500/20 to-blue-800/10",
      border: "border-blue-500/30"
    },
    { 
      title: "Premium Users", 
      value: premiumUsers, 
      icon: <FiUsers className="text-purple-400" />,
      bg: "bg-gradient-to-br from-purple-500/20 to-purple-800/10",
      border: "border-purple-500/30"
    }
  ];

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-16">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 right-0 bottom-0 border-4 border-zinc-700 rounded-full"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 border-t-4 border-amber-500 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <span className="text-xs font-bold text-amber-500">LOADING</span>
        </div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="text-center py-16 text-amber-500 font-semibold">
        Error loading statistics: {error.message}
      </div>
    );
  }

  return (
    <section className="bg-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center mb-4">
            <FiGrid className="text-amber-500 mr-3 text-xl" />
            <h2 className="text-3xl font-bold text-white tracking-tight">User Statistics</h2>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-zinc-800 via-amber-500 to-zinc-800"></div>
          <p className="mt-4 text-gray-400 text-center max-w-2xl">
            Get insights on registered users and premium subscribers in real-time
          </p>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`group bg-zinc-800 rounded-lg overflow-hidden border ${stat.border} shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-amber-500/50 hover:translate-y-[-4px]`}
                >
                  <div className={`p-6 ${stat.bg} h-full`}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-zinc-700/50 mb-4 border border-zinc-600">
                        {stat.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{stat.title}</h3>
                      <div className="text-5xl font-bold text-white my-4 group-hover:text-amber-400 transition-colors duration-300">
                        <CountUp end={stat.value} duration={2} separator="," className="font-mono" />
                      </div>
                      <p className="text-gray-400 text-sm">Active registered users</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
          </>
        )}
      </div>
    </section>
  );
};

export default Statistics;