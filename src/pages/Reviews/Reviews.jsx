import { Loader } from "components/Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviReviews } from "functions/fetchFilms";

export const Reviews = () => {

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { movieId } = useParams();

    useEffect(() => {
        setIsLoading(true);
        fetchMoviReviews(movieId)
        .then((results) => setReviews(results))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false))
    }, [movieId])

    return <ul>{isLoading && <Loader/>}
        {reviews.length > 0 ? reviews.map(({id, author, content}) =>
        <li key={id}>
            <p>{author}</p>
            <p>Review: {content}</p>
        </li>) : 
        <p>Sorry, there is no reviews</p>}
        </ul>}