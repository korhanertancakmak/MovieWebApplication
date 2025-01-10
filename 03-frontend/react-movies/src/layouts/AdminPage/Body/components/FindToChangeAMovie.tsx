import { useEffect, useState } from "react";
import MovieModel from "../../../../models/MovieModel";
import ImbdIcon from "../../../../Images/imdb.gif";
import { ChangeAMovie } from "./ChangeAMovie";

export const FindToChangeAMovie = () => {

    const [movies, setMovies] = useState<MovieModel[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<MovieModel>();
    const [httpError, setHttpError] = useState(null);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [ movieDelete, setMovieDelete ] = useState(false);

    useEffect( () => {
        const fetchMovies = async () => {
            if (!search) return;
            const url: string = `${process.env.REACT_APP_API}/movies/search/findByTitleContaining?title=${search}`;

            try {
                const response = await fetch(url);
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
                    director: movie.director,
                    cast: movie.cast,
                    writers: movie.writers,
                    countries: movie.countries,
                    languages: movie.languages,
                    runtime: movie.runtime,
                }));

                setMovies(loadedMovies);
                setSelectedMovie(undefined);
            } catch(error: any) {
                setHttpError(error.message)
            } 
        };

        fetchMovies();
        window.scrollTo(0, 0);
    }, [search, movieDelete]);

    const handleMovieSelect = (movie: MovieModel) => {
        setMovies([movie]);
        setSelectedMovie(movie);
    };

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value); // Update the input field value
    };

    const handleSearchClick = () => {
        setSearch(searchInput); 
    };

    const deleteMovie = () => setMovieDelete(!movieDelete);
    
    if (httpError) {
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <div>
            <div className="row justify-content-evenly rounded col-12 p-4 bg-dark text-white mb-2 z-3">
                {/* Search Bar */}
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <input className="form-control me-2" type="search" aria-labelledby="Search" style={{ width: "auto" }}
                        onChange={handleSearchInput}
                        onKeyDown={e => {
                            if (e.key == 'Enter') {
                                setSearch(searchInput);
                            }
                        }}/>
                    <button className="btn btn-outline-danger" type="submit" onClick={handleSearchClick}>Search</button>
                </div>
            </div>
            {movies.length > 0 ?
                (movies.map(movie => (
                    <div key={movie.id} className="row justify-content-evenly rounded col-12 p-4 text-white mb-2 z-3" 
                        style={{backgroundColor: selectedMovie === undefined ? "rgb(var(--bs-dark-rgb))" : "var(--bs-form-valid-color)"}}
                        onClick={() => handleMovieSelect(movie)}>
                        <div className="row justify-content-evenly rounded col-12 p-3 text-white z-3">
                            <div className="col-xl-2 col-lg-2 d-lg-block d-md-none d-sm-block">
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src={movie.thumbnail} alt={movie.title} width="150" height="225" className="rounded"/>
                                </div>
                            </div>
                            <div className="col-lg-9 col-xl-10 col-md-9 pl-md-4">
                                <h4>{movie.title}</h4>
                                <div className="row">
                                    <div className="col-sm-6" style={{fontSize: "1rem", fontWeight: "400"}}>
                                        <ol style={{listStyleType: "square"}}>
                                            <li>Year: <span>{new Date(movie.release_date).getFullYear()}</span></li>
                                            <li>Genre: <span>{movie.genre.split(" ").join(", ")}</span></li>
                                            <li>Director: <span>{movie.director}</span></li>
                                            <li>Stars: <span>{movie.cast}</span></li>
                                            <li><img src={ImbdIcon} alt="IMDB"/> <span>{movie.rating}/10</span></li>
                                            <li>Trailer: <span style={{fontSize:"0.8rem"}}><i>"{movie.trailer}"</i></span></li>
                                        </ol>
                                    </div>
                                    <div className="col-sm-6" style={{fontSize: "1rem", fontWeight: "400"}}>
                                        <ol style={{listStyleType: "square"}}>
                                            <li>Writers: <span>{movie.writers}</span></li>
                                            <li>Countries: <span>{movie.countries}</span></li>
                                            <li>Languages: <span>{movie.languages}</span></li>
                                            <li>Runtime: <span>{movie.runtime}</span> mins</li>
                                            <li>Iframe: <span style={{fontSize:"0.8rem"}}><i>"{movie.iframe_resource}"</i></span></li>
                                        </ol>
                                    </div>
                                    <div className="col-sm-12">
                                        <h6>Description:</h6>
                                        <p style={{fontSize: "1rem", fontWeight: "400"}}>{movie.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {selectedMovie !== undefined && 
                            <ChangeAMovie movie={movie} deleteMovie={deleteMovie}/>
                        }
                    </div>
                )))
                :
                <></>
            }
        </div>
    );
}