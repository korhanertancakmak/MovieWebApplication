import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import CurrentWatchlist from "../../../../models/CurrentWatchlist";
import ImbdIcon from "../../../../Images/imdb.gif";
import { Link } from "react-router-dom";
import { DeleteWatchlistMovie } from "./DeleteWatchlistModal";
import React from "react";

export const Watchlist = () => {

    const { authState} = useOktaAuth();
    const [ httpError, setHttpError ] = useState(null);

    // Current watchlist state
    const [ currentWatchlist, setCurrentWatchlist ] = useState<CurrentWatchlist[]>([]);

    // Delete a movie state
    const [ isWatchlistMovieDeleted, setIsWatchlistMovieDeleted ] = useState(false);

    // Fetching user's watchlist
    useEffect(() => {
        const fetchUserCurrentWatchlist = async () => {
            if (authState && authState.isAuthenticated) {
                const url: string = `${process.env.REACT_APP_API}/movies/secure/currentWatchlist`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json' 
                    }
                };

                try {
                    const userCurrentWatchlistResponse = await fetch(url, requestOptions);
                    if (!userCurrentWatchlistResponse.ok) throw new Error('Something went wrong!');
    
                    const userCurrentWatchlistResponseJson = await userCurrentWatchlistResponse.json();
                    setCurrentWatchlist(userCurrentWatchlistResponseJson);
                    setIsWatchlistMovieDeleted(false);
                } catch (error: any) {
                    setHttpError(error.message);
                }
            }
        }
        fetchUserCurrentWatchlist();
        window.scrollTo(0, 0);
    }, [authState, isWatchlistMovieDeleted]);

    if (httpError) {
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <>
            {currentWatchlist.length > 0 ?
                <>
                    {currentWatchlist.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()).map(watchlist => (
                        <React.Fragment key={`fragment-${watchlist.addedAt}`}>
                            <div key={`movie-${watchlist.movie.id}`} className="row position-relative justify-content-evenly rounded col-12 p-4 bg-dark text-white mb-2 z-3">
                                {/* Movie addedAt date */}
                                <div className="position-absolute top-0 end-0 w-auto" >
                                    <p><i>added at "{watchlist.addedAt.toString()}"</i></p>
                                </div>
                                {/* movie picture */}
                                <div className="col-xl-2 col-lg-2 d-lg-block d-md-none d-sm-block">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <img src={watchlist.movie.thumbnail} alt={watchlist.movie.title} width="150" height="225" className="rounded"/>
                                    </div>
                                </div>
                                {/* movie details and description */}
                                <div className="col-lg-9 col-xl-10 col-md-9 pl-md-4">
                                    <h4>Watch {watchlist.movie.title} Full Movie</h4>
                                    <div className="row">
                                        <div className="col-sm-6" style={{fontSize: "1rem", fontWeight: "400"}}>
                                            <ol style={{listStyleType: "square"}}>
                                                <li>
                                                    Year: 
                                                    <span>{watchlist.movie.release_date ? new Date(watchlist.movie.release_date).getFullYear() : 'N/A'}</span>
                                                </li>
                                                <li>Genre: <span>{watchlist.movie.genre?.split(" ").join(", ")}</span></li>
                                                <li>Director: <span>{watchlist.movie.director}</span></li>
                                                <li>Stars: <span>{watchlist.movie.cast}</span></li>
                                                <li>
                                                    <a href="_blanck" title="visit IMDB" rel="nofollow">
                                                            <img src={ImbdIcon} alt="IMDB"/>
                                                    </a>&nbsp;&nbsp;
                                                    <span>{watchlist.movie.rating}/10</span>
                                                </li>
                                            </ol>
                                        </div>
                                        <div className="col-sm-6" style={{fontSize: "1rem", fontWeight: "400"}}>
                                            <ol style={{listStyleType: "square"}}>
                                                <li>Writers: <span>{watchlist.movie.writers}</span></li>
                                                <li>Countries: <span>{watchlist.movie.countries}</span></li>
                                                <li>Languages: <span>{watchlist.movie.languages}</span></li>
                                                <li>Runtime: <span>{watchlist.movie.runtime}</span> mins</li>
                                            </ol>
                                        </div>
                                        <div className="col-sm-12">
                                            <p style={{fontSize: "1rem", fontWeight: "400"}}>{watchlist.movie.description}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Movie watch/delete links */}
                                <div className="d-flex justify-content-between col-sm-12 mt-2 rounded" >
                                    <Link type="button" className="btn btn-success" to={`/movies/${watchlist.movie.id}`}>Watch</Link>
                                    <button type="button" className="btn btn-danger" aria-current="true" data-bs-toggle="modal"
                                        data-bs-target={`#modal${watchlist.movie.id}`}>Remove</button>
                                </div>
                            </div>
                            <DeleteWatchlistMovie currentWatchlist={watchlist} setIsWatchlistMovieDeleted={setIsWatchlistMovieDeleted} authState={authState} />
                        </React.Fragment>
                    ))}
                </>
            :
                <>
                    <div className="row position-relative justify-content-evenly rounded col-12 p-4 bg-dark text-white mb-2 z-3">
                        <h5>Currently you have no movies in your watchlist!</h5>
                    </div>
                </>
            }        
        </>
    );
}