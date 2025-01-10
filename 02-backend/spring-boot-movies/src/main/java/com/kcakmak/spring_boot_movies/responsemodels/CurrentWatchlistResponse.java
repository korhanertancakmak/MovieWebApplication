package com.kcakmak.spring_boot_movies.responsemodels;

import com.kcakmak.spring_boot_movies.entity.Movie;
import java.sql.Date;

public class CurrentWatchlistResponse {

    private Movie movie;
    private Date addedAt;

    public CurrentWatchlistResponse(Movie movie, Date addedAt) {
        this.movie = movie;
        this.addedAt = addedAt;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Date getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(Date addedAt) {
        this.addedAt = addedAt;
    }
}
