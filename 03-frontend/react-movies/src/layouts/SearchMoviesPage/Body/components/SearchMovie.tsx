import { Link } from "react-router-dom";
import MovieModel from "../../../../models/MovieModel";

export const SearchMovie: React.FC<{ movie: MovieModel, width: number, height: number }> = (props) => {

    return (
        <div className="m-2" style={{width: props.width, height: props.height}}>
            <Link to={`/movies/${props.movie.id}`} 
                style={{ padding: 0, margin: 0, display: 'block', width: props.width, height: props.height }}>
                <img src={props.movie.thumbnail} width={`${props.width}`} height={`${props.height}`} alt="Movie" className="rounded"/>
            </Link>
        </div>
    );
}