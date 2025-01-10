import MovieModel from "./MovieModel";

class CurrentHistorylist {
    movie: MovieModel;
    watchedAt: Date;

    constructor (movie: MovieModel, watchedAt: Date) {
        this.movie = movie;
        this.watchedAt = watchedAt;
    }
}

export default CurrentHistorylist;
