/**
 * Travel Planner - Search Bar Component
 * 
 * @author Mark Mikile Mutunga
 * @email markmiki03@gmail.com
 * @phone +254 707 678 643
 * @copyright (c) 2025 Mark Mikile Mutunga. All rights reserved.
 * @license MIT License
 * 
 * Description: Search component for finding travel destinations worldwide.
 * Features beautiful gradient design and responsive user interface.
 */

import { useState } from 'react';

const SearchBar = ({ onSearch, isSearching }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-300"></div>
        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl p-6 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="space-y-4">
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                Where do you want to explore?
              </label>
              <div className="flex items-end space-x-4">
                <input
                  id="destination"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try 'Kenya', 'Madagascar', 'Iceland' or any destination..."
                  className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition duration-200"
                />
                <button
                  type="submit"
                  disabled={isSearching || !query.trim()}
                  className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 dark:hover:from-green-600 dark:hover:to-emerald-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
                >
                  {isSearching ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Exploring...</span>
                    </div>
                  ) : (
                    'Discover'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
