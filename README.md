# Movie Booker

A full-stack movie tracking application to manage your watchlist and track movies you've watched.

## Tech Stack

- **Backend**: Java Spring Boot 3.2
- **Frontend**: React 18 + Vite + Tailwind CSS
- **Database**: Microsoft SQL Server

## Prerequisites

- Java 17+
- Node.js 18+
- Microsoft SQL Server
- Maven 3.8+

## Database Setup

1. Create a database named `movie_booker` in SQL Server:

```sql
CREATE DATABASE movie_booker;
```

2. Update the database credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=movie_booker;encrypt=true;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=YourPassword123
```

## Running the Application

### Backend

```bash
cd backend
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | Get all movies |
| GET | `/api/movies?status=watchlist` | Get watchlist movies |
| GET | `/api/movies?status=watched` | Get watched movies |
| GET | `/api/movies/{id}` | Get movie by ID |
| POST | `/api/movies` | Create new movie |
| PATCH | `/api/movies/{id}/watched` | Mark movie as watched |
| DELETE | `/api/movies/{id}` | Delete movie |

### Create Movie Request Body

```json
{
  "title": "Inception",
  "author": "Christopher Nolan",
  "description": "A mind-bending thriller",
  "rating": 5
}
```

## Features

- **Watchlist Page**: Add movies to your watchlist with title, director, description, and rating (1-5 stars)
- **Already Watched Page**: View movies you've completed watching
- **Mark as Watched**: Move movies from watchlist to watched with a single click
- **Delete**: Remove movies from either list
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
movie_booker/
├── backend/
│   ├── src/main/java/com/moviebooker/
│   │   ├── config/          # CORS configuration
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Data transfer objects
│   │   ├── entity/          # JPA entities
│   │   ├── exception/       # Exception handlers
│   │   ├── repository/      # Spring Data repositories
│   │   └── service/         # Business logic
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── api/             # API service
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app with routing
│   │   └── main.jsx         # Entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```
