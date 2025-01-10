class ReviewModel {
    id: number;
    userEmail: string;
    movieId: number;
    reviewText: string;
    rating: number;
    date: string;

    constructor(id: number, userEmail: string, movieId: number, reviewText: string, rating: number, date: string) {
        this.id = id;
        this.userEmail = userEmail;
        this.movieId = movieId;
        this.reviewText = reviewText;
        this.rating = rating;
        this.date = date;
    }
}

export default ReviewModel;