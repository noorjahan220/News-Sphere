import React, { useEffect, useState } from 'react';
import Article from './Article';

const AllArticles = () => {
   const [articles ,setArticles] = useState([]);

   useEffect(()=>{
    fetch('/data.json')
    .then(res => res.json())
    .then(data => setArticles(data));
   },[])
    return (
        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-4 '>

            {
                articles.map(article => <Article key={article._id} article={article}/>)
            }
        </div>
    );
};

export default AllArticles;