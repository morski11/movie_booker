package com.moviebooker.controller;

import com.moviebooker.dto.CreateMovieRequest;
import com.moviebooker.entity.Movie;
import com.moviebooker.entity.MovieStatus;
import com.moviebooker.service.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getMovies(
            @RequestParam(required = false) String status) {
        
        List<Movie> movies;
        
        if (status != null && !status.isEmpty()) {
            try {
                MovieStatus movieStatus = MovieStatus.valueOf(status.toUpperCase());
                movies = movieService.getMoviesByStatus(movieStatus);
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().build();
            }
        } else {
            movies = movieService.getAllMovies();
        }
        
        return ResponseEntity.ok(movies);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Movie movie = movieService.getMovieById(id);
        return ResponseEntity.ok(movie);
    }

    @PostMapping
    public ResponseEntity<Movie> createMovie(@Valid @RequestBody CreateMovieRequest request) {
        Movie movie = movieService.createMovie(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(movie);
    }

    @PatchMapping("/{id}/watched")
    public ResponseEntity<Movie> markAsWatched(@PathVariable Long id) {
        Movie movie = movieService.markAsWatched(id);
        return ResponseEntity.ok(movie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        movieService.deleteMovie(id);
        return ResponseEntity.noContent().build();
    }
}
