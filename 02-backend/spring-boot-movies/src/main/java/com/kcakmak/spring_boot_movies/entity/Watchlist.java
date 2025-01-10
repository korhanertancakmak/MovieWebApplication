package com.kcakmak.spring_boot_movies.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "watchlist")
public class Watchlist {

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

    @Column(name = "added_at", nullable = false)
    @Temporal(TemporalType.DATE) // Ensures only the date is stored
    @JsonProperty("addedAt")
    private Date addedAt;

    public Watchlist() {}

    public Watchlist(String userEmail, Long movieId, Date addedAt) {
        this.userEmail = userEmail;
        this.movieId = movieId;
        this.addedAt = addedAt;
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

    public Date getAddedAt() {
        return addedAt;
    }

    public void setAddedAt(Date addedAt) {
        this.addedAt = addedAt;
    }
}
