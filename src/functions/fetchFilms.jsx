import axios from "axios";

const API_KEY='12f0b0722c57d8a1515bd7af21489be2';
const BASE_URL='https://api.themoviedb.org/3/trending/movie/day'

export const fetchTrendingFilms = async () => {
    const {data} = await axios.get(BASE_URL, {params: { api_key: API_KEY}})
    return data.results

}