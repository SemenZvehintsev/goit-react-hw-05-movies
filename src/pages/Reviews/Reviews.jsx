import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviReviews } from "functions/fetchFilms";

export const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        fetchMoviReviews(movieId)
        .then((results) => setReviews(results))
        .catch(error => console.log(error))
        .finally()
    }, [movieId])

    return <ul>{reviews.length > 0 ? reviews.map(({id, author, content}) =>
        <li key={id}>
            <p>{author}</p>
            <p>Review: {content}</p>
        </li>) : 
        <p>Sorry, there is no reviews</p>}
        </ul>}