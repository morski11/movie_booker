package com.moviebooker.service;

import com.moviebooker.dto.CreateMovieRequest;
import com.moviebooker.entity.Movie;
import com.moviebooker.entity.MovieStatus;

import java.util.List;

public interface MovieService {
    
    List<Movie> getAllMovies();
    
    List<Movie> getMoviesByStatus(MovieStatus status);
    
    Movie getMovieById(Long id);
    
    Movie createMovie(CreateMovieRequest request);
    
    Movie markAsWatched(Long id);
    
    void deleteMovie(Long id);
}
