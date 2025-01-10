package com.kcakmak.spring_boot_movies.requestmodels;

import java.math.BigDecimal;
import java.util.Optional;

public class ReviewRequest {

    private BigDecimal rating;
    private Long movieId;
    private Optional<String> reviewDescription;

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Optional<String> getReviewDescription() {
        return reviewDescription;
    }

    public void setReviewDescription(Optional<String> reviewDescription) {
        this.reviewDescription = reviewDescription;
    }
}
