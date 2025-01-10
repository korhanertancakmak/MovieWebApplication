package com.kcakmak.spring_boot_movies.dao;

import com.kcakmak.spring_boot_movies.entity.History;
import com.kcakmak.spring_boot_movies.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "history")
public interface HistoryRepository extends JpaRepository<History, Long> {

    History findByUserEmailAndMovieId(String userEmail, Long movieId);
    List<History> findMoviesByUserEmail(String userEmail);
}
