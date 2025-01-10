package com.kcakmak.spring_boot_movies.controller;

import com.kcakmak.spring_boot_movies.entity.Movie;
import com.kcakmak.spring_boot_movies.requestmodels.AddMovieRequest;
import com.kcakmak.spring_boot_movies.service.AdminService;
import com.kcakmak.spring_boot_movies.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("${frontend.url}")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/secure/add/movie")
    public void postMovie(@RequestHeader(value = "Authorization") String token,
                          @RequestBody AddMovieRequest addMovieRequest) throws Exception {

        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }
        adminService.postMovie(addMovieRequest);
    }

    @PutMapping("/secure/update/movie")
    public void updateMovie(@RequestHeader(value = "Authorization") String token,
                            @RequestParam Long movieId,
                            @RequestBody AddMovieRequest addMovieRequest) throws Exception {

        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }
        adminService.updateMovie(movieId, addMovieRequest);
    }

    @DeleteMapping("/secure/delete/movie")
    public void deleteMovie(@RequestHeader(value = "Authorization") String token,
                            @RequestParam Long movieId) throws Exception {

        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only.");
        }
        adminService.deleteMovie(movieId);
    }
}
