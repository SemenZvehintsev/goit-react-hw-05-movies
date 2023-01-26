import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { fetchMoviCredits } from "functions/fetchFilms";

export const Cast = () => {
    const [cast, setCast] = useState([]);
    const { movieId } = useParams();
    const location = useLocation();


    useEffect(() => {
        fetchMoviCredits(movieId)
        .then(results => setCast(results))
        .catch(error => console.log(error))
        .finally()
    }, [movieId])

    console.log(location)

    return <ul>{cast.length > 0 ? cast.map(({id, name, character, profile_path }) =>
        <li key={id}>
            <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${profile_path}`} alt={name} width='100'/>
            <p>{name}</p>
            <p>Character: {character}</p>
        </li>) :
    <p>Sorry, there is no cast</p>}</ul>
}