import MovieModel from "../../../../models/MovieModel";
import ImbdIcon from "../../../../Images/imdb.gif";
import { StarsReview } from "./StarsReview";

export const MovieDetailsBox: React.FC<{ movie: MovieModel, totalStars: number}> = (props) => {

    return (
        <div className="row justify-content-evenly rounded col-12 p-3 bg-dark text-white z-3">
            <div className="col-xl-2 col-lg-2 d-lg-block d-md-none d-sm-block">
                <div className="d-flex justify-content-center align-items-center">
                    <img src={props.movie?.thumbnail} alt={props.movie?.title} width="150" height="225" className="rounded"/>
                </div>
            </div>
            <div className="col-lg-9 col-xl-10 col-md-9 pl-md-4">
                <h4>Watch {props.movie?.title} Full Movie</h4>
                <div className="row">
                    <div className="col-sm-6" style={{fontSize: "1rem", fontWeight: "400"}}>
                        <ol style={{listStyleType: "square"}}>
                            <li>
                                Year: 
                                <span>{props.movie?.release_date ? new Date(props.movie.release_date).getFullYear() : 'N/A'}</span>
                            </li>
                            <li>Genre: <span>{props.movie?.genre?.split(" ").join(", ")}</span></li>
                            <li>Director: <span>{props.movie?.director}</span></li>
                            <li>Stars: <span>{props.movie?.cast}</span></li>
                            <li>
                                <a href="_blanck" title="visit IMDB" rel="nofollow">
                                        <img src={ImbdIcon} alt="IMDB"/>
                                </a>&nbsp;&nbsp;
                                <span>{props.movie?.rating}/10</span>
                            </li>
                        </ol>
                    </div>
                    <div className="col-sm-6" style={{fontSize: "1rem", fontWeight: "400"}}>
                        <ol style={{listStyleType: "square"}}>
                            <li>Writers: <span>{props.movie?.writers}</span></li>
                            <li>Countries: <span>{props.movie?.countries}</span></li>
                            <li>Languages: <span>{props.movie?.languages}</span></li>
                            <li>Runtime: <span>{props.movie?.runtime}</span> mins</li>
                            <li>
                                <StarsReview rating={props.totalStars} size={24} />
                            </li>
                        </ol>
                    </div>
                    <div className="col-sm-12">
                        <p style={{fontSize: "1rem", fontWeight: "400"}}>{props.movie?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};