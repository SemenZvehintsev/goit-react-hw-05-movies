import axios from "axios";

const API_KEY='12f0b0722c57d8a1515bd7af21489be2';
const BASE_URL='https://api.themoviedb.org/3/'


const fetchTrendingFilms = async () => {
    const trendingUrl = `${BASE_URL}trending/movie/day`
    const {data} = await axios.get(trendingUrl, {params: { api_key: API_KEY}})
    return data.results
}


const fetchSearchFilms = async (search) => {
    const searchUrl = `${BASE_URL}search/movie`
    const {data} = await axios.get(searchUrl, {params: { api_key: API_KEY, language: 'en-US', query: search, page: 1, include_adult: false }})
    return data.results
}


const fetchMovieDetails = async (movieId) => {
    const detailsUrl = `${BASE_URL}movie/${movieId}`
    const {data} = await axios.get(detailsUrl, {params: { api_key: API_KEY, language: 'en-US' }})
    return data

}

const fetchMoviCredits = async (movieId) => {
    const creditsUrl = `${BASE_URL}movie/${movieId}/credits`
    const {data} = await axios.get(creditsUrl, {params: { api_key: API_KEY, language: 'en-US' }})
    const {cast} = data
    return cast
}

const fetchMoviReviews = async (movieId) => {
    const reviewsUrl = `${BASE_URL}movie/${movieId}/reviews`
    const {data} = await axios.get(reviewsUrl, {params: { api_key: API_KEY, language: 'en-US', page: 1}})
    return data.results

}

export {fetchTrendingFilms, fetchSearchFilms, fetchMovieDetails, fetchMoviCredits, fetchMoviReviews}