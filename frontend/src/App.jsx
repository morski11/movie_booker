import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import CreateMovieModal from './components/CreateMovieModal';
import WatchlistPage from './pages/WatchlistPage';
import WatchedPage from './pages/WatchedPage';

function App() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const openCreateModal = () => setIsCreateOpen(true);
  const closeCreateModal = () => setIsCreateOpen(false);

  const handleMovieCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar onAddMovie={openCreateModal} />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/watchlist" replace />} />
            <Route path="/watchlist" element={<WatchlistPage refreshKey={refreshKey} />} />
            <Route path="/watched" element={<WatchedPage />} />
          </Routes>
        </main>

        <CreateMovieModal
          open={isCreateOpen}
          onClose={closeCreateModal}
          onMovieCreated={handleMovieCreated}
        />
      </div>
    </Router>
  );
}

export default App;
