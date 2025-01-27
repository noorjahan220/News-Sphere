import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';



const Details = () => {
  
    const {id} = useParams()
    const axiosPublic = useAxiosPublic()
    const {data:article = [],isLoading,refetch} = useQuery({
        queryKey:['article',id],
        queryFn: async() =>{
            const  { data } = await axiosPublic(`/newsId/${id}`)
            return data
        }
    })
    if (!article) {
        return <p>Loading or no article found...</p>;
    }
    if(isLoading){
        return <span className="loading loading-bars loading-lg"></span>
    }

    return (
        <div>
            <h2>{article.title}</h2>
            <img src={article.image} alt={article.title} />
            <p>Published by: {article.publisher}</p>
            <p>{article.description}</p>
           
        </div>
    );
};

export default Details;
