package com.kcakmak.spring_boot_movies.service;

import com.kcakmak.spring_boot_movies.dao.HistoryRepository;
import com.kcakmak.spring_boot_movies.dao.MovieRepository;
import com.kcakmak.spring_boot_movies.dao.WatchlistRepository;
import com.kcakmak.spring_boot_movies.entity.History;
import com.kcakmak.spring_boot_movies.entity.Movie;
import com.kcakmak.spring_boot_movies.entity.Watchlist;
import com.kcakmak.spring_boot_movies.responsemodels.CurrentHistoryResponse;
import com.kcakmak.spring_boot_movies.responsemodels.CurrentWatchlistResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MovieService {

    private final MovieRepository movieRepository;
    private final WatchlistRepository watchlistRepository;
    private final HistoryRepository historyRepository;

    public MovieService(MovieRepository movieRepository, WatchlistRepository watchlistRepository,
                HistoryRepository historyRepository) {
        this.movieRepository = movieRepository;
        this.watchlistRepository = watchlistRepository;
        this.historyRepository = historyRepository;
    }

    // This function adds movies to the user's watchlist
    public Movie watchlistMovie (String userEmail, Long movieId) throws Exception {

        Optional<Movie> movie = movieRepository.findById(movieId);
        if (movie.isEmpty() || watchlistMovieByUser(userEmail, movieId)) {
            throw new Exception("Movie doesn't exist or already added out by user");
        }

        Watchlist watchlist = new Watchlist(userEmail, movieId, Date.valueOf(LocalDate.now()));
        watchlistRepository.save(watchlist);
        return movie.get();
    }

    // This method checks whether the movie is already added to the watchlist by the user
    public Boolean watchlistMovieByUser(String userEmail, Long movieId) {
        Watchlist validateWatchlist = watchlistRepository.findByUserEmailAndMovieId(userEmail, movieId);
        return validateWatchlist != null;
    }

    // This returns # of movies in the user's watchlist
    public int currentMoviesCountOfWatchlist(String userEmail) {
        return watchlistRepository.findMoviesByUserEmail(userEmail).size();
    }

    // This returns the movies in the user's watchlist (made of movies!) as a response
    public List<CurrentWatchlistResponse> currentWatchlist(String userEmail) throws Exception {

        List<Watchlist> theList = watchlistRepository.findMoviesByUserEmail(userEmail);
        List<CurrentWatchlistResponse> currentWatchlistResponses = new ArrayList<>();

        // Creating the list of "movies" by the movieIds inside the watchlist
        List<Long> movieIdList = new ArrayList<>();
        for (Watchlist i: theList) {
            movieIdList.add(i.getMovieId());
        }
        List<Movie> movies = movieRepository.findMoviesByMovieIds(movieIdList);

        // Filling the watchlistResponse up with the "movies" list we created
        for (Movie movie: movies) {
            Optional<Watchlist> watchlist = theList.stream()
                    .filter(x -> x.getMovieId() == movie.getId()).findFirst();
            if (watchlist.isPresent()) {
                Date addedAt = watchlist.get().getAddedAt();
                currentWatchlistResponses.add(new CurrentWatchlistResponse(movie, addedAt));
            }
        }
        return currentWatchlistResponses;
    }

    // This function removes a specific movie by its id from the user's watchlist
    public void deleteMovieFromUserWatchlist(String userEmail, Long movieId) throws Exception {

        Optional<Movie> movie = movieRepository.findById(movieId);
        Watchlist validateWatchList = watchlistRepository.findByUserEmailAndMovieId(userEmail, movieId);
        if (movie.isEmpty() || validateWatchList == null) {
            throw new Exception("Movie does not exist or not included in user's watchlist!");
        }
        watchlistRepository.delete(validateWatchList);
    }

    // This function adds movies to the user's history
    public Movie historyMovie (String userEmail, Long movieId) throws Exception {

        Optional<Movie> movie = movieRepository.findById(movieId);
        if (movie.isEmpty() || historyMovieByUser(userEmail, movieId)) {
            throw new Exception("Movie doesn't exist or already added out by user");
        }

        History history = new History(userEmail, movieId, Date.valueOf(LocalDate.now()));
        historyRepository.save(history);
        return movie.get();
    }

    // This method checks whether the movie is already added to the user's history
    public Boolean historyMovieByUser(String userEmail, Long movieId) {
        History validateHistory = historyRepository.findByUserEmailAndMovieId(userEmail, movieId);
        return validateHistory != null;
    }

    // This returns the movies in the user's history (made of movies!) as a response
    public List<CurrentHistoryResponse> currentHistory(String userEmail) throws Exception {

        List<History> theList = historyRepository.findMoviesByUserEmail(userEmail);
        List<CurrentHistoryResponse> currentHistoryResponse = new ArrayList<>();

        // Creating the list of "movies" by the movieIds inside the history
        List<Long> movieIdList = new ArrayList<>();
        for (History i: theList) {
            movieIdList.add(i.getMovieId());
        }
        List<Movie> movies = movieRepository.findMoviesByMovieIds(movieIdList);

        // Filling the current history response up with the "movies" list we created
        for (Movie movie: movies) {
            Optional<History> history = theList.stream()
                    .filter(x -> x.getMovieId() == movie.getId()).findFirst();
            if (history.isPresent()) {
                Date addedAt = history.get().getWatchedAt();
                currentHistoryResponse.add(new CurrentHistoryResponse(movie, addedAt));
            }
        }
        return currentHistoryResponse;
    }
}
