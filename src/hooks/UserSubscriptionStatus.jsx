import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";



const UserSubscriptionStatus = () => {
  const { user } = useContext(AuthContext); // Get the current user from AuthContext
  const axiosSecure = useAxiosSecure(); // Use the secure axios instance
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To manage any errors

  useEffect(() => {
    if (user) {
      const fetchSubscriptionStatus = async () => {
        try {
          setLoading(true); // Start loading
          const response = await axiosSecure.get('/user-status'); // Make the API call
          setSubscriptionStatus(response.data); // Set the subscription status
        } catch (err) {
          setError('Error fetching subscription status');
          console.error("Error fetching subscription status:", err);
        } finally {
          setLoading(false); // Stop loading
        }
      };

      fetchSubscriptionStatus(); // Call the function to fetch status
    }
  }, [user, axiosSecure]); // Run the effect when the user changes

  // If the user is not logged in, prompt them to log in
  if (!user) {
    return <div>Please sign in to check your subscription status.</div>;
  }

  // If the data is still loading, show a loading indicator
  if (loading) {
    return <div>Loading subscription status...</div>;
  }

  // If there's an error fetching the status, show the error
  if (error) {
    return <div>{error}</div>;
  }

  // Render subscription status message
  return (
    <div>
      <h2>Subscription Status</h2>
      <p>{subscriptionStatus.message}</p>
      {subscriptionStatus.remainingDays && (
        <p>Remaining days: {subscriptionStatus.remainingDays}</p>
      )}
    </div>
  );
};

export default UserSubscriptionStatus;
