import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMoviCredits } from "functions/fetchFilms";

export const Cast = () => {
    const [cast, setCast] = useState([]);
    const { movieId } = useParams();

    useEffect(() => {
        fetchMoviCredits(movieId)
        .then(results => setCast(results))
        .catch(error => console.log(error))
        .finally(console.log('GET!'))
    }, [movieId])

    return <ul>{cast.length > 0 ? cast.map(({id, name, character, profile_path }) =>
        <li key={id}>
            <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${profile_path}`} alt={name} width='100'/>
            <p>{name}</p>
            <p>Character: {character}</p>
        </li>) :
    <p>Sorry, there is no cast</p>}</ul>
}