import { NavLink } from 'react-router-dom';

function Navbar() {
  const linkClasses = ({ isActive }) =>
    `px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-primary-600 text-white'
        : 'text-gray-600 hover:bg-gray-200'
    }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🎬</span>
            <span className="text-xl font-bold text-gray-800">Movie Booker</span>
          </div>
          
          <div className="flex space-x-2">
            <NavLink to="/watchlist" className={linkClasses}>
              Watchlist
            </NavLink>
            <NavLink to="/watched" className={linkClasses}>
              Already Watched
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
