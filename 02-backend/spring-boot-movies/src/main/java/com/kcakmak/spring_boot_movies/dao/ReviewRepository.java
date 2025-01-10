package com.kcakmak.spring_boot_movies.dao;

import com.kcakmak.spring_boot_movies.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

@RepositoryRestResource(path = "reviews")
public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByMovieId(@RequestParam("movie_id") Long movieId, Pageable pageable);

    Review findByUserEmailAndMovieId(String userEmail, Long movieId);

    @Modifying
    @Query(value = "DELETE FROM review WHERE movie_id = :movie_id", nativeQuery = true)
    void deleteFromReviewsByMovieId(@Param("movie_id") Long movieId);
}
