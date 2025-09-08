/**
 * Travel Planner - Main Application Component
 * 
 * @author Mark Mikile Mutunga
 * @email markmiki03@gmail.com
 * @phone +254 707 678 643
 * @copyright (c) 2025 Mark Mikile Mutunga. All rights reserved.
 * @license MIT License
 * 
 * Description: Main React component for the Travel Planner application.
 * Handles destination search, flight booking, and hotel reservations.
 */

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import DestinationList from './components/DestinationList';
import DestinationDetails from './components/DestinationDetails';
import amadeusAPI from './services/amadeusAPI';

export default function App() {
  const [destinations, setDestinations] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [currentView, setCurrentView] = useState('search'); // 'search' or 'details'

  const handleSearch = async (query) => {
    setIsSearching(true);
    setSearchPerformed(true);
    setDestinations([]);
    setCurrentView('search');
    
    try {
      const results = await amadeusAPI.searchDestinations(query);
      setDestinations(results);
    } catch (error) {
      console.error('Search error:', error);
      
      // Smart fallback: Filter destinations based on the search query
      const allDestinations = [
        {
          id: '1',
          name: 'Nairobi',
          subType: 'CITY',
          iataCode: 'NBO',
          address: { countryName: 'Kenya', stateCode: 'NAI' },
          image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop&q=80',
          description: 'The Green City in the Sun, gateway to African safari adventures'
        },
        {
          id: '2', 
          name: 'Paris',
          subType: 'CITY',
          iataCode: 'CDG',
          address: { countryName: 'France', stateCode: 'IDF' },
          image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=500&fit=crop&q=80',
          description: 'City of Light with iconic landmarks and romantic charm'
        },
        {
          id: '3',
          name: 'Tokyo',
          subType: 'CITY',
          iataCode: 'NRT',
          address: { countryName: 'Japan', stateCode: 'TK' },
          image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop&q=80',
          description: 'Modern metropolis blending tradition with cutting-edge technology'
        },
        {
          id: '4',
          name: 'Cape Town',
          subType: 'CITY', 
          iataCode: 'CPT',
          address: { countryName: 'South Africa', stateCode: 'WC' },
          image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=500&fit=crop&q=80',
          description: 'Mother City with stunning Table Mountain and wine regions'
        },
        {
          id: '5',
          name: 'New York',
          subType: 'CITY',
          iataCode: 'JFK', 
          address: { countryName: 'United States', stateCode: 'NY' },
          image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=500&fit=crop&q=80',
          description: 'The Big Apple - vibrant city that never sleeps'
        },
        {
          id: '6',
          name: 'Reykjavik',
          subType: 'CITY',
          iataCode: 'KEF',
          address: { countryName: 'Iceland', stateCode: 'RE' },
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop&q=80',
          description: 'Northern lights, geysers, and dramatic Nordic beauty'
        },
        {
          id: '7',
          name: 'Sydney',
          subType: 'CITY',
          iataCode: 'SYD',
          address: { countryName: 'Australia', stateCode: 'NSW' },
          image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=500&fit=crop&q=80',
          description: 'Harbour city with iconic Opera House and beautiful beaches'
        },
        {
          id: '8',
          name: 'Marrakech',
          subType: 'CITY',
          iataCode: 'RAK',
          address: { countryName: 'Morocco', stateCode: 'MA' },
          image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d15e9e?w=800&h=500&fit=crop&q=80',
          description: 'Red City with vibrant souks and Atlas Mountain views'
        },
        {
          id: '9',
          name: 'Mombasa',
          subType: 'CITY',
          iataCode: 'MBA',
          address: { countryName: 'Kenya', stateCode: 'MBA' },
          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop&q=80',
          description: 'Coastal paradise with beautiful beaches and Swahili culture'
        },
        {
          id: '10',
          name: 'Johannesburg',
          subType: 'CITY',
          iataCode: 'JNB',
          address: { countryName: 'South Africa', stateCode: 'GP' },
          image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=800&h=500&fit=crop&q=80',
          description: 'City of Gold with rich history and vibrant culture'
        },
        {
          id: '11',
          name: 'Casablanca',
          subType: 'CITY',
          iataCode: 'CMN',
          address: { countryName: 'Morocco', stateCode: 'CA' },
          image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=500&fit=crop&q=80',
          description: 'Economic capital with stunning Hassan II Mosque'
        },
        {
          id: '12',
          name: 'London',
          subType: 'CITY',
          iataCode: 'LHR',
          address: { countryName: 'United Kingdom', stateCode: 'ENG' },
          image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=500&fit=crop&q=80',
          description: 'Historic capital with iconic landmarks and royal heritage'
        }
      ];

      // Filter destinations based on search query
      const searchTerm = query.toLowerCase().trim();
      const filteredDestinations = allDestinations.filter(destination => {
        return (
          destination.name.toLowerCase().includes(searchTerm) ||
          destination.address.countryName.toLowerCase().includes(searchTerm) ||
          destination.description.toLowerCase().includes(searchTerm) ||
          destination.iataCode.toLowerCase().includes(searchTerm)
        );
      });

      // If no matches found, show a message by setting empty array
      setDestinations(filteredDestinations);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDestinationSelect = (destination) => {
    setSelectedDestination(destination);
    setCurrentView('details');
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedDestination(null);
  };

  if (currentView === 'details' && selectedDestination) {
    return (
      <DestinationDetails
        destination={selectedDestination}
        onBack={handleBackToSearch}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
        <div className="relative px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Plan Your Perfect</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 animate-pulse">
                Adventure
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
              Discover amazing destinations worldwide, find the best flights and hotels, and create unforgettable travel experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative px-4 pb-8 sm:px-6 lg:px-8">
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
      </div>

      {/* Results Section */}
      {searchPerformed && (
        <DestinationList
          destinations={destinations}
          onDestinationSelect={handleDestinationSelect}
          isLoading={isSearching}
        />
      )}

      {/* Features Section - Only show if no search performed */}
      {!searchPerformed && (
        <div className="px-4 py-16 bg-white/50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need for Your Journey</h2>
              <p className="text-xl text-gray-600">Explore destinations worldwide, from bustling cities to hidden gems</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon="🌍"
                title="Global Destinations"
                description="Explore amazing cities and countries worldwide, from African safaris to European capitals"
              />
              <FeatureCard
                icon="✈️"
                title="Best Flight Deals"
                description="Compare flight prices and airlines to get the best deals for any destination"
              />
              <FeatureCard
                icon="🏨"
                title="Perfect Accommodations"
                description="Find and book hotels that match your style and budget anywhere in the world"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition duration-300 border border-gray-100">
      <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
