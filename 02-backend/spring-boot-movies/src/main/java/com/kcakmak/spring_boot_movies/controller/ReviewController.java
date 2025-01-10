package com.kcakmak.spring_boot_movies.controller;

import com.kcakmak.spring_boot_movies.requestmodels.ReviewRequest;
import com.kcakmak.spring_boot_movies.service.ReviewService;
import com.kcakmak.spring_boot_movies.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("${frontend.url}")
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/movie")
    public Boolean reviewMovieByUser(@RequestHeader(value = "Authorization") String token,
                                     @RequestParam Long movieId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        return reviewService.userReviewListed(userEmail, movieId);
    }

    @PostMapping("/secure")
    public void postReview(@RequestHeader(value = "Authorization") String token,
                           @RequestBody ReviewRequest reviewRequest) throws Exception {

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if (userEmail == null) {
            throw new Exception("User email is missing");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }
}
