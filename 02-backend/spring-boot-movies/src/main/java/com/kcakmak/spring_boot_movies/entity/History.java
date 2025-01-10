package com.kcakmak.spring_boot_movies.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "history")
public class History {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @JsonProperty("id")
    private Long id;

    @Column(name = "user_email", nullable = false, length = 255)
    @JsonProperty("userEmail")
    private String userEmail;

    @Column(name = "movie_id", nullable = false)
    @JsonProperty("movieId")
    private Long movieId;

    @Column(name = "watched_at", nullable = false)
    @Temporal(TemporalType.DATE)
    @JsonProperty("watched_at")
    private Date watchedAt;

    public History() {}

    public History(String userEmail, Long movieId, Date watchedAt) {
        this.userEmail = userEmail;
        this.movieId = movieId;
        this.watchedAt = watchedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Date getWatchedAt() {
        return watchedAt;
    }

    public void setWatchedAt(Date watchedAt) {
        this.watchedAt = watchedAt;
    }
}
