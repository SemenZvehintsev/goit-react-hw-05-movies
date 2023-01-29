import { Loader } from "components/Loader/Loader";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate, Outlet } from "react-router-dom";
import { fetchMovieDetails } from "functions/fetchFilms";
import styles from 'pages/MovieDetails/MovieDetails.module.css'

export const MovieDetails = () => {

    const [film, setFilm] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { movieId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        setIsLoading(true);
        fetchMovieDetails(movieId)
        .then(({poster_path, title, vote_average, overview, genres}) => setFilm({poster_path, title, vote_average, overview, genres}))
        .catch(error => Notify.warning(error))
        .finally(() => setIsLoading(false))
    }, [movieId])

    const handleBack = () => {
        if (location.state) {
        const {pathname, search} = location.state;
        navigate(`${pathname}${search}`)} else {
        navigate('/')}
    }

    if (!film) return;

    return <div className={styles.details}>
        <button className={styles.button} type="button" onClick={handleBack}>Go back</button>
        {isLoading && <Loader/>}
        <div className={styles.info}>
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
        <div className={styles.additional}>
            <h3>Additional information</h3>
            <ul>
                <li><Link to='cast' state={location.state}>Cast</Link></li>
                <li><Link to='reviews' state={location.state}>Revievs</Link></li>
            </ul>
        </div>
        <Outlet/>
    </div>
}