import { Loader } from "components/Loader/Loader";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchSearchFilms } from "functions/fetchFilms";
import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams} from "react-router-dom";
import styles from "pages/Movies/Movies.module.css"

export const Movies = () => {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const handleSearch = (event) => {
        event.preventDefault();
        const {value} = event.target.text;
        if (value) {
            setSearchParams({movie: value})
        } else {Notify.warning('Write something to find!')}
    }

    useEffect(() => {
        if (!searchParams.get("movie")) return;
        setIsLoading(true);
        const movie = searchParams.get("movie");
        fetchSearchFilms(movie)
        .then(results => {if (results.length) {
            const movies = results.map(({title, id}) =>{return {title, id}});
            setFilms([...movies]);
            Notify.success(`Find movies for "${movie}" search!`)
        } else {
            Notify.failure(`Sorry, can't find movies for "${movie}" search.`);
        }})
        .catch(error => Notify.failure(error))
        .finally(() => setIsLoading(false))
    }, [searchParams])

    return <div className={styles.movies}>
        <form className={styles.searchform} onSubmit={handleSearch}>
            <input         
            type="text"
            name="text"
            autoComplete="off"
            autoFocus
            placeholder="Search films"/>
            <button type="submit">Search</button>
        </form>
        {isLoading && <Loader/>}
        <ul>
            {films.map(({title, id}) => <li key={id}><Link to={`${id}`} state={{from: location}}>{title}</Link></li>)}
        </ul>
    </div>
}