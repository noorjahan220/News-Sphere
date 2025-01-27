import { useQuery } from '@tanstack/react-query'; // Ensure you're importing from v5 of Tanstack

import CountUp from 'react-countup';
import useAxiosPublic from '../../../hooks/useAxiosPublic';


const axiosPublic = useAxiosPublic();
const fetchUserStatistics = async () => {
  const response = await axiosPublic.get("/userStatistics");
  return response.data;
};

const Statistics = () => {
  const { data, error } = useQuery({
    queryKey: ["userStatistics"],  // Use an array to define the query key
    queryFn: fetchUserStatistics, // Define the function that fetches data
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="statistics-container">
      <h2>User Statistics</h2>
      <div className="statistics-item">
        <p>Total Users:</p>
        <CountUp end={data?.total || 0} duration={2} />
      </div>
      <div className="statistics-item">
        <p>Normal Users:</p>
        <CountUp end={data?.normal || 0} duration={2} />
      </div>
      <div className="statistics-item">
        <p>Premium Users:</p>
        <CountUp end={data?.premium || 0} duration={2} />
      </div>
    </div>
  );
};

export default Statistics;
