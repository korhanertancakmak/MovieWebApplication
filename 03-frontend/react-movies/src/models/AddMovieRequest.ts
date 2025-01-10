class AddMovieRequest {
    title: string;
    img: string;
    trailer: string;
    iframe: string;
    description: string;
    releaseDate: Date;
    genre: string;
    rating: number;
    director: string;
    cast: string;
    writers: string;
    countries: string;
    languages: string;
    runtime: number; 

    constructor (
        title: string,
        img: string,
        trailer: string,
        iframe: string,
        description: string,
        releaseDate: Date,
        genre: string,
        rating: number,
        director: string,
        cast: string,
        writers: string,
        countries: string,
        languages: string,
        runtime: number
    ) {
        this.title = title;
        this.img = img;
        this.trailer = trailer;
        this.iframe = iframe;
        this.description = description;
        this.releaseDate = releaseDate;
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

export default AddMovieRequest;