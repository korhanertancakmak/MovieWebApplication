import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieModel from "../../../../models/MovieModel";
import {ReactComponent as ChevronRightStandard} from "../../../../Images/chevronRightStandard.svg";

export const MovieStreamBox: React.FC<{ movie: MovieModel, movieIsAdded: any, setMovieIsAdded: any}> = (props) => {

    // Authentication State
    const { authState } = useOktaAuth();

    // Watchlist Count State
    const[currentWatchlistCount, setCurrentWatchlistCount] = useState(0);
    const [httpError, setHttpError] = useState(null);

    // History Engagement States
    const [isWatching, setIsWatching] = useState(false); 
    const WATCH_TIME_THRESHOLD = 3600; // over than an hour is the threshold for engaging the user as watched!
    const [watchTime, setWatchTime] = useState(0);

    // Watchlist Count for the current user useEffect
    useEffect(() => {
        const fetchUserCurrentWatchlistCount = async () => {
            if (authState && authState?.isAuthenticated) {
                // This is the Spring Boot endpoint tells us how many movies this specific user has added
                const url = `${process.env.REACT_APP_API}/movies/secure/currentWatchlist/count`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
                try {
                    const currentWatchlistCountResponse = await fetch(url, requestOptions);
                    if (!currentWatchlistCountResponse.ok) throw new Error('Something went wrong!');
                    const currentWatchlistCountResponseJson = await currentWatchlistCountResponse.json();
                    setCurrentWatchlistCount(currentWatchlistCountResponseJson);
                } catch(error: any) {
                    setHttpError(error.message);
                } 
            }
                
        };
        fetchUserCurrentWatchlistCount();
    }, [authState, props.movieIsAdded]);

    // Is the movie added to the current user watchlist useEffect
    useEffect(() => {
        const fetchMovieIsAdded = async () => {
            if (authState && authState?.isAuthenticated) {
                // This is the Spring Boot endpoint tells us how many movies this specific user has added
                const url = `${process.env.REACT_APP_API}/movies/secure/isAdded/byUser?movieId=${props.movie.id}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
                try {
                    const movieIsAdded = await fetch(url, requestOptions);
                    if (!movieIsAdded.ok) throw new Error('Something went wrong!');
                    const movieIsAddedResponseJson = await movieIsAdded.json();
                    props.setMovieIsAdded(movieIsAddedResponseJson);
                } catch(error: any) {
                    setHttpError(error.message);
                } 
            }
                
        };
        fetchMovieIsAdded();
    }, [authState])

    // Auto-watch logic using time tracking
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isWatching) {
            interval = setInterval(() => {
                setWatchTime((prev) => prev + 1);
            }, 1000);
        }

        if (watchTime >= WATCH_TIME_THRESHOLD) {
            setIsWatching(false);
            clearInterval(interval as NodeJS.Timeout);

            const updateHistory = async () => {
                try {
                    const url = `${process.env.REACT_APP_API}/movies/secure/historyList?movieId=${props.movie.id}`;
                    const requestOptions = {
                        method: "PUT",
                        headers: {
                            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                            "Content-Type": "application/json",
                        },
                    };
                    await fetch(url, requestOptions);
                } catch (error: any) {
                    setHttpError(error.message);
                }
            };
            updateHistory();
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isWatching, watchTime, authState]);

    const startWatching = () => {
        setIsWatching(true);
        setWatchTime(0);
    };
    
    if (httpError) {
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    async function addMovieWatchlist() {
        const url = `${process.env.REACT_APP_API}/movies/secure/watchlist?movieId=${props.movie.id}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const watchlistResponse = await fetch(url, requestOptions);
        if (!watchlistResponse.ok) throw new Error('Something went wrong!');
        props.setMovieIsAdded(true);
    }
    
    function buttonRender() {
        if (authState?.isAuthenticated) {
            if (!props.movieIsAdded) {
                return (<button onClick={() => addMovieWatchlist()} className="btn btn-info btn-md" style={{width: "100px"}}>Add</button>)
            } else {
                return (<button className="btn btn-success btn-md disabled" style={{width: "125px"}}>Added</button>)
            }
        }
    }

    return (
        <>
            <div className="row rounded col-12 mt-3 p-0 bg-dark text-white z-3">
                {authState?.isAuthenticated ? 
                    <div className="position-relative" style={{paddingBottom: "56.25%"}}>
                        <iframe src={props.movie.iframe_resource} frameBorder="0" allowFullScreen scrolling="no" referrerPolicy="origin"
                            style={{position: "absolute", top: "-5", right: "0", width: "100%", height: "100%" }}
                            onLoad={startWatching}></iframe>
                    </div>
                :
                    <div className="my-3 p-3 text-danger text-center">
                        <h4>Only registered members can watch this movie. You can register/sign in just a few seconds.</h4>
                        <Link className="d-flex justify-content-center align-items-center button btn-md border border-danger p-2 bg-danger text-white text-decoration-none rounded-pill" type="button" to="/login" style={{width: "165px", margin: "0 auto"}}>
                            <span>SIGN UP NOW</span>
                            <ChevronRightStandard style={{width: "24px", height: "24px"}} />
                        </Link>
                    </div>
                }
            </div>
            {authState?.isAuthenticated ? 
                <div className="row rounded col-12 p-0 bg-darker text-white z-3">
                    <div className="d-flex rounded justify-content-between align-items-center bg-dark pe-2">
                        <h4 className="m-0 p-2"># of movies in your watchlist: {currentWatchlistCount}</h4>
                        {buttonRender()}
                    </div>
                </div>
            :   
                <></>
            }
        </>
    );
};

