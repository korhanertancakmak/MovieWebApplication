class MovieModel {
    id: number;
    title: string;
    thumbnail: string;
    trailer: string;
    iframe_resource: string;
    description: string;
    release_date: Date;
    genre: string;
    rating: number;
    director: string;
    cast: string;
    writers: string;
    countries: string;
    languages: string;
    runtime: number;

    constructor (
        id: number,
        title: string,
        thumbnail: string,
        trailer: string,
        iframe_resource: string,
        description: string,
        release_date: Date,
        genre: string,
        rating: number,
        director: string,
        cast: string,
        writers: string,
        countries: string,
        languages: string,
        runtime: number
    ) {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.trailer = trailer;
        this.iframe_resource = iframe_resource;
        this.description = description;
        this.release_date = release_date;
        this.genre = genre;
        this.rating = rating;
        this.director = director;
        this.cast = cast;
        this.writers = writers;
        this.countries = countries;
        this.languages = languages;
        this.runtime = runtime;
    }
}

export default MovieModel;