import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Mazingira
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-green-200">
              Home
            </Link>
            <Link to="/organizations" className="hover:text-green-200">
              Organizations
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;