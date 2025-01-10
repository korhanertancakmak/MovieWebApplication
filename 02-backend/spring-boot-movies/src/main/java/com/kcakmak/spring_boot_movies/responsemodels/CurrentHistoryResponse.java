package com.kcakmak.spring_boot_movies.responsemodels;

import com.kcakmak.spring_boot_movies.entity.Movie;
import java.sql.Date;

public class CurrentHistoryResponse {

    private Movie movie;
    private Date watchedAt;

    public CurrentHistoryResponse(Movie movie, Date watchedAt) {
        this.movie = movie;
        this.watchedAt = watchedAt;
    }

    public Movie getMovie() {
        return movie;
    }

    public void setMovie(Movie movie) {
        this.movie = movie;
    }

    public Date getWatchedAt() {
        return watchedAt;
    }

    public void setWatchedAt(Date watchedAt) {
        this.watchedAt = watchedAt;
    }
}
