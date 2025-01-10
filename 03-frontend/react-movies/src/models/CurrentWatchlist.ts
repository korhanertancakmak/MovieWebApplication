import MovieModel from "./MovieModel";

class CurrentWatchlist {
    movie: MovieModel;
    addedAt: Date;

    constructor (movie: MovieModel, addedAt: Date) {
        this.movie = movie;
        this.addedAt = addedAt;
    }
}

export default CurrentWatchlist;
