# Copilot instructions for `movie_booker`

## Big picture
- Monorepo with two apps:
  - `backend/`: Spring Boot 3.2 REST API + JPA (MSSQL)
  - `frontend/`: React (Vite) + Tailwind CSS UI
- Data flow: React calls relative `/api/...` → Vite dev proxy forwards to Spring (`http://localhost:8080`) → Spring persists via JPA to SQL Server.

## How to run locally
- Database: create the `movie_booker` database in SQL Server (tables are auto-created/updated by Hibernate because `spring.jpa.hibernate.ddl-auto=update`).
- Backend (port 8080):
  - From `backend/`: `mvn spring-boot:run`
  - Config lives in `backend/src/main/resources/application.properties`.
  - Note: the current datasource config uses SQL username/password; SQL Server must allow SQL logins (Mixed Mode). If using Windows-only auth, you must switch to integrated security instead.
- Frontend (port 5173):
  - From `frontend/`: `npm install` then `npm run dev`
  - Vite proxy is configured in `frontend/vite.config.js` (`/api` → `http://localhost:8080`). Keep API calls relative (don’t hardcode `localhost:8080` in components).

## Backend architecture & conventions
- Layering:
  - Controller: `com.moviebooker.controller.MovieController`
  - Service interface + impl: `com.moviebooker.service.MovieService` / `com.moviebooker.service.impl.MovieServiceImpl`
  - Repository: `com.moviebooker.repository.MovieRepository` (Spring Data JPA)
- Entity: `com.moviebooker.entity.Movie`
  - DB table name is `movies`.
  - DB columns use snake_case via `@Column(name=...)` but JSON uses Java field names (`createdAt`, `watchedAt`) via Jackson defaults.
  - `@PrePersist` sets `createdAt=now()` and defaults `status=WATCHLIST`.
  - Rating is validated as integer 1–5.
- Status enum: `com.moviebooker.entity.MovieStatus` (`WATCHLIST`, `WATCHED`).
  - Query param accepts lowercase in the UI (`watchlist`/`watched`) because controller uppercases before `MovieStatus.valueOf(...)`.
- Errors:
  - `com.moviebooker.exception.GlobalExceptionHandler` maps `EntityNotFoundException` to 404 and validation errors to 400.

## API contract (what the frontend relies on)
- Base path: `/api/movies`
- Key endpoints:
  - `GET /api/movies?status=watchlist|watched`
  - `POST /api/movies` body matches `com.moviebooker.dto.CreateMovieRequest`
  - `PATCH /api/movies/{id}/watched` sets status to `WATCHED` and `watchedAt=now()`
  - `DELETE /api/movies/{id}`

## Frontend conventions
- Routing:
  - `frontend/src/App.jsx` defines `/watchlist` and `/watched`.
- API client:
  - Centralize HTTP calls in `frontend/src/api/movieApi.js` (Axios instance with baseURL `/api/movies`).
- UI patterns:
  - Tailwind classes throughout; `primary.*` palette is defined in `frontend/tailwind.config.js`.
  - Watchlist page adds movies and supports “mark as watched” (`frontend/src/pages/WatchlistPage.jsx`).
  - Watched page is read-only besides delete (`frontend/src/pages/WatchedPage.jsx`).
