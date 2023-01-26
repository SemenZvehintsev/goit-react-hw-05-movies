import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "functions/fetchFilms";


export const MovieDetails = () => {

    const [film, setFilm] = useState(null);
    const { movieId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        fetchMovieDetails(movieId)
        .then(({poster_path, title, vote_average, overview, genres}) => setFilm({poster_path, title, vote_average, overview, genres}))
        .catch(error => console.log(error))
        .finally()
    }, [movieId])

    const handleBack = () => {
        const {pathname, search} = location.state.from;
        navigate(`${pathname}${search}` || '/')
    }


    if (!film) return;

    return <div>
        <button type="button" onClick={handleBack}>Go back</button>
        <div>
            <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt={film.title} width='360'/>
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
                <li><Link to='cast' state={{from: location.state.from}}>Cast</Link></li>
                <li><Link to='reviews' state={{from: location.state.from}}>Revievs</Link></li>
            </ul>
        </div>
        <Outlet/>
    </div>
}