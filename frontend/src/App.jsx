import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import WatchlistPage from './pages/WatchlistPage';
import WatchedPage from './pages/WatchedPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/watchlist" replace />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/watched" element={<WatchedPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
