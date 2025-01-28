import { useQuery } from '@tanstack/react-query';
import CountUp from 'react-countup';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const Statistics = () => {
  const axiosPublic = useAxiosPublic();

  const fetchUserStatistics = async () => {
    const response = await axiosPublic.get("/users?limit=10000"); // Fetch all users with high limit
    return response.data;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["userStatistics"],
    queryFn: fetchUserStatistics
  });

  // Calculate statistics from user data
  const totalUsers = data?.totalUsers || 0;
  const normalUsers = data?.users?.filter(user => user.premiumTaken === null).length || 0;
  const premiumUsers = data?.users?.filter(user => user.premiumTaken !== null).length || 0;

  const stats = [
    { title: "Total Users", value: totalUsers, color: "from-teal-400 to-blue-500" },
    { title: "Normal Users", value: normalUsers, color: "from-green-400 to-emerald-500" },
    { title: "Premium Users", value: premiumUsers, color: "from-purple-400 to-indigo-500" }
  ];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
              <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500 dark:text-red-400">
        Error loading statistics: {error.message}
      </div>
    );
  }

  return (
    <div className="relative py-16 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            User Statistics
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className={`mb-4 w-full py-2 bg-gradient-to-r ${stat.color} rounded-lg`}>
                  <h3 className="text-xl font-semibold text-white">{stat.title}</h3>
                </div>
                <div className="text-4xl font-bold text-gray-800 dark:text-white my-4">
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    className="font-mono"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Active registered users
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;