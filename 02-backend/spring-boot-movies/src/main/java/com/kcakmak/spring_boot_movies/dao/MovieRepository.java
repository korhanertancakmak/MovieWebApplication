package com.kcakmak.spring_boot_movies.dao;

import com.kcakmak.spring_boot_movies.entity.Movie;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RepositoryRestResource(path = "movies")
public interface MovieRepository extends JpaRepository<Movie, Long> {

    Page<Movie> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    //Page<Movie> findByGenreContaining(@RequestParam("genre") String genre, Pageable pageable);

    @Query(value = """
        SELECT * 
        FROM movie 
        WHERE (:genre IS NULL OR genre LIKE %:genre%)
            AND (
                (:year IS NULL AND :yearThreshold IS NULL) 
                OR 
                (:year IS NOT NULL AND :yearThreshold IS NULL AND YEAR(release_date) = :year)
                OR
                (:year IS NULL AND :yearThreshold IS NOT NULL AND YEAR(release_date) <= :yearThreshold)
            )
        ORDER BY 
        CASE 
            WHEN :rate = 'id' AND :sort = 'asc' THEN id
            WHEN :rate = 'id' AND :sort = 'desc' THEN -id
            WHEN :rate = 'rating' AND :sort = 'asc' THEN rating
            WHEN :rate = 'rating' AND :sort = 'desc' THEN -rating
        END
        """, nativeQuery = true)
    Page<Movie> findByFilters(
            @Param("genre") String genre,
            @Param("year") Integer year,
            @Param("yearThreshold") Integer yearThreshold,
            @Param("rate") String rate,
            @Param("sort") String sort,
            Pageable pageable
    );

    @Query(value = """
            SELECT * FROM movie WHERE id IN :movie_ids
            """, nativeQuery = true)
    List<Movie> findMoviesByMovieIds (@Param("movie_ids") List<Long> movieId);
}
