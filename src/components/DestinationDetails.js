import { useState, useEffect } from 'react';
import amadeusAPI from '../services/amadeusAPI';

export default function DestinationDetails({ destination, onBack }) {
  const [flightOffers, setFlightOffers] = useState([]);
  const [hotelOffers, setHotelOffers] = useState([]);
  const [isLoadingFlights, setIsLoadingFlights] = useState(false);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadFlightOffers();
    loadHotelOffers();
  }, [destination]);

  const loadFlightOffers = async () => {
    setIsLoadingFlights(true);
    try {
      // For demo, we'll use mock data since we need origin city
      const mockFlights = [
        {
          id: '1',
          price: { total: '450.99', currency: 'USD' },
          itineraries: [
            {
              duration: 'PT8H30M',
              segments: [
                {
                  departure: { iataCode: 'NYC', at: '2024-03-15T08:00:00' },
                  arrival: { iataCode: destination.iataCode || 'PAR', at: '2024-03-15T20:30:00' },
                  carrierCode: 'AF',
                  aircraft: { code: '777' }
                }
              ]
            }
          ]
        },
        {
          id: '2',
          price: { total: '523.50', currency: 'USD' },
          itineraries: [
            {
              duration: 'PT12H15M',
              segments: [
                {
                  departure: { iataCode: 'NYC', at: '2024-03-15T14:30:00' },
                  arrival: { iataCode: destination.iataCode || 'PAR', at: '2024-03-16T08:45:00' },
                  carrierCode: 'LH',
                  aircraft: { code: 'A350' }
                }
              ]
            }
          ]
        }
      ];
      setFlightOffers(mockFlights);
    } catch (error) {
      console.error('Error loading flights:', error);
    } finally {
      setIsLoadingFlights(false);
    }
  };

  const loadHotelOffers = async () => {
    setIsLoadingHotels(true);
    try {
      const mockHotels = [
        {
          hotel: {
            hotelId: '1',
            name: `Grand Hotel ${destination.name}`,
            rating: 5,
            contact: { phone: '+1-234-567-8900' }
          },
          offers: [
            {
              id: 'offer1',
              price: { total: '120.00', currency: 'USD' },
              room: { type: 'DELUXE', typeEstimated: { category: 'DELUXE_ROOM' } },
              rateFamilyEstimated: { code: 'SRS', type: 'P' }
            }
          ]
        },
        {
          hotel: {
            hotelId: '2',
            name: `Boutique Inn ${destination.name}`,
            rating: 4,
            contact: { phone: '+1-234-567-8901' }
          },
          offers: [
            {
              id: 'offer2',
              price: { total: '85.00', currency: 'USD' },
              room: { type: 'STANDARD', typeEstimated: { category: 'STANDARD_ROOM' } },
              rateFamilyEstimated: { code: 'SRS', type: 'P' }
            }
          ]
        }
      ];
      setHotelOffers(mockHotels);
    } catch (error) {
      console.error('Error loading hotels:', error);
    } finally {
      setIsLoadingHotels(false);
    }
  };

  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+)H(\d+)M/);
    if (match) {
      return `${match[1]}h ${match[2]}m`;
    }
    return duration;
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Destination Hero */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        {destination.image && (
          <div className="absolute inset-0">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-emerald-600/80"></div>
          </div>
        )}
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
          <p className="text-xl opacity-90">
            {destination.address?.countryName}
            {destination.address?.stateCode && `, ${destination.address.stateCode}`}
          </p>
          {destination.description && (
            <p className="mt-4 text-lg opacity-90 max-w-2xl">
              {destination.description}
            </p>
          )}
          <div className="mt-6 flex items-center space-x-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
              {destination.subType || 'City'}
            </span>
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm flex items-center">
              ⭐ 4.8 Rating
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'flights', 'hotels'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition duration-200 ${
                  activeTab === tab
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Discover the beauty and culture of {destination.name}. This amazing destination offers
                incredible experiences, rich history, and unforgettable memories waiting to be made.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">📍</span>
                  <span className="text-gray-700">
                    {destination.address?.countryName}
                    {destination.address?.stateCode && `, ${destination.address.stateCode}`}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">🦁</span>
                  <span className="text-gray-700">Amazing wildlife and nature</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">🍽️</span>
                  <span className="text-gray-700">Authentic local cuisine</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-green-600">🎭</span>
                  <span className="text-gray-700">Rich cultural heritage</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Destination Type</span>
                  <span className="font-medium">{destination.subType || 'City'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Country</span>
                  <span className="font-medium">{destination.address?.countryName}</span>
                </div>
                {destination.address?.stateCode && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">State/Region</span>
                    <span className="font-medium">{destination.address.stateCode}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flights' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Flight Offers</h2>
              <p className="text-gray-600">Showing flights to {destination.name}</p>
            </div>
            
            {isLoadingFlights ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Finding best flights...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {flightOffers.map((offer) => (
                  <div key={offer.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-green-600">
                          ${offer.price.total}
                        </div>
                        <div className="text-gray-500">{offer.price.currency}</div>
                      </div>
                      <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
                        Select Flight
                      </button>
                    </div>
                    
                    {offer.itineraries[0] && (
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {offer.itineraries[0].segments[0].departure.iataCode}
                          </span>
                          <span>
                            {formatTime(offer.itineraries[0].segments[0].departure.at)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="border-t border-gray-300 flex-1 mx-4"></div>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {formatDuration(offer.itineraries[0].duration)}
                          </span>
                          <div className="border-t border-gray-300 flex-1 mx-4"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {offer.itineraries[0].segments[0].arrival.iataCode}
                          </span>
                          <span>
                            {formatTime(offer.itineraries[0].segments[0].arrival.at)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'hotels' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Hotel Offers</h2>
              <p className="text-gray-600">Showing hotels in {destination.name}</p>
            </div>
            
            {isLoadingHotels ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Finding amazing hotels...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {hotelOffers.map((hotelOffer) => (
                  <div key={hotelOffer.hotel.hotelId} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                    <div className="h-48 bg-gradient-to-r from-green-400 to-emerald-500 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-white text-6xl">🏨</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{hotelOffer.hotel.name}</h3>
                        <div className="flex items-center">
                          {[...Array(hotelOffer.hotel.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">⭐</span>
                          ))}
                        </div>
                      </div>
                      
                      {hotelOffer.offers[0] && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-600">
                                {hotelOffer.offers[0].room.typeEstimated?.category || 'Room'}
                              </p>
                              <p className="text-2xl font-bold text-green-600">
                                ${hotelOffer.offers[0].price.total}/night
                              </p>
                            </div>
                            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
                              Book Now
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
