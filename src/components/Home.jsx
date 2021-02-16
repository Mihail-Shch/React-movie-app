import React from 'react';
import { getNowPlayingMovies, getGenres, getMovieByGenre, getTopRatedMovies, getPopularPeople } from '../fetch/fetching';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../css/MovieCarousel.css";
import "../css/Genres.css";
import "../css/MovieListWithGenre.css";
import "../css/TopRatedList.css"
import Footer from './Footer';
import { Carousel } from 'react-responsive-carousel';
import classnames from 'classnames';
import { Link } from 'react-router-dom'

function Home() {

    const [nowPlaying, setNowPlaying] = React.useState([]);
    const [genres, setGenres] = React.useState([]);
    const [movieList, setMovieList] = React.useState([]);
    const [activeGenre, setActiveGenre] = React.useState(null);
    const [topRatedMovies, setTopRatedMovies] = React.useState([]);
    const [popularPeople, setPopularPeople] = React.useState([]);


    React.useEffect(() => {
        const fetchData = async () => {
            setNowPlaying(await getNowPlayingMovies())
            setGenres(await getGenres())
            setMovieList(await getMovieByGenre(28))
            setActiveGenre(28)
            setTopRatedMovies(await getTopRatedMovies())
            setPopularPeople(await getPopularPeople())
        };

        fetchData();

    }, [])

    const carouselMovies = nowPlaying.slice(2, 7).map((movie, index) => {
        return (
            <div className='movieCarousel' key={index}>
                <img src={movie.backPoster} alt={movie.title} />
                <h2 className='movieCarousel__title'>{movie.title}</h2>
                <div className="black"></div>
            </div>
        );
    });

    const onGenreClick = async (genre) => {
        setActiveGenre(genre.id)
        setMovieList(await getMovieByGenre(genre.id))
    }

    const genresList = genres.map((genre, index) => {
        return (
            <li key={index} className='genre-item'><button className={classnames('genre', {
                'active': activeGenre === genre.id,
            })} onClick={() => onGenreClick(genre)}> {genre.name}</button></li >
        )
    })

    const movieListWithGenres = movieList.slice(0, 4).map((movie, index) => {
        return (
            <div key={index} className='movie_list-item' style={{ textAlign: 'center' }}>
                <Link to={`/movie/${movie.id}`}>
                    <img src={movie.poster} alt={movie.title} className='movie_list-photo' />
                </Link>
                <h5>{movie.title}</h5>
                <span>Rating: {movie.rating}</span>
            </div>
        )
    })

    const topRatedMovieList = topRatedMovies.slice(0, 4).map((movie, index) => {
        return (
            <div key={index} className='movie_list-item' style={{ textAlign: 'center' }}>
                <Link to={`/movie/${movie.id}`}>
                    <img src={movie.poster} alt={movie.title} className='movie_list-photo' />
                </Link>
                <h5>{movie.title}</h5>
                <span>Rating: {movie.rating}</span>
            </div>
        )
    })

    const popularPeopleList = popularPeople.slice(0, 4).map((man, index) => {
        return (
            <div key={index} className="text-center">
                <img src={man.poster} alt={man.name} />
                <h5 style={{ marginTop: '5px', marginBottom: '5px' }}>{man.name}</h5>
                <p>Known for: {man.knownFor}</p>
            </div>
        )
    })


    return (
        <div>
            {
                nowPlaying.length > 0 ?
                    <Carousel
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={3000}
                        transitionTime={650}>
                        {carouselMovies}
                    </Carousel> : ''
            }
            <div className="genres-container">
                <ul className="genres-wrapper">
                    {genresList}
                </ul>
            </div>
            <div className='movie_list-withGenre'>
                {movieListWithGenres}
            </div>
            <div className='topRated_list' style={{ marginBottom: '30px' }}>
                <span style={{ fontSize: '25px', color: '#5a606b' }}>Top rated movies</span>
                <div className="topRated_list-wrapper">
                    {topRatedMovieList}
                </div>
            </div>
            <div className="popularPeople_list">
                <span style={{ fontSize: '25px', color: '#5a606b' }}>Popular people</span>
                <div className="popularPeople_list-wrapper d-flex justify-content-between" style={{ marginTop: '15px' }}>
                    {popularPeopleList}
                </div>
                <div style={{ height: '1px', backgroundColor: "#5a606b" }}></div>
            </div>
            <Footer />
        </div>

    )
}

export default Home
