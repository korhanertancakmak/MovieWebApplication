import { useEffect, useState } from "react";
import MovieModel from "../../../models/MovieModel";
import { ReviewListBox } from "./components/ReviewListBox";
import { SimilarMoviesBox } from "./components/SimilarMoviesBox";
import { MovieDetailsBox } from "./components/MovieDetailsBox";
import { MovieStreamBox } from "./components/MovieStreamBox";

export const Body = () => {

    const [movie, setMovie] = useState<MovieModel>();
    const [httpError, setHttpError] = useState(null);
    const [totalStars, setTotalStars] = useState(0);

    // Is this movie already added to the user's watchlist?
    const [movieIsAdded, setMovieIsAdded] = useState(false);

    // movie useEffect
    useEffect( () => {
        const movieId = window.location.href.match(/\/movies\/(\d+)/)?.[1] || null;
        const fetchMovie = async () => {
            const url: string = `${process.env.REACT_APP_API}/movies/${movieId}`;
            
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Something went wrong!');
                
                const responseJson = await response.json();

                const loadedMovie: MovieModel = {
                    id: responseJson.id,
                    title: responseJson.title,
                    thumbnail: responseJson.thumbnail,
                    trailer: responseJson.trailer,
                    iframe_resource: responseJson.iframe_resource,
                    description: responseJson.description,
                    release_date: responseJson.release_date,
                    genre: responseJson.genre,
                    rating: responseJson.rating,
                    director: responseJson.director,
                    cast: responseJson.cast,
                    writers: responseJson.writers,
                    countries: responseJson.countries,
                    languages: responseJson.languages,
                    runtime: responseJson.runtime
                };

                setMovie(loadedMovie);
            } catch(error: any) {
                setHttpError(error.message);
            } 
        };
        fetchMovie();
    }, [window.location.href, movieIsAdded]);

    if (httpError) {
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return(
        <div className="body-container">
            <div className="body-wrapper">
                {movie && 
                    <>
                        <MovieDetailsBox movie={movie} totalStars={totalStars} />
                        <MovieStreamBox movie={movie} movieIsAdded={movieIsAdded} setMovieIsAdded={setMovieIsAdded} />
                        <SimilarMoviesBox movie={movie} />
                        <ReviewListBox movie={movie} setTotalStars={setTotalStars} />
                    </>
                }
            </div>
        </div>
    );
};