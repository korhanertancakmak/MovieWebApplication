import React from "react"
import MovieModel from "../../../../models/MovieModel"

interface ReturnMovieProps {
    movie: MovieModel; 
    onMovieClick: (movie: any) => void;
}

export const ReturnMovie: React.FC<ReturnMovieProps>  = ({ movie, onMovieClick }) => {
    return(
        <li className="top-10-element" key={movie.id}>
            <button className="top-10-element-button" onClick={() => onMovieClick(movie)}>
                <div className="top-10-element-image-wrapper">
                    <img src={movie.thumbnail} alt={movie.title} loading='lazy' className="top-10-element-image"/>
                </div>
            </button>
        </li>
    )
}