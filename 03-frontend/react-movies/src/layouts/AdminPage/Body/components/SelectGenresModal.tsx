interface SelectGenresModalProps {
    selectedGenres: string;
    setSelectedGenres: React.Dispatch<React.SetStateAction<string>>;
    currentGenre: string;
    setCurrentGenre: React.Dispatch<React.SetStateAction<string>>;
    modalId: string;  
    buttonLabel: string;  
}

export const SelectGenresModal: React.FC<SelectGenresModalProps> = (props) => {

    const genres = ["Action", "Adventure", "Animation",
                    "Biography", "Comedy", "Documentary", "Drama", 
                    "Family", "Fantasy", "History", "Horror", "Mystery", 
                    "Romance", "Sci-Fi", "Thriller", "War", "Western"];

    const addGenre = () => {
        if (
            props.currentGenre && 
            !props.selectedGenres.split(' ').includes(props.currentGenre)
        ) {
            props.setSelectedGenres((prev) =>
                prev ? `${prev} ${props.currentGenre}`.trim() : props.currentGenre
            );
            props.setCurrentGenre(''); // Reset the dropdown
        }
    };

    const removeGenre = (genre: string) => {
        props.setSelectedGenres((prev) =>
            prev
                .split(' ')
                .filter((g) => g !== genre)
                .join(' ')
        );
    };

    return(
        <div className="mx-2 text-black">
            {/* Trigger Button */}
            <button type="button" className="btn btn-primary rounded-pill" data-bs-toggle="modal" data-bs-target={`#${props.modalId}`} >
                {props.buttonLabel}
            </button>
            {/* Modal */}
            <div className="modal fade" id={props.modalId} tabIndex={-1} aria-labelledby={`${props.modalId}Label`} aria-hidden="true" data-bs-backdrop="false" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${props.modalId}Label`}>Select Genres</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                        </div>
                        <div className="modal-body">
                            {/* Dropdown for selecting a genre */}
                            <div className="mb-3">
                                <label htmlFor="genreDropdown" className="form-label">Select Genre</label>
                                <select className="form-select" id="genreDropdown" value={props.currentGenre} 
                                    onChange={(e) => props.setCurrentGenre(e.target.value)} >
                                    <option value="">Genres</option>
                                    {genres.map((genre) => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                                <button type="button" className="btn btn-success mt-2" onClick={addGenre} >
                                    + Add Genre
                                </button>
                            </div>
                            {/* Display selected genres */}
                            {props.selectedGenres.length > 0 && (
                                <div>
                                    <h6>Selected Genres:</h6>
                                    <ul className="list-group">
                                        {props.selectedGenres.split(' ').map((genre: string) => (
                                            <li key={genre} className="list-group-item d-flex justify-content-between align-items-center">
                                                {genre}
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => removeGenre(genre)}>
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}