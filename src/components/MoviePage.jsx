import React from 'react'
import { getMovieDetails, getCasts, getSimilarMovie } from '../fetch/fetching';
import { Link } from 'react-router-dom'
import Footer from './Footer';
import '../css/MovieInfo.css';
import '../css/Genres.css'

function MoviePage({ match }) {
    const params = match.params;

    console.log(match)

    const [movieInfo, setMovieInfo] = React.useState([]);
    const [cast, setCast] = React.useState([]);
    const [similarMovies, setSimilarMovies] = React.useState([]);
    const posterUrl = 'https://image.tmdb.org/t/p/original/';

    // let { title, backdrop_path, overview, vote_average, release_date, tagline, runtime } = movieInfo;
    let genres = [];
    genres = movieInfo.genres;

    React.useEffect(() => {
        const fetchData = async () => {
            setMovieInfo(await getMovieDetails(params.id))
            setCast(await getCasts(params.id))
            setSimilarMovies(await getSimilarMovie(params.id))
        }

        fetchData();
    }, [params.id])


    let genresList;
    if (genres) {
        genresList = genres.map((genre, index) => {
            return (
                <li key={index} className='movieGenre-item'><button className='genre'> {genre.name}</button></li >
            )
        })
    }

    const castList = cast.slice(0, 4).map((actor, index) => {
        return (
            <div className="movieActor-wrapper movie_info-item" key={index}>
                <img className='movieActor-photo' src={actor.img} alt={actor.name} />
                <p className='movieActor-name'>{actor.name}</p>
                <p className='movieActor-character'>{actor.character}</p>
            </div>
        )
    })

    const similarMoviesList = similarMovies.slice(0, 4).map((movie, index) => {
        return (
            <div key={index} style={{ textAlign: 'center' }} className='movie_list-item'>
                <Link to={`/movie/${movie.id}`}>
                    <img className='movie_list-photo' src={movie.poster} alt={movie.title} />
                </Link>
                <h5>{movie.title}</h5>
                <span>Rating: {movie.rating}</span>
            </div>
        )
    })

    return (
        <div>
            <div className='movieInfoImg-wrapper'>
                <img src={posterUrl + movieInfo.backdrop_path} alt={movieInfo.title} />
                <h2 className='movieTitle'>{movieInfo.title}</h2>
            </div>
            <div className="movie_genres">
                <span className='movieSectionsTitle'>Genres</span>
                <ul className='movieGenres genres-wrapper'>
                    {
                        genresList
                    }
                </ul>
            </div>
            <div className="movie_overview">
                <span className='movieSectionsTitle'>Overview</span>
                <p>{movieInfo.overview}</p>
            </div>
            <div className="movie_info">
                <div className="movie_info-item movie_date">
                    <span className='movieSectionsTitle'>Release date</span>
                    <p className='movie_info-itemText'>{movieInfo.release_date}</p>
                </div>
                <div className="movie_info-item movie_rating">
                    <span className='movieSectionsTitle'>Rating</span>
                    <p className='movie_info-itemText'>{movieInfo.vote_average}</p>
                </div>
                <div className="movie_info-item movie_tagline">
                    <span className='movieSectionsTitle'>Tagline</span>
                    <p className='movie_info-itemText'>'{movieInfo.tagline}'</p>
                </div>
                <div className="movie_info-item movie_runtime">
                    <span className='movieSectionsTitle'>Runtime</span>
                    <p className='movie_info-itemText'>{movieInfo.runtime}</p>
                </div>
            </div>
            <div className="movie_cast">
                <span className='movieSectionsTitle'>Cast</span>
                <div className="movie_info">
                    {
                        castList
                    }
                </div>
            </div>
            <div className="similar_movies" style={{ marginTop: '25px' }}>
                <span className='movieSectionsTitle'>Similar movies</span>
                <div className="similar_movies-wrapper"
                    style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', marginLeft: '-5px', marginRight: '-5px' }}>
                    {
                        similarMoviesList
                    }
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default MoviePage
