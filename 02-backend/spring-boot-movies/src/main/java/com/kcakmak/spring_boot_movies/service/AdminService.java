package com.kcakmak.spring_boot_movies.service;

import com.kcakmak.spring_boot_movies.dao.MovieRepository;
import com.kcakmak.spring_boot_movies.dao.ReviewRepository;
import com.kcakmak.spring_boot_movies.dao.WatchlistRepository;
import com.kcakmak.spring_boot_movies.entity.Movie;
import com.kcakmak.spring_boot_movies.requestmodels.AddMovieRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminService {

    private final MovieRepository movieRepository;
    private final WatchlistRepository watchlistRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public AdminService(MovieRepository movieRepository, WatchlistRepository watchlistRepository,
                        ReviewRepository reviewRepository) {
        this.movieRepository = movieRepository;
        this.watchlistRepository = watchlistRepository;
        this.reviewRepository = reviewRepository;
    }

    // Method to create a new movie (POST)
    public void postMovie(AddMovieRequest addMovieRequest) {

        Movie movie = new Movie();
        movie.setTitle(addMovieRequest.getTitle());
        movie.setThumbnail(addMovieRequest.getImg());
        movie.setTrailer(addMovieRequest.getTrailer());
        movie.setIframeResource(addMovieRequest.getIframe());
        movie.setDescription(addMovieRequest.getDescription());
        movie.setReleaseDate(addMovieRequest.getReleaseDate());
        movie.setGenre(addMovieRequest.getGenre());
        movie.setRating(addMovieRequest.getRating());
        movie.setDirector(addMovieRequest.getDirector());
        movie.setCast(addMovieRequest.getCast());
        movie.setWriters(addMovieRequest.getWriters());
        movie.setCountries(addMovieRequest.getCountries());
        movie.setLanguages(addMovieRequest.getLanguages());
        movie.setRuntime(addMovieRequest.getRuntime());
        movieRepository.save(movie);
    }

    // Method to update an existing movie (PUT)
    public void updateMovie(Long id, AddMovieRequest addMovieRequest) {
        Optional<Movie> movie = movieRepository.findById(id);

        if (movie.isEmpty()) {
            throw new RuntimeException("Movie not found.");
        }

        // Update the movie's fields
        movie.get().setTitle(addMovieRequest.getTitle());
        movie.get().setThumbnail(addMovieRequest.getImg());
        movie.get().setTrailer(addMovieRequest.getTrailer());
        movie.get().setIframeResource(addMovieRequest.getIframe());
        movie.get().setDescription(addMovieRequest.getDescription());
        movie.get().setReleaseDate(addMovieRequest.getReleaseDate());
        movie.get().setGenre(addMovieRequest.getGenre());
        movie.get().setRating(addMovieRequest.getRating());
        movie.get().setDirector(addMovieRequest.getDirector());
        movie.get().setCast(addMovieRequest.getCast());
        movie.get().setWriters(addMovieRequest.getWriters());
        movie.get().setCountries(addMovieRequest.getCountries());
        movie.get().setLanguages(addMovieRequest.getLanguages());
        movie.get().setRuntime(addMovieRequest.getRuntime());

        // Save the updated movie
        movieRepository.save(movie.get());
    }

    public void deleteMovie(Long movieId) throws Exception {

        Optional<Movie> movie = movieRepository.findById(movieId);

        if (movie.isEmpty()) {
            throw new RuntimeException("Movie not found.");
        }

        movieRepository.delete(movie.get());
        watchlistRepository.deleteFromWatchlistByMovieId(movieId);
        reviewRepository.deleteFromReviewsByMovieId(movieId);
    }
}
