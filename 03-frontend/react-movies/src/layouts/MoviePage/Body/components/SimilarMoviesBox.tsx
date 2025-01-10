import { useEffect, useState } from "react";
import { SearchMovie } from "../../../SearchMoviesPage/Body/components/SearchMovie";
import MovieModel from "../../../../models/MovieModel";


export const SimilarMoviesBox: React.FC<{ movie: MovieModel }> = (props) => {
    
    const [sameKindMovies, setsameKindMovies] = useState<MovieModel[]>([]);
    const [httpError, setHttpError] = useState(null);

    // similar movies to the movie on the page useEffect
    useEffect(() => {
        const MovieGenre = props.movie.genre.split(' ')[0].toLowerCase();
        const excludedId = props.movie.id;
        const fetchSimilarMovies = async () => {
            const url: string = `${process.env.REACT_APP_API}/movies/search/findByFilters?genre=${MovieGenre}&year=&yearThreshold=&rate=rating&sort=desc&page=0&size=16`;
            
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Something went wrong!');
                
                const responseJson = await response.json();
                const responseData = responseJson._embedded.movies;
                
                const loadedMovies: MovieModel[] = responseData
                    .filter((movie: any) => movie.id !== excludedId)
                    .map( (movie: any) => ({
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
                        runtime: movie.runtime
                }));
                setsameKindMovies(loadedMovies);
            } catch(error: any) {
                setHttpError(error.message);
            } 
        };
        fetchSimilarMovies();
    }, [props.movie]);

    if (httpError) {
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    return(
        <div className="row rounded col-12 my-3 p-2 bg-dark text-white z-3">
            <h4>Similar Movies on Coreflix</h4>
            <div className="d-flex justify-content-center align-items-center flex-wrap z-3" >
                {sameKindMovies.map(movie => (
                    <div className="mx-2 mb-3" key={movie.id} style={{width: "100px", height: "150px"}}>
                        <SearchMovie movie={movie} width={100} height={150}/>
                    </div>
                ))}
            </div>
        </div>
    );
};