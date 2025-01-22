import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: 'http://localhost:3000',
});

const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('access-token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      } else {
        console.error('Access token is missing');
      }
      return config;
    },
    function (error) {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      if (error.response) {
        const status = error.response.status;
        if (status === 401 || status === 403) {
          console.warn('Unauthorized or forbidden, logging out...');
          await logOut();
          navigate('/login');
        } else {
          console.error('Response error:', error.response.data);
        }
      } else {
        console.error('No response received:', error);
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
