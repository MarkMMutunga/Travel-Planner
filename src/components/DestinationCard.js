/**
 * Travel Planner - Destination Card Component
 * 
 * @author Mark Mikile Mutunga
 * @email markmiki03@gmail.com
 * @phone +254 707 678 643
 * @copyright (c) 2025 Mark Mikile Mutunga. All rights reserved.
 * @license MIT License
 * 
 * Description: Interactive destination card with beautiful imagery and hover effects.
 * Displays destination information with professional UI design.
 */

const DestinationCard = ({ destination, onClick }) => {
  return (
    <div 
      onClick={() => onClick(destination)}
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 cursor-pointer overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-400"
    >
      {/* Real destination images */}
      <div className="h-40 sm:h-48 relative overflow-hidden">
        {destination.image ? (
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            onError={(e) => {
              // Fallback to a beautiful gradient if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="h-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 absolute inset-0 flex items-center justify-center" 
             style={{ display: destination.image ? 'none' : 'flex' }}>
          <div className="text-white text-6xl">
            {destination.subType === 'LANDMARK' ? '🏔️' : '🌍'}
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
          <h3 className="text-lg sm:text-xl font-bold">{destination.name}</h3>
          <p className="text-green-100 text-sm">{destination.address?.countryName}</p>
        </div>
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <span className="px-3 py-1 bg-green-600/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            {destination.subType === 'LANDMARK' ? 'Landmark' : 'City'}
          </span>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        {destination.description && (
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 transition-colors duration-300">
            {destination.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300 transition-colors duration-300">
            {destination.subType || 'City'}
          </span>
          <div className="flex items-center text-yellow-400">
            ⭐ <span className="ml-1 text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300">4.8</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center transition-colors duration-300">
            <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse mr-2"></div>
            Explore destination
          </span>
          <div className="text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
