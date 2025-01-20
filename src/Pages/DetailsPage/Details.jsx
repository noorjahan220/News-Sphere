import { useLoaderData } from 'react-router-dom';

const Details = () => {
    const article = useLoaderData(); // Load the data passed from the loader
    console.log("Article Data:", article);

    if (!article) {
        return <p>Loading or no article found...</p>;
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
