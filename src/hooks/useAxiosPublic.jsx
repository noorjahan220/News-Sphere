import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'https://b10a12-server-side-noorjahan220.vercel.app'
}) 
const useAxiosPublic = () => {
   return axiosPublic;
};

export default useAxiosPublic;