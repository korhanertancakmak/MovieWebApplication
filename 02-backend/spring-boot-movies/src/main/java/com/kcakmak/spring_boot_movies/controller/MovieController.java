package com.kcakmak.spring_boot_movies.controller;

import com.kcakmak.spring_boot_movies.entity.Movie;
import com.kcakmak.spring_boot_movies.responsemodels.CurrentHistoryResponse;
import com.kcakmak.spring_boot_movies.responsemodels.CurrentWatchlistResponse;
import com.kcakmak.spring_boot_movies.service.MovieService;
import com.kcakmak.spring_boot_movies.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("${frontend.url}")
@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping("/secure/currentHistory")
    public List<CurrentHistoryResponse> currentHistory(@RequestHeader(value = "Authorization") String token)
            throws Exception {

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return movieService.currentHistory(userEmail);
    }

    @GetMapping("/secure/currentWatchlist")
    public List<CurrentWatchlistResponse> currentWatchlist(@RequestHeader(value = "Authorization") String token)
        throws Exception {

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return movieService.currentWatchlist(userEmail);
    }

    @GetMapping("/secure/currentWatchlist/count")
    public int currentWatchlistCount(@RequestHeader(value = "Authorization") String token) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return movieService.currentMoviesCountOfWatchlist(userEmail);
    }

    @GetMapping("/secure/isAdded/byUser")
    public Boolean watchlistMovieByUser(@RequestHeader(value = "Authorization") String token,
                                        @RequestParam Long movieId) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return movieService.watchlistMovieByUser(userEmail, movieId);
    }

    @PutMapping("/secure/watchlist")
    public Movie watchlistMovie (@RequestHeader(value = "Authorization") String token,
                                 @RequestParam Long movieId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return movieService.watchlistMovie(userEmail, movieId);
    }

    @PutMapping("/secure/historyList")
    public Movie historyMovie (@RequestHeader(value = "Authorization") String token,
                                 @RequestParam Long movieId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return movieService.historyMovie(userEmail, movieId);
    }

    @DeleteMapping("/secure/deleteWatchlist")
    public void deleteWatchlistMovie (@RequestHeader(value = "Authorization") String token,
                                       @RequestParam Long movieId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        movieService.deleteMovieFromUserWatchlist(userEmail, movieId);
    }
}
