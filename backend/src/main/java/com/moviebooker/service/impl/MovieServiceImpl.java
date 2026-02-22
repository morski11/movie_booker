package com.moviebooker.service.impl;

import com.moviebooker.dto.CreateMovieRequest;
import com.moviebooker.entity.Movie;
import com.moviebooker.entity.MovieStatus;
import com.moviebooker.repository.MovieRepository;
import com.moviebooker.service.MovieService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Movie> getAllMovies() {
        return movieRepository.findAllByOrderByCreatedAtDesc();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Movie> getMoviesByStatus(MovieStatus status) {
        return movieRepository.findByStatusOrderByCreatedAtDesc(status);
    }

    @Override
    @Transactional(readOnly = true)
    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Movie not found with id: " + id));
    }

    @Override
    public Movie createMovie(CreateMovieRequest request) {
        Movie movie = Movie.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .description(request.getDescription())
                .rating(request.getRating())
                .status(MovieStatus.WATCHLIST)
                .build();

        return movieRepository.save(movie);
    }

    @Override
    public Movie markAsWatched(Long id) {
        Movie movie = getMovieById(id);
        movie.setStatus(MovieStatus.WATCHED);
        movie.setWatchedAt(LocalDateTime.now());
        return movieRepository.save(movie);
    }

    @Override
    public void deleteMovie(Long id) {
        if (!movieRepository.existsById(id)) {
            throw new EntityNotFoundException("Movie not found with id: " + id);
        }
        movieRepository.deleteById(id);
    }
}
