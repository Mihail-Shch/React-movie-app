import axios from 'axios';

const key = "41d5e9f8f7e17001c1398ef7e512c274";
const url = "https://api.themoviedb.org/3";
const nowPlayingMovies = `${url}/movie/now_playing`;
const topRatedMovies = `${url}/movie/top_rated`;
const genresUrl = `${url}/genre/movie/list`;
const discoverMovies = `${url}/discover/movie`;
const popularPeople = `${url}/person/popular`;
const getMovieInfo = `${url}/movie`


export const getNowPlayingMovies = async () => {
    try {
        const { data } = await axios.get(nowPlayingMovies, {
            params: {
                api_key: key,
                language: 'en_US',
                page: 1
            }
        })

        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularity'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))

        return modifiedData;


    } catch (error) {

    }
}

export const getGenres = async () => {
    try {
        const { data } = await axios.get(genresUrl, {
            params: {
                api_key: key,
                page: 1,
                language: 'en_US'
            }
        })

        const modifiedData = data['genres'].map((g) => ({
            id: g['id'],
            name: g['name']
        }))

        return modifiedData;

    } catch (error) {

    }
}

export const getMovieByGenre = async (id) => {
    try {
        const { data } = await axios.get(discoverMovies, {
            params: {
                api_key: key,
                language: 'en_US',
                page: 1,
                with_genres: id
            }
        })
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))

        return modifiedData;
    } catch (error) { }
}

export const getTopRatedMovies = async () => {
    try {
        const { data } = await axios.get(topRatedMovies, {
            params: {
                api_key: key,
                language: "en_US",
                page: 1
            }
        })

        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            title: m['title'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))

        return modifiedData;

    } catch { }
}

export const getPopularPeople = async () => {
    try {
        const { data } = await axios.get(popularPeople, {
            params: {
                api_key: key,
                page: 1
            }
        })

        const modifiedData = data['results'].map((p) => ({
            id: p['id'],
            name: p['name'],
            popularity: p['popularity'],
            poster: 'https://image.tmdb.org/t/p/w200' + p['profile_path'],
            knownFor: p['known_for_department']
        }))


        return modifiedData;

    } catch { }
}

export const getMovieDetails = async (id) => {
    try {
        const { data } = await axios.get(`${getMovieInfo}/${id}`, {
            params: {
                api_key: key,
                language: 'en_US',
            }
        });

        return data;

    } catch (error) {

    }
}

export const getCasts = async (id) => {
    try {
        const { data } = await axios.get(`${getMovieInfo}/${id}/credits`, {
            params: {
                api_key: key,
            }
        });
        const modifiedData = data['cast'].map((c) => ({
            id: c['cast_id'],
            character: c['character'],
            name: c['name'],
            img: 'https://image.tmdb.org/t/p/w200' + c['profile_path'],
        }))

        return modifiedData;
    } catch (error) { }
}

export const getSimilarMovie = async (id) => {
    try {
        const { data } = await axios.get(`${getMovieInfo}/${id}/similar`, {
            params: {
                api_key: key,
                language: 'en_US'
            }
        });
        const posterUrl = 'https://image.tmdb.org/t/p/original/';
        const modifiedData = data['results'].map((m) => ({
            id: m['id'],
            title: m['title'],
            backPoster: posterUrl + m['backdrop_path'],
            popularity: m['popularith'],
            poster: posterUrl + m['poster_path'],
            overview: m['overview'],
            rating: m['vote_average'],
        }))

        return modifiedData;
    } catch (error) { }
}

