import { fetchSearchFilms } from "functions/fetchFilms";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Movies = () => {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = (event) => {
        event.preventDefault();
        const {value} = event.target.text;
        setIsLoading(true);
        fetchSearchFilms(value)
        .then(results => setFilms(results))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false))
    }

    return <div>
        <form onSubmit={handleSearch}>
            <input         
            type="text"
            name="text"
            autoComplete="off"
            autoFocus
            placeholder="Search films" />
            <button type="submit">Search</button>
        </form>
        {isLoading && <p>LOADING</p>}
        <ul>
            {films.map(({title, id}) => <li key={id}><Link to={`${id}`}>{title}</Link></li>)}
        </ul>
    </div>
}