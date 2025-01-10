package com.kcakmak.spring_boot_movies.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "movie")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @JsonProperty("id")
    private Long id;

    @Column(name = "title", nullable = false, length = 255)
    @JsonProperty("title")
    private String title;

    @Column(name = "thumbnail", nullable = false, columnDefinition = "MEDIUMBLOB")
    @JsonProperty("thumbnail")
    private String thumbnail;

    @Column(name = "trailer", nullable = false, columnDefinition = "TEXT")
    @JsonProperty("trailer")
    private String trailer;

    @Column(name = "iframe_resource", nullable = false, columnDefinition = "TEXT")
    @JsonProperty("iframe_resource")
    private String iframeResource;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    @JsonProperty("description")
    private String description;

    @Column(name = "release_date", nullable = false)
    @Temporal(TemporalType.DATE) // Ensures only the date is stored
    @JsonProperty("release_date")
    private Date releaseDate;

    @Column(name = "genre", nullable = false, length = 255)
    @JsonProperty("genre")
    private String genre;

    @Column(name = "rating", nullable = false, precision = 3, scale = 2)
    @JsonProperty("rating")
    private BigDecimal rating;

    @Column(name = "director", nullable = false, length = 255)
    @JsonProperty("director")
    private String director;

    @Column(name = "cast", nullable = false, columnDefinition = "TEXT")
    @JsonProperty("cast")
    private String cast;

    @Column(name = "writers", nullable = false, columnDefinition = "TEXT")
    @JsonProperty("writers")
    private String writers;

    @Column(name = "countries", nullable = false, length = 255)
    @JsonProperty("countries")
    private String countries;

    @Column(name = "languages", nullable = false, length = 255)
    @JsonProperty("languages")
    private String languages;

    @Column(name = "runtime", nullable = false)
    @JsonProperty("runtime")
    private Integer runtime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getTrailer() {
        return trailer;
    }

    public void setTrailer(String trailer) {
        this.trailer = trailer;
    }

    public String getIframeResource() {
        return iframeResource;
    }

    public void setIframeResource(String iframeResource) {
        this.iframeResource = iframeResource;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public String getCast() {
        return cast;
    }

    public void setCast(String cast) {
        this.cast = cast;
    }

    public String getWriters() {
        return writers;
    }

    public void setWriters(String writers) {
        this.writers = writers;
    }

    public String getCountries() {
        return countries;
    }

    public void setCountries(String countries) {
        this.countries = countries;
    }

    public String getLanguages() {
        return languages;
    }

    public void setLanguages(String languages) {
        this.languages = languages;
    }

    public Integer getRuntime() {
        return runtime;
    }

    public void setRuntime(Integer runtime) {
        this.runtime = runtime;
    }
}
