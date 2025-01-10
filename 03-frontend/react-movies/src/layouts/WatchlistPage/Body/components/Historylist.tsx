import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import CurrentHistorylist from "../../../../models/CurrentHistorylist";
import ImbdIcon from "../../../../Images/imdb.gif";
import { Link } from "react-router-dom";

export const Histroylist = () => {

    const { authState} = useOktaAuth();
    const [ httpError, setHttpError ] = useState(null);

    // Current history list state
    const [ currentHistroylist, setCurrentHistroylist ] = useState<CurrentHistorylist[]>([]);

    // Fetching user's history list
    useEffect(() => {
        const fetchUserCurrentHistroylist = async () => {
            if (authState && authState.isAuthenticated) {
                const url: string = `${process.env.REACT_APP_API}/movies/secure/currentHistory`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json' 
                    }
                };

                try {
                    const userCurrentHistroyResponse = await fetch(url, requestOptions);
                    if (!userCurrentHistroyResponse.ok) throw new Error('Something went wrong!');
    
                    const userCurrentHistroyResponseJson = await userCurrentHistroyResponse.json();
                    setCurrentHistroylist(userCurrentHistroyResponseJson);
                } catch (error: any) {
                    setHttpError(error.message);
                }
            }
        }
        fetchUserCurrentHistroylist();
        window.scrollTo(0, 0);
    }, [authState]);

    if (httpError) {
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return (
        <>
            {currentHistroylist.length > 0 ?
                <>
                    {currentHistroylist.sort((a, b) => new Date(b.watchedAt).getTime() - new Date(a.watchedAt).getTime()).map(histroylist => (
                        <div key={`movie-${histroylist.watchedAt}`} className="row position-relative justify-content-evenly rounded col-12 p-4 bg-dark text-white mb-2 z-3">
                            {/* Movie addedAt date */}
                            <div className="position-absolute top-0 end-0 w-auto" >
                                <p><i>added at "{histroylist.watchedAt.toString()}"</i></p>
                            </div>
                            {/* movie picture */}
                            <div className="col-xl-2 col-lg-2 d-lg-block d-md-none d-sm-block">
                                <div className="d-flex justify-content-center align-items-center">
                                    <img src={histroylist.movie.thumbnail} alt={histroylist.movie.title} width="150" height="225" className="rounded"/>
                                </div>
                            </div>
                            {/* movie details and description */}
                            <div className="col-lg-9 col-xl-10 col-md-9 pl-md-4">
                                <h4>Watch {histroylist.movie.title} Full Movie</h4>
                                <div className="row">
                                    <div className="col-sm-6" style={{fontSize: "1rem", fontWeight: "400"}}>
                                        <ol style={{listStyleType: "square"}}>
                                            <li>
                                                Year: 
                                                <span>{histroylist.movie.release_date ? new Date(histroylist.movie.release_date).getFullYear() : 'N/A'}</span>
                                            </li>
                                            <li>Genre: <span>{histroylist.movie.genre?.split(" ").join(", ")}</span></li>
                                            <li>Director: <span>{histroylist.movie.director}</span></li>
                                            <li>Stars: <span>{histroylist.movie.cast}</span></li>
                                            <li>
                                                <a href="_blanck" title="visit IMDB" rel="nofollow">
                                                    <img src={ImbdIcon} alt="IMDB"/>
                                                </a>&nbsp;&nbsp;
                                                <span>{histroylist.movie.rating}/10</span>
                                            </li>
                                        </ol>
                                    </div>
                                    <div className="col-sm-6" style={{fontSize: "1rem", fontWeight: "400"}}>
                                        <ol style={{listStyleType: "square"}}>
                                            <li>Writers: <span>{histroylist.movie.writers}</span></li>
                                            <li>Countries: <span>{histroylist.movie.countries}</span></li>
                                            <li>Languages: <span>{histroylist.movie.languages}</span></li>
                                            <li>Runtime: <span>{histroylist.movie.runtime}</span> mins</li>
                                        </ol>
                                    </div>
                                    <div className="col-sm-12">
                                        <p style={{fontSize: "1rem", fontWeight: "400"}}>{histroylist.movie.description}</p>
                                    </div>
                                </div>
                            </div>
                            {/* Movie rewatch/delete links */}
                            <div className="d-flex justify-content-end col-sm-12 mt-2 rounded" >
                                <Link type="button" className="btn btn-success" to={`/movies/${histroylist.movie.id}`}>ReWatch/Rate</Link>
                            </div>
                        </div>
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