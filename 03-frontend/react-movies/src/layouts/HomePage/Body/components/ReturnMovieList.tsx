import { useEffect, useState, RefObject } from 'react';
import MovieModel from '../../../../models/MovieModel';
import { ReturnMovie } from './ReturnMovie';

interface ReturnMovieListProps {
    scrollState: number;
    listRef: RefObject<HTMLUListElement>;
    setIsLoading: (loading: boolean) => void;
    onMovieClick: (movie: any) => void;
    url: string;
}

export const ReturnMovieList = (props: ReturnMovieListProps) => {

    const [movies, setMovies] = useState<MovieModel[]>([]);
    const [httpError, setHttpError] = useState(null);

    useEffect( () => {
        const fetchMovies = async () => {
            props.setIsLoading(true);

            try {
                const response = await fetch(props.url);
                if (!response.ok) throw new Error('Something went wrong!');

                const responseJson = await response.json();
                const responseData = responseJson._embedded.movies;

                const loadedMovies: MovieModel[] = responseData.map( (movie: any) => ({
                    id: movie.id,
                    title: movie.title,
                    thumbnail: movie.thumbnail,
                    trailer: movie.trailer,
                    iframe_resource: movie.iframe_resource,
                    description: movie.description,
                    release_date: movie.release_date,
                    genre: movie.genre,
                    rating: movie.rating,
                }));

                setMovies(loadedMovies);
            } catch(error: any) {
                setHttpError(error.message)
            } finally {
                props.setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (httpError) {
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div className='popular-movies-carousel-wrapper'>
            <div className="popular-movies-carousel-shadow"
                style={{ mask: 
                    props.scrollState === 1 ? `linear-gradient(to left, transparent, black 10%)` :
                    props.scrollState === 2 ? `linear-gradient(to left, transparent, black 10%, black 90%, transparent)` :
                    `linear-gradient(to right, transparent, black 10%)`}}>
                <ul className="popular-movies-list" ref={props.listRef}>
                    {movies.map(movie => (
                        <ReturnMovie movie={movie} key={movie.id} onMovieClick={props.onMovieClick} />
                    ))}
                </ul>
            </div>
        </div>
    );
};