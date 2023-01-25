import { useEffect, useState } from "react";
import { Link, useParams, useLocation, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "functions/fetchFilms";


export const MovieDetails = () => {

    const [film, setFilm] = useState(null);
    const { movieId } = useParams();
    const location = useLocation();

    console.log(location)

    useEffect(()=>{
        fetchMovieDetails(movieId)
        .then(({poster_path, title, vote_average, overview, genres}) => setFilm({poster_path, title, vote_average, overview, genres}))
        .catch(error => console.log(error))
        .finally(console.log('GET!'))
    }, [movieId])

    return (film && <div>
        <button><Link>Go back</Link></button>
        <div>
            <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt={film.title} width='480'/>
            <div>
                <h2>{film.title}</h2>
                <p>User Score: {Math.round(film.vote_average * 10)}%</p>
                <h3>Overview</h3>
                <p>{film.overview || 'Sorry, there is no overview'}</p>
                <h3>Genres</h3>
                <p>{film.genres.map(({name}) => name).join(', ')}</p>
            </div>
        </div>
        <div>
            <h3>Additional information</h3>
            <ul>
                <li><Link to='cast'>Cast</Link></li>
                <li><Link to='reviews'>Revievs</Link></li>
            </ul>
        </div>
        <Outlet/>
    </div>)
}