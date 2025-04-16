import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Bell, User, Menu, Upload, X, ChevronDown, Film, Tv, Clock, Heart, Star, Sun, Moon, TrendingUp, LogOut, Settings, UserCircle } from 'lucide-react';
import { useTheme } from '../contexts/Theme';
import Image from 'next/image'
//import Searcher from '../../components/search/searcher';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState('');
  const { theme, toggleTheme } = useTheme();

  // Handle header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dropdowns = {
    movies: [
      // { icon: <Star size={16} />, label: 'Top Rated', href: '/movies/topRate' },
      // { icon: <TrendingUp size={16} />, label: 'Trending', href: '/movies/trending' },
      { icon: <Film size={16} />, label: 'New Releases', href: '/movies/new' },
      { icon: <Clock size={16} />, label: 'Coming Soon', href: '/movies/upcoming' },
      { icon: <Upload size={16} />, label: 'Upload Movie', href: '/AdminAuth/signin' }, 
    ],
    series: [
      // { icon: <Star size={16} />, label: 'Popular Shows', href: '/series/popular' },
      { icon: <Tv size={16} />, label: 'Latest Episodes', href: '/series/latest' },
      { icon: <Clock size={16} />, label: 'Upcoming Series', href: '/series/upcoming' },
    ],
    // profile: [
    //   { icon: <UserCircle size={16} />, label: 'Profile', href: '/profile/profile' },
    //   { icon: <Settings size={16} />, label: 'Settings', href: '/settings/settings' },
    //   { icon: <LogOut size={16} />, label: 'Logout', href: '/logout' },
    // ]
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[var(--header-bg)] backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-[var(--header-bg)] to-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src={theme === 'dark' ? '/logos/FALCON EYE PHILMZ REVERMPED LOGO (3).jpg' : '/logos/FALCON EYE LOGO.png'}
                alt="Logo"
                className="w-12 h-12 rounded-full"
              />
              <span className="text-xl font-bold text-[var(--foreground)]">
                Falcon Eye Philmz
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Movies Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('movies')}
              onMouseLeave={() => setActiveDropdown('')}
            >
              <button className="flex items-center space-x-1 text-white group">
                <span className="text-base font-medium group-hover:text-blue-400 transition-colors">Movies</span>
                <ChevronDown size={16} className="group-hover:text-blue-400 group-hover:rotate-180 transition-all duration-300" />
              </button>
              {activeDropdown === 'movies' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                  {dropdowns.movies.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-blue-400 transition-all"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Series Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('series')}
              onMouseLeave={() => setActiveDropdown('')}
            >
              <button className="flex items-center space-x-1 text-white group">
                <span className="text-base font-medium group-hover:text-blue-400 transition-colors">Series</span>
                <ChevronDown size={16} className="group-hover:text-blue-400 group-hover:rotate-180 transition-all duration-300" />
              </button>
              {activeDropdown === 'series' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                  {dropdowns.series.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-blue-400 transition-all"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* <Link 
              href="/new/newreleased" 
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              <span>New Released</span>
            </Link> */}
             <Link 
                href="/context/CartContext" 
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Heart size={16} />
                <span>My Wishlist</span>
              </Link>
          

            <Link 
              href="/view/Merchandise" 
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              <span>Merchandize</span>
            </Link>

            <Link 
              href="/view/Events" 
              className="text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
            >
              <span>Events</span>
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ..."
                className="w-28 bg-gray-800/50 rounded-full py-1.5 px-4 text-sm text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-gray-800
                         transition-all duration-300 focus:w-64"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search size={16} className="text-gray-400 hover:text-blue-400 transition-colors" />
              </button>
            </form>

            {/* Notifications */}
            {/* <button className="text-white hover:text-blue-400 transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button> */}

            {/* User Profile Dropdown */}
            {/* <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('profile')}
              onMouseLeave={() => setActiveDropdown('')}
            >
              <button className="text-white hover:text-blue-400 transition-colors">
                <User size={20} />
              </button>
              {activeDropdown === 'profile' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                  {dropdowns.profile.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-blue-400 transition-all"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div> */}

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white hover:text-blue-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-4 dark:bg-gray-900/95 light:bg-white/95 backdrop-blur-sm border-t dark:border-gray-800 light:border-gray-200">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies & series..."
                  className="w-full bg-gray-800/50 rounded-full py-2 px-4 text-sm text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-gray-800"
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search size={16} className="text-gray-400" />
                </button>
              </div>
            </form>

            <nav className="flex flex-col space-y-4">
              {dropdowns.movies.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              {dropdowns.series.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              <Link 
                href="/new/newreleased" 
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Clock size={16} />
                <span>New Released</span>
              </Link>
              <Link 
                href="/wishlist/wishlistpage" 
                className="flex items-center space-x-2 text-sm text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Heart size={16} />
                <span>My Wishlist</span>
              </Link>
            </nav>

            <button 
              onClick={toggleTheme}
              className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors mt-4"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
