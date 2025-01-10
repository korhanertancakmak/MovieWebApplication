import './Body.css';
import { ExploreTopMovies } from "./components/ExploreTopMovies";
import { Carousel } from "./components/Carousel";
import { ReasonsToJoin } from "./components/ReasonsToJoin";

export const Body = ({ onMovieClick }: { onMovieClick: (movie: any) => void }) => {

    const titleTop10: string = "Top 10 on IMDB";
    const titleNew10: string = "New on Coreflix";
    const urlTop10: string = `${process.env.REACT_APP_API}/movies?page=0&size=10&sort=rating,desc`;
    const urlNew10: string = `${process.env.REACT_APP_API}/movies?page=0&size=10&sort=id,desc`;
    return(
        <div className="homePage-body-container">
            <div className="body-container">
                <div className="body-wrapper">
                    <ExploreTopMovies />
                    <Carousel title={titleTop10} onMovieClick={onMovieClick} url={urlTop10} />
                    <Carousel title={titleNew10} onMovieClick={onMovieClick} url={urlNew10} />
                    <ReasonsToJoin />
                </div>
            </div>
        </div>
    );
};