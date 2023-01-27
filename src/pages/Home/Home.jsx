import { Loader } from "components/Loader/Loader";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchTrendingFilms } from "functions/fetchFilms";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from 'pages/Home/Home.module.css'

export const Home =()=> {

    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(()=>{
        setIsLoading(true);
        fetchTrendingFilms()
        .then(results => {
            const movies = results.map(({title, id}) =>{return {title, id}});
            setFilms(prev => [...prev, ...movies]);
            Notify.success('Get trending films today!')})
        .catch(error => Notify.warning(error))
        .finally(() => setIsLoading(false))
    }, [])

    if (!films.length) return;

    return <div className={styles.home}>
        <h2>Trending today</h2>
        {isLoading && <Loader/>}
        <ul>
            {films.map(({title, id}) => <li key={id}><Link to={`/movies/${id}`} state={{from: location}}>{title}</Link></li>)}
        </ul>
    </div>
}
