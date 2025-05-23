import React, { useState, useEffect, useContext } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../context/userContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { userData, setUserData } = useContext(UserDataContext);



  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem('token'));
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all border-b border-gray-700 duration-300 ${isScrolled
        ? 'bg-transparent/95 rounded-md backdrop-blur-2xl border-b border-gray-300'
        : 'bg-transparent'
        } py-4`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">
              LinkShield
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="text-gray-200 hover:text-white transition-colors">Try it now!</Link>
            <a href="#" className="text-gray-200 hover:text-white transition-colors">About</a>
            {!token && (
              <div className='flex gap-2'>
                <Link to="/signup" className="bg-white border-1 hover:bg-black hover:text-white text-black px-4 py-2 rounded-lg transition-colors">
                  SignUp
                </Link>
                <Link to="/login" className="bg-white border-1 hover:bg-black hover:text-white text-black px-4 py-2 rounded-lg transition-colors">
                  Login
                </Link>
              </div>
            )}
            {token && (
              <Link to="/" onClick={handleLogout} className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg transition-colors">
                Logout
              </Link>
            )}
          </nav>


          <button
            className="md:hidden text-gray-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 px-2 bg-gray-800 rounded-lg">
            <nav className="flex flex-col space-y-4">
              <a href="#feature" className="text-gray-400 hover:text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                Features
              </a>
              <a href="#" className="text-gray-400 hover:text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                About
              </a>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mx-4">
                Signup
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;