package com.kcakmak.spring_boot_movies.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @JsonProperty("id")
    private Long id;

    @Column(name = "user_email", nullable = false)
    @JsonProperty("userEmail")
    private String userEmail;

    @Column(name = "movie_id", nullable = false)
    @JsonProperty("movieId")
    private Long movieId;

    @Column(name = "review_text", columnDefinition = "TEXT")
    @JsonProperty("reviewText")
    private String reviewText;

    @Column(name = "rating", precision = 3, scale = 2)
    @JsonProperty("rating")
    private BigDecimal rating;

    @Column(name = "created_at")
    @CreationTimestamp
    @JsonProperty("date")
    private Date date;

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

    public String getReviewText() {
        return reviewText;
    }

    public void setReviewText(String reviewText) {
        this.reviewText = reviewText;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
