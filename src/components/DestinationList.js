/**
 * Travel Planner - Destination List Component
 * 
 * @author Mark Mikile Mutunga
 * @email markmiki03@gmail.com
 * @phone +254 707 678 643
 * @copyright (c) 2025 Mark Mikile Mutunga. All rights reserved.
 * @license MIT License
 * 
 * Description: Grid layout component for displaying multiple destination cards
 * with loading states and responsive design.
 */

import DestinationCard from './DestinationCard';

const DestinationList = ({ destinations, onDestinationSelect, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 dark:border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Searching for amazing destinations...</p>
        </div>
      </div>
    );
  }

  if (!destinations || destinations.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🗺️</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 transition-colors duration-300">No destinations found</h3>
        <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Try searching for a different city or country</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
            Found {destinations.length} destination{destinations.length !== 1 ? 's' : ''}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">Click on any destination to see more details</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id || index}
              destination={destination}
              onClick={onDestinationSelect}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationList;
