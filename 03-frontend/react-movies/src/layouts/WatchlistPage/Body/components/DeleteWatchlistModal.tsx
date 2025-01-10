import CurrentWatchlist from "../../../../models/CurrentWatchlist";
import ImbdIcon from "../../../../Images/imdb.gif";

export const DeleteWatchlistMovie: React.FC<{ currentWatchlist: CurrentWatchlist, setIsWatchlistMovieDeleted: any, authState: any }> = (props) => {

    async function deleteWatchlistMovie(id: number) {
        const url = `${process.env.REACT_APP_API}/movies/secure/deleteWatchlist?movieId=${id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${props.authState.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        };
        const deleteWatchlistMovieResponse = await fetch(url, requestOptions);
        if (!deleteWatchlistMovieResponse.ok) throw new Error('Something went wrong!');
        props.setIsWatchlistMovieDeleted(true);
    }

    return (
        <div className="modal fade text-black" id={`modal${props.currentWatchlist.movie.id}`} data-bs-backdrop='static'
            data-bs-keyword="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" key={`modal-${props.currentWatchlist.movie.id}`}>
            <div className="modal-dialog">
                <div className="modal-content bg-danger-subtle">
                    <div className="modal-header border-bottom border-danger">
                        <h5 className="modal-title text-danger" id="staticBackdropLabel">Warning: Are you sure to delete the movie?</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-1">
                        <div className="containe p-0">
                            <div className="d-flex flex-column align-items-center">
                                <img src={props.currentWatchlist.movie.thumbnail} width='100' height='150' alt="movie" />
                                <h4>{props.currentWatchlist.movie.title.toUpperCase()}</h4>
                            </div>
                            <hr style={{borderColor: "black"}}/>
                            <div className="fs-6">
                                <p>Year: 
                                    <span className="fs-6 fw-normal"> {props.currentWatchlist.movie.release_date ? new Date(props.currentWatchlist.movie.release_date).getFullYear() : 'N/A'}</span>
                                </p>
                                <p>Genre: <span className="fs-6 fw-normal">{props.currentWatchlist.movie.genre?.split(" ").join(", ")}</span></p>
                                <p>Director: <span className="fs-6 fw-normal">{props.currentWatchlist.movie.director}</span></p>
                                <p>Stars: <span className="fs-6 fw-normal">{props.currentWatchlist.movie.cast}</span></p>
                                <p>
                                <a href="_blanck" title="visit IMDB" rel="nofollow">
                                    <img src={ImbdIcon} alt="IMDB"/>
                                    </a>&nbsp;&nbsp;
                                    <span className="fs-6 fw-normal">{props.currentWatchlist.movie.rating}/10</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer border-top border-danger">
                        <button data-bs-dismiss='modal' className="btn btn-danger" aria-current="true"
                            onClick={() => deleteWatchlistMovie(props.currentWatchlist.movie.id)}>
                            Delete
                        </button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}