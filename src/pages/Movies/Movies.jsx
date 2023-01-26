import { fetchSearchFilms } from "functions/fetchFilms";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useSearchParams} from "react-router-dom";

export const Movies = () => {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    const handleSearch = (event) => {
        event.preventDefault();
        const {value} = event.target.text;
        setSearchParams({movie: value})
    }

    useEffect(() => {
        if (!searchParams.get("movie")) return;
        setIsLoading(true);
        const movie = searchParams.get("movie");
        fetchSearchFilms(movie)
        .then(results => setFilms(results))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false))
    }, [searchParams])

    console.log(location)

    return <div>
        <form onSubmit={handleSearch}>
            <input         
            type="text"
            name="text"
            autoComplete="off"
            autoFocus
            placeholder="Search films"/>
            <button type="submit">Search</button>
        </form>
        {isLoading && <p>LOADING</p>}
        <ul>
            {films.map(({title, id}) => <li key={id}><Link to={`${id}`} state={{from: location}}>{title}</Link></li>)}
        </ul>
    </div>
}