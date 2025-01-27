import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const SubscriptionStatus = () => {
    const axiosSecure = useAxiosSecure();
    const { data: subscriptionStatus, isLoading, isError } = useQuery({
        queryKey: ['subscriptionStatus'],
        queryFn: async () => {
            const response = await axiosSecure.get('/user-status'); // Replace with your endpoint
            return response.data;
        },
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
        refetchOnWindowFocus: false,
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching subscription status. Please try again later.</div>;
    }
    console.log(subscriptionStatus)
    return (
        <div>
            <h2>Your Subscription Status:</h2>
            {subscriptionStatus?.message
            }
        </div>
    );
};

export default SubscriptionStatus;
