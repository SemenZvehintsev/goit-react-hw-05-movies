import { fetchTrendingFilms } from "functions/fetchFilms";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Home =()=> {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true);
        fetchTrendingFilms()
        .then(results => setFilms(results))
        .catch(error => console.log(error))
        .finally(() => setIsLoading(false))
    },[])

    return <div>
        <h2>Trending today</h2>
        {isLoading && <p>LOADING</p>}
        <ul>
            {films.map(({title, id}) => <li key={id}><Link to={`/movies/${id}`}>{title}</Link></li>)}
        </ul>
    </div>
}
