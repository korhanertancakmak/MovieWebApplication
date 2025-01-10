import { useState } from "react";
import MovieModel from "../../../../models/MovieModel";
import AddMovieRequest from "../../../../models/AddMovieRequest";
import { useOktaAuth } from "@okta/okta-react";
import { SelectGenresModal } from "./SelectGenresModal";

export const ChangeAMovie: React.FC<{ movie: MovieModel, deleteMovie: any }> = (props) => {
    const { authState } = useOktaAuth();

    // Movie States
    const [ title, setTitle ] = useState(`${props.movie.title}`);
    const [ img, setImg ] = useState<any>(`${props.movie.thumbnail}`);
    const [ trailer, setTrailer ] = useState(`${props.movie.trailer}`);
    const [ iframe, setIframe ] = useState(`${props.movie.iframe_resource}`);
    const [ description, setDescription ] = useState(`${props.movie.description}`);
    const [ releaseDate, setReleaseDate ] = useState<Date>(new Date(`${props.movie.release_date}`));
    const [ newGenres, setNewGenres ] = useState(`${props.movie.genre}`);
    const [ oldGenres, setOldGenres ] = useState(`${props.movie.genre}`);
    const [ rating, setRating ] = useState(parseFloat(`${props.movie.rating}`));
    const [ director, setDirector ] = useState(`${props.movie.director}`);
    const [ cast, setCast ] = useState(`${props.movie.cast}`);
    const [ writers, setWriters ] = useState(`${props.movie.writers}`);
    const [ countries, setCountries ] = useState(`${props.movie.countries}`);
    const [ languages, setLanguages ] = useState(`${props.movie.languages}`);
    const [ runtime, setRuntime ] = useState(Number(`${props.movie.runtime}`));

    const [ displayWarning, setDisplayWarning ] = useState(false);
    const [ displaySuccess, setDisplaySuccess ] = useState(false);

    async function submitNewMovie() {
        const url = `${process.env.REACT_APP_API}/admin/secure/update/movie?movieId=${props.movie.id}`;
        if (title !== '' && img !== null && trailer !== '' && iframe !== '' && 
            description !== '' && releaseDate !==null && newGenres !== '' && 
            rating !== null && director !== '' && cast !== '' && writers !== '' && 
            countries !== '' && languages !== '' && runtime !== null) {
                const movie: AddMovieRequest = new AddMovieRequest(title, img, trailer, iframe, description, releaseDate, newGenres, rating, director, cast, writers, countries, languages, runtime);
                
                const requestOptions = {
                    method: "PUT", 
                    headers: {
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                        'Content-Type': 'application/json' 
                    },
                    body: JSON.stringify(movie)
                };

                const submitNewMovieResponse = await fetch(url, requestOptions);
                if (!submitNewMovieResponse.ok) throw new Error('Something went wrong!');
                setDisplayWarning(false);
                setDisplaySuccess(true);
            } else {
                setDisplayWarning(true);
                setDisplaySuccess(false);
            }
    }

    async function base64ConversionForImages(e: any) {
        if (e.target.files[0]) {
            getBase64(e.target.files[0]);
        }
    }

    function getBase64(file: any) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImg(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error', error);
        }
    }

    async function deleteMovie() {
        const url = `${process.env.REACT_APP_API}/admin/secure/delete/movie?movieId=${props.movie.id}`;
        const requestOptions = {
            method: "DELETE", 
            headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json' 
            }
        };

        const deleteMovieResponse = await fetch(url, requestOptions);
        if (!deleteMovieResponse.ok) throw new Error('Something went wrong!');
        props.deleteMovie();
    }

    return(
        <div className="row justify-content-evenly rounded col-12 p-4 bg-dark text-white mb-2 z-3">
            <div className="row justify-content-evenly rounded col-12 p-0">
                Change the movie has been chosen:
            </div>
            <div className="container p-0">
                <form method="POST" className="row position-relative p-0">
                    {displayWarning && 
                        <div className="alert alert-danger mb-2" role="alert">
                            All fields must be filled out
                        </div>
                    }
                    {displaySuccess && 
                        <div className="alert alert-success mb-2" role="alert">
                            Movie added successfully
                        </div>
                    }
                    <div className="col-md-6 mb-5">
                        <div className="mb-2">
                            <label className="form-label">Title</label>
                            <input type="text" className="form-control" 
                                id="FormControlTitleInput" placeholder="Title" onChange={e => setTitle(e.target.value)} value={title}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Image</label>
                            <input type="file" className="ms-2" onClick={e => base64ConversionForImages(e)} />
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Trailer</label>
                                <input type="text" className="form-control" 
                                id="FormControlTrailerInput" placeholder="Trailer" onChange={e => setTrailer(e.target.value)} value={trailer}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Iframe</label>
                            <input type="text" className="form-control" 
                                id="FormControlIframeInput" placeholder="Title" onChange={e => setIframe(e.target.value)} value={iframe}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Description</label>
                            <textarea className="form-control" id="FormControlDescriptionInput" 
                                rows={2} onChange={e => setDescription(e.target.value)} value={description}></textarea>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Release Date (MM-DD-YYYY)</label>
                            <input type="date" className="form-control" 
                                id="FormControlReleaseDateInput" placeholder="Title" onChange={e => setReleaseDate(new Date(e.target.value))} value={releaseDate.toISOString().split('T')[0]}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label me-3">Genres</label>
                            <div className="d-flex">
                                {newGenres.length > 0 && 
                                    <div>
                                        Selected genres: [{newGenres.replace(/ /g, ', ')}]
                                    </div>
                                }
                                <SelectGenresModal selectedGenres={newGenres} setSelectedGenres={setNewGenres} currentGenre={oldGenres} setCurrentGenre={setOldGenres} modalId={"changeMovie"} buttonLabel={"Change Genres"}/>
                            </div>
                        </div>
                            
                    </div>
                    <div className="col-md-6 mb-5">
                        <div className="mb-2">
                            <label className="form-label">Rating</label>
                            <input type="number" className="form-control" 
                                id="FormControlRatingInput" placeholder="Rating (IMDB)" 
                                onChange={e => setRating(parseFloat(e.target.value))} value={rating} min="0" max="10" step="0.1"/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Director</label>
                            <input type="text" className="form-control" 
                                id="FormControlDirectorInput" placeholder="Director" onChange={e => setDirector(e.target.value)} value={director}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Cast</label>
                            <input type="text" className="form-control" 
                                id="FormControlCastInput" placeholder="Cast" onChange={e => setCast(e.target.value)} value={cast}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Writers</label>
                            <input type="text" className="form-control" 
                                id="FormControlWritersInput" placeholder="Writers" onChange={e => setWriters(e.target.value)} value={writers}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Countries</label>
                            <input type="text" className="form-control" 
                                id="FormControlCountriesInput" placeholder="Countries (USA, UK, etc.)" onChange={e => setCountries(e.target.value)} value={countries}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Languages</label>
                            <input type="text" className="form-control" 
                                id="FormControlLanguagesInput" placeholder="Languages (English, French, etc.)" onChange={e => setLanguages(e.target.value)} value={languages}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Runtime</label>
                            <input type="number" className="form-control" 
                                id="FormControlRuntimeInput" placeholder="Runtime (mins)" onChange={e => setRuntime(parseInt(e.target.value))} value={runtime} min="0" step="1"/>
                        </div>
                    </div>
                    <div>
                        <button type="button" className="btn btn-danger mt-3 position-absolute start-0 bottom-0" onClick={deleteMovie}>
                            Remove the Movie
                        </button>
                        <button type="button" className="btn btn-primary mt-3 position-absolute end-0 bottom-0" onClick={submitNewMovie}>
                            Update the Movie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}