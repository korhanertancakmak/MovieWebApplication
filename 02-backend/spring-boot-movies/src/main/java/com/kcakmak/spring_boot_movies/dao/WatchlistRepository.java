package com.kcakmak.spring_boot_movies.dao;


import com.kcakmak.spring_boot_movies.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "watchlist")
public interface WatchlistRepository extends JpaRepository<Watchlist, Long> {

    Watchlist findByUserEmailAndMovieId(String userEmail, Long movieId);

    List<Watchlist> findMoviesByUserEmail(String userEmail);

    @Modifying
    @Query(value = "DELETE FROM watchlist WHERE movie_id = :movie_id", nativeQuery = true)
    void deleteFromWatchlistByMovieId(@Param("movie_id") Long movieId);
}
