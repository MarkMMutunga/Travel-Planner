/**
 * Travel Planner - Destination Details Component
 * 
 * @author Mark Mikile Mutunga
 * @email markmiki03@gmail.com
 * @phone +254 707 678 643
 * @copyright (c) 2025 Mark Mikile Mutunga. All rights reserved.
 * @license MIT License
 * 
 * Description: Comprehensive destination view with flight booking, hotel reservations,
 * and detailed travel information. Features real airline integration and hotel imagery.
 */

import { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import amadeusAPI from '../services/amadeusAPI';

export default function DestinationDetails({ destination, onBack }) {
  const { isDarkMode } = useDarkMode();
  const [flightOffers, setFlightOffers] = useState([]);
  const [hotelOffers, setHotelOffers] = useState([]);
  const [isLoadingFlights, setIsLoadingFlights] = useState(false);
  const [isLoadingHotels, setIsLoadingHotels] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingType, setBookingType] = useState(''); // 'flight' or 'hotel'
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    passengers: 1,
    checkIn: '',
    checkOut: '',
    specialRequests: ''
  });

  useEffect(() => {
    loadFlightOffers();
    loadHotelOffers();
  }, [destination]);

  const getAirlineName = (carrierCode) => {
    const airlines = {
      'AA': 'American Airlines',
      'DL': 'Delta Air Lines',
      'UA': 'United Airlines',
      'AF': 'Air France',
      'LH': 'Lufthansa',
      'BA': 'British Airways',
      'EK': 'Emirates',
      'QR': 'Qatar Airways',
      'SQ': 'Singapore Airlines',
      'TK': 'Turkish Airlines',
      'KL': 'KLM Royal Dutch Airlines',
      'VS': 'Virgin Atlantic',
      'AC': 'Air Canada',
      'NH': 'All Nippon Airways',
      'JL': 'Japan Airlines'
    };
    return airlines[carrierCode] || 'Airline';
  };

  const getDestinationFlights = (destinationName) => {
    const flightRoutes = {
      'Paris': [
        { from: 'JFK', to: 'CDG', carriers: ['AF', 'DL', 'AA'], duration: 'PT7H15M' },
        { from: 'LAX', to: 'CDG', carriers: ['AF', 'UA', 'VS'], duration: 'PT11H30M' },
        { from: 'ORD', to: 'CDG', carriers: ['AA', 'UA', 'AF'], duration: 'PT8H45M' }
      ],
      'London': [
        { from: 'JFK', to: 'LHR', carriers: ['BA', 'AA', 'VS'], duration: 'PT6H50M' },
        { from: 'LAX', to: 'LHR', carriers: ['BA', 'UA', 'VS'], duration: 'PT11H15M' },
        { from: 'ORD', to: 'LHR', carriers: ['BA', 'AA', 'UA'], duration: 'PT8H20M' }
      ],
      'Tokyo': [
        { from: 'JFK', to: 'NRT', carriers: ['NH', 'JL', 'UA'], duration: 'PT14H30M' },
        { from: 'LAX', to: 'NRT', carriers: ['NH', 'JL', 'AA'], duration: 'PT11H45M' },
        { from: 'SFO', to: 'NRT', carriers: ['NH', 'JL', 'UA'], duration: 'PT10H55M' }
      ],
      'Dubai': [
        { from: 'JFK', to: 'DXB', carriers: ['EK', 'QR'], duration: 'PT12H30M' },
        { from: 'LAX', to: 'DXB', carriers: ['EK', 'QR'], duration: 'PT16H15M' },
        { from: 'ORD', to: 'DXB', carriers: ['EK', 'QR'], duration: 'PT13H45M' }
      ],
      'Singapore': [
        { from: 'JFK', to: 'SIN', carriers: ['SQ', 'NH'], duration: 'PT18H30M' },
        { from: 'LAX', to: 'SIN', carriers: ['SQ', 'UA'], duration: 'PT17H15M' },
        { from: 'SFO', to: 'SIN', carriers: ['SQ', 'UA'], duration: 'PT16H45M' }
      ]
    };

    return flightRoutes[destinationName] || [
      { from: 'JFK', to: 'XXX', carriers: ['AA', 'DL', 'UA'], duration: 'PT8H00M' },
      { from: 'LAX', to: 'XXX', carriers: ['AA', 'DL', 'UA'], duration: 'PT12H00M' }
    ];
  };

  const loadFlightOffers = async () => {
    setIsLoadingFlights(true);
    try {
      const routes = getDestinationFlights(destination.name);
      const mockFlights = [];

      routes.forEach((route, routeIndex) => {
        route.carriers.forEach((carrier, carrierIndex) => {
          const basePrice = 350 + (Math.random() * 400);
          const departureTime = new Date();
          departureTime.setDate(departureTime.getDate() + 7); // One week from now
          departureTime.setHours(8 + (carrierIndex * 4), Math.floor(Math.random() * 60));

          const arrivalTime = new Date(departureTime);
          const durationMatch = route.duration.match(/PT(\d+)H(\d+)M/);
          if (durationMatch) {
            arrivalTime.setHours(arrivalTime.getHours() + parseInt(durationMatch[1]));
            arrivalTime.setMinutes(arrivalTime.getMinutes() + parseInt(durationMatch[2]));
          }

          mockFlights.push({
            id: `${routeIndex}-${carrierIndex}`,
            price: { total: basePrice.toFixed(2), currency: 'USD' },
            airline: getAirlineName(carrier),
            carrierCode: carrier,
            itineraries: [
              {
                duration: route.duration,
                segments: [
                  {
                    departure: { 
                      iataCode: route.from, 
                      at: departureTime.toISOString(),
                      cityName: route.from === 'JFK' ? 'New York' : route.from === 'LAX' ? 'Los Angeles' : route.from === 'ORD' ? 'Chicago' : route.from === 'SFO' ? 'San Francisco' : 'Origin'
                    },
                    arrival: { 
                      iataCode: route.to, 
                      at: arrivalTime.toISOString(),
                      cityName: destination.name
                    },
                    carrierCode: carrier,
                    aircraft: { 
                      code: carrier === 'EK' ? 'A380' : carrier === 'BA' ? '787' : carrier === 'AF' ? 'A350' : '777'
                    },
                    stops: Math.random() > 0.7 ? 1 : 0
                  }
                ]
              }
            ]
          });
        });
      });

      // Sort by price
      mockFlights.sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total));
      setFlightOffers(mockFlights.slice(0, 6)); // Show top 6 flights
    } catch (error) {
      console.error('Error loading flights:', error);
    } finally {
      setIsLoadingFlights(false);
    }
  };

  const getDestinationHotels = (destinationName) => {
    const hotelData = {
      'Nairobi': [
        { name: 'Villa Rosa Kempinski', rating: 5, type: 'LUXURY', basePrice: 350, amenities: ['Spa', 'Fine Dining', 'City Views', 'Business Center'] },
        { name: 'The Sarova Stanley', rating: 5, type: 'LUXURY', basePrice: 320, amenities: ['Historic Hotel', 'Thorn Tree Café', 'Central Location'] },
        { name: 'Fairmont The Norfolk Hotel', rating: 5, type: 'LUXURY', basePrice: 400, amenities: ['Colonial Heritage', 'Gardens', 'Lord Delamere Terrace'] },
        { name: 'Hemingways Nairobi', rating: 4, type: 'BOUTIQUE', basePrice: 280, amenities: ['Karen Location', 'Boutique Luxury', 'Elephant Orphanage nearby'] },
        { name: 'Best Western Plus Meridian Hotel', rating: 4, type: 'BUSINESS', basePrice: 180, amenities: ['Business Center', 'Airport Shuttle', 'Modern Amenities'] },
        { name: 'Wildebeest Eco Camp', rating: 3, type: 'BUDGET', basePrice: 65, amenities: ['Eco-Friendly', 'Safari Access', 'Cultural Experience'] }
      ],
      'Mombasa': [
        { name: 'Serena Beach Resort & Spa', rating: 5, type: 'RESORT', basePrice: 420, amenities: ['Beach Front', 'Spa', 'Water Sports', 'Coral Reef Access'] },
        { name: 'Baobab Beach Resort', rating: 5, type: 'RESORT', basePrice: 380, amenities: ['All Inclusive', 'Private Beach', 'Multiple Pools', 'Kids Club'] },
        { name: 'Voyager Beach Resort', rating: 4, type: 'RESORT', basePrice: 320, amenities: ['Pirate Ship Design', 'Beach Access', 'Family Friendly'] },
        { name: 'Swahili Beach Resort', rating: 4, type: 'BOUTIQUE', basePrice: 280, amenities: ['Cultural Design', 'Ocean Views', 'Swahili Architecture'] },
        { name: 'PrideInn Paradise Beach Resort', rating: 4, type: 'BUSINESS', basePrice: 220, amenities: ['Conference Facilities', 'Beach Access', 'Good Value'] },
        { name: 'Backpackers Castle', rating: 3, type: 'BUDGET', basePrice: 45, amenities: ['Backpacker Friendly', 'Shared Facilities', 'Beach Nearby'] }
      ],
      'Cape Town': [
        { name: 'The Table Bay Hotel', rating: 5, type: 'LUXURY', basePrice: 450, amenities: ['Waterfront Location', 'Table Mountain Views', 'Marina Access'] },
        { name: 'Mount Nelson Hotel', rating: 5, type: 'LUXURY', basePrice: 520, amenities: ['Pink Palace', 'Historic Gardens', 'Afternoon Tea'] },
        { name: 'The Silo Hotel', rating: 5, type: 'LUXURY', basePrice: 680, amenities: ['Industrial Chic', 'Art Museum', 'Rooftop Views'] },
        { name: 'The Taj Cape Town', rating: 5, type: 'LUXURY', basePrice: 380, amenities: ['Historic Building', 'Spa', 'City Center'] },
        { name: 'Cape Grace Hotel', rating: 4, type: 'BOUTIQUE', basePrice: 320, amenities: ['Marina Views', 'Whisky Library', 'Yacht Access'] },
        { name: 'Once in Cape Town', rating: 3, type: 'BUDGET', basePrice: 85, amenities: ['Modern Hostel', 'City Bowl', 'Social Areas'] }
      ],
      'Johannesburg': [
        { name: 'Four Seasons Hotel The Westcliff', rating: 5, type: 'LUXURY', basePrice: 420, amenities: ['Clifftop Location', 'Spa', 'City Views', 'Fine Dining'] },
        { name: 'The Saxon Hotel', rating: 5, type: 'LUXURY', basePrice: 380, amenities: ['Villa Accommodation', 'Award Winning', 'Celebrity Favorite'] },
        { name: 'InterContinental Johannesburg', rating: 5, type: 'LUXURY', basePrice: 350, amenities: ['O.R. Tambo Location', 'Convention Center', 'Business Focus'] },
        { name: 'The Peech Hotel', rating: 4, type: 'BOUTIQUE', basePrice: 180, amenities: ['Eco-Friendly', 'Melville Location', 'Art Focus'] },
        { name: 'City Lodge Sandton', rating: 4, type: 'BUSINESS', basePrice: 120, amenities: ['Business District', 'Conference Facilities', 'Reliable Service'] },
        { name: 'Curiocity Backpackers', rating: 3, type: 'BUDGET', basePrice: 35, amenities: ['Maboneng Location', 'Arts District', 'Budget Friendly'] }
      ],
      'Marrakech': [
        { name: 'La Mamounia', rating: 5, type: 'LUXURY', basePrice: 680, amenities: ['Palace Hotel', 'Royal Gardens', 'Legendary Luxury', 'Historic Heritage'] },
        { name: 'Royal Mansour Marrakech', rating: 5, type: 'LUXURY', basePrice: 1200, amenities: ['Royal Palace', 'Private Riads', 'Ultimate Luxury'] },
        { name: 'Four Seasons Resort Marrakech', rating: 5, type: 'RESORT', basePrice: 520, amenities: ['Resort Setting', 'Spa', 'Atlas Mountain Views'] },
        { name: 'Riad Kniza', rating: 4, type: 'BOUTIQUE', basePrice: 280, amenities: ['Traditional Riad', 'Medina Location', 'Authentic Experience'] },
        { name: 'Hotel Almas', rating: 4, type: 'BUSINESS', basePrice: 150, amenities: ['Modern Hotel', 'Gueliz District', 'Business Amenities'] },
        { name: 'Equity Point Marrakech', rating: 3, type: 'BUDGET', basePrice: 45, amenities: ['Hostel Style', 'Medina Access', 'Social Atmosphere'] }
      ],
      'Casablanca': [
        { name: 'Four Seasons Hotel Casablanca', rating: 5, type: 'LUXURY', basePrice: 380, amenities: ['Ocean Views', 'Business District', 'Modern Luxury'] },
        { name: 'Hyatt Regency Casablanca', rating: 5, type: 'LUXURY', basePrice: 320, amenities: ['Twin Center Location', 'Spa', 'City Views'] },
        { name: 'Hotel & Spa Le Doge', rating: 4, type: 'BOUTIQUE', basePrice: 280, amenities: ['Relais & Châteaux', 'Spa Focus', 'Luxury Boutique'] },
        { name: 'Barceló Anfa Casablanca', rating: 4, type: 'BUSINESS', basePrice: 180, amenities: ['Business Center', 'Modern Design', 'Central Location'] },
        { name: 'Hotel Central', rating: 3, type: 'BUSINESS', basePrice: 120, amenities: ['Downtown Location', 'Historic Building', 'Good Value'] },
        { name: 'Youth Hostel Casablanca', rating: 2, type: 'BUDGET', basePrice: 35, amenities: ['Budget Option', 'Shared Facilities', 'City Center'] }
      ],
      'Paris': [
        { name: 'The Ritz Paris', rating: 5, type: 'LUXURY', basePrice: 850, amenities: ['Spa', 'Fine Dining', 'Concierge', 'Fitness Center'] },
        { name: 'Hotel Plaza Athénée', rating: 5, type: 'LUXURY', basePrice: 780, amenities: ['Spa', 'Michelin Restaurant', 'Shopping Access'] },
        { name: 'Le Meurice', rating: 5, type: 'LUXURY', basePrice: 720, amenities: ['Palace Service', 'Art Collection', 'Gourmet Restaurant'] },
        { name: 'Hotel des Grands Boulevards', rating: 4, type: 'BOUTIQUE', basePrice: 320, amenities: ['Rooftop Bar', 'Modern Design', 'Central Location'] },
        { name: 'Hotel Malte Opera', rating: 4, type: 'BUSINESS', basePrice: 220, amenities: ['Business Center', 'WiFi', 'Near Metro'] },
        { name: 'Hotel Jeanne d\'Arc', rating: 3, type: 'BUDGET', basePrice: 150, amenities: ['Historic Building', 'WiFi', 'Continental Breakfast'] }
      ],
      'London': [
        { name: 'The Savoy', rating: 5, type: 'LUXURY', basePrice: 650, amenities: ['Thames Views', 'Afternoon Tea', 'Butler Service'] },
        { name: 'Claridge\'s', rating: 5, type: 'LUXURY', basePrice: 600, amenities: ['Art Deco Design', 'Michelin Dining', 'Spa'] },
        { name: 'The Langham', rating: 5, type: 'LUXURY', basePrice: 550, amenities: ['Historic Luxury', 'Chuan Spa', 'Artesian Bar'] },
        { name: 'Hotel 41', rating: 4, type: 'BOUTIQUE', basePrice: 380, amenities: ['Buckingham Palace Views', 'Personal Service', 'Executive Lounge'] },
        { name: 'Premier Inn London', rating: 3, type: 'BUSINESS', basePrice: 180, amenities: ['Comfortable Beds', 'Family Friendly', 'Good Value'] },
        { name: 'YHA London Central', rating: 2, type: 'BUDGET', basePrice: 85, amenities: ['Shared Facilities', 'Social Areas', 'Budget Friendly'] }
      ],
      'Tokyo': [
        { name: 'The Peninsula Tokyo', rating: 5, type: 'LUXURY', basePrice: 750, amenities: ['Imperial Palace Views', 'Spa', 'Michelin Dining'] },
        { name: 'Aman Tokyo', rating: 5, type: 'LUXURY', basePrice: 800, amenities: ['Minimalist Design', 'Aman Spa', 'Garden Views'] },
        { name: 'Park Hyatt Tokyo', rating: 5, type: 'LUXURY', basePrice: 650, amenities: ['City Views', 'New York Grill', 'Lost in Translation Fame'] },
        { name: 'Hotel Gracery Shinjuku', rating: 4, type: 'BUSINESS', basePrice: 280, amenities: ['Godzilla Head', 'Central Shinjuku', 'Modern Comfort'] },
        { name: 'Capsule Inn Akihabara', rating: 3, type: 'BUDGET', basePrice: 45, amenities: ['Capsule Experience', 'Tech District', 'Compact Comfort'] },
        { name: 'Hostel Bed Tokyo', rating: 2, type: 'BUDGET', basePrice: 35, amenities: ['Backpacker Friendly', 'Shared Kitchen', 'Social Atmosphere'] }
      ],
      'New York': [
        { name: 'The Plaza', rating: 5, type: 'LUXURY', basePrice: 750, amenities: ['Fifth Avenue', 'Historic Luxury', 'Central Park Views'] },
        { name: 'The St. Regis New York', rating: 5, type: 'LUXURY', basePrice: 680, amenities: ['Butler Service', 'Midtown Location', 'Legendary Service'] },
        { name: 'The High Line Hotel', rating: 4, type: 'BOUTIQUE', basePrice: 380, amenities: ['Chelsea Location', 'Historic Building', 'Boutique Charm'] },
        { name: 'Pod Hotels', rating: 3, type: 'BUSINESS', basePrice: 220, amenities: ['Modern Design', 'Multiple Locations', 'Tech-Savvy'] },
        { name: 'HI New York City Hostel', rating: 2, type: 'BUDGET', basePrice: 65, amenities: ['Upper West Side', 'Budget Travel', 'Social Areas'] }
      ],
      'Sydney': [
        { name: 'Park Hyatt Sydney', rating: 5, type: 'LUXURY', basePrice: 650, amenities: ['Opera House Views', 'Harbour Location', 'Iconic Views'] },
        { name: 'The Langham Sydney', rating: 5, type: 'LUXURY', basePrice: 520, amenities: ['The Rocks Location', 'Observatory Hotel', 'Historic Luxury'] },
        { name: 'QT Sydney', rating: 4, type: 'BOUTIQUE', basePrice: 320, amenities: ['Designer Hotel', 'State Theatre', 'Artistic Design'] },
        { name: 'Shangri-La Hotel Sydney', rating: 5, type: 'LUXURY', basePrice: 580, amenities: ['Circular Quay', 'Harbour Bridge Views', 'Asian Hospitality'] },
        { name: 'Wake Up! Sydney Central', rating: 2, type: 'BUDGET', basePrice: 45, amenities: ['Backpacker Central', 'Social Areas', 'Budget Friendly'] }
      ],
      'Reykjavik': [
        { name: 'Hotel Borg', rating: 5, type: 'LUXURY', basePrice: 380, amenities: ['Art Deco Design', 'Downtown Location', 'Historic Luxury'] },
        { name: 'Canopy by Hilton Reykjavik', rating: 4, type: 'BOUTIQUE', basePrice: 280, amenities: ['Modern Design', 'City Center', 'Local Culture'] },
        { name: 'Center Hotels Plaza', rating: 4, type: 'BUSINESS', basePrice: 220, amenities: ['Central Location', 'Business Amenities', 'Nordic Design'] },
        { name: 'KEX Hostel', rating: 3, type: 'BUDGET', basePrice: 85, amenities: ['Hip Hostel', 'Social Scene', 'Local Vibe'] }
      ]
    };

    return hotelData[destinationName] || [
      { name: `Grand Hotel ${destinationName}`, rating: 5, type: 'LUXURY', basePrice: 400, amenities: ['Luxury Service', 'Fine Dining', 'Spa'] },
      { name: `City Inn ${destinationName}`, rating: 4, type: 'BUSINESS', basePrice: 180, amenities: ['Business Center', 'WiFi', 'Central Location'] },
      { name: `Budget Stay ${destinationName}`, rating: 3, type: 'BUDGET', basePrice: 80, amenities: ['Clean Rooms', 'WiFi', 'Good Value'] }
    ];
  };

  const getHotelImage = (hotelName, type, destinationName) => {
    // Hotel image mapping based on type and destination
    const hotelImages = {
      'LUXURY': [
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop', // Luxury hotel lobby
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop', // Luxury hotel exterior
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop', // Luxury resort
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop', // Luxury hotel room
      ],
      'BOUTIQUE': [
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=300&fit=crop', // Boutique hotel
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=400&h=300&fit=crop', // Boutique design
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop', // Modern boutique
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', // Cozy boutique
      ],
      'BUSINESS': [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop', // Business hotel
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop', // Modern business
        'https://images.unsplash.com/photo-1559508551-44bff1de756b?w=400&h=300&fit=crop', // City business hotel
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop', // Corporate hotel
      ],
      'RESORT': [
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop', // Beach resort
        'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?w=400&h=300&fit=crop', // Tropical resort
        'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=400&h=300&fit=crop', // Resort pool
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=300&fit=crop', // Mountain resort
      ],
      'BUDGET': [
        'https://images.unsplash.com/photo-1522798514-97ceb8c4ea1d?w=400&h=300&fit=crop', // Clean budget hotel
        'https://images.unsplash.com/photo-1586611292717-f828b167408c?w=400&h=300&fit=crop', // Budget accommodation
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop', // Simple hotel room
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop', // Budget inn
      ]
    };

    const typeImages = hotelImages[type] || hotelImages['BUSINESS'];
    const hash = hotelName.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    return typeImages[hash % typeImages.length];
  };

  const loadHotelOffers = async () => {
    setIsLoadingHotels(true);
    try {
      const hotels = getDestinationHotels(destination.name);
      const mockHotels = hotels.map((hotel, index) => {
        const priceVariation = 0.8 + (Math.random() * 0.4); // ±20% price variation
        const finalPrice = (hotel.basePrice * priceVariation).toFixed(2);
        
        return {
          hotel: {
            hotelId: `hotel-${index}`,
            name: hotel.name,
            rating: hotel.rating,
            type: hotel.type,
            amenities: hotel.amenities,
            contact: { phone: `+${Math.floor(Math.random() * 90 + 10)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}` },
            image: getHotelImage(hotel.name, hotel.type, destination.name)
          },
          offers: [
            {
              id: `offer-${index}`,
              price: { total: finalPrice, currency: 'USD' },
              room: { 
                type: hotel.type === 'LUXURY' ? 'SUITE' : hotel.type === 'BUDGET' ? 'STANDARD' : 'DELUXE',
                typeEstimated: { 
                  category: hotel.type === 'LUXURY' ? 'LUXURY_SUITE' : hotel.type === 'BUDGET' ? 'STANDARD_ROOM' : 'DELUXE_ROOM'
                }
              },
              rateFamilyEstimated: { code: 'SRS', type: 'P' },
              policies: {
                cancellation: hotel.type === 'BUDGET' ? 'Non-refundable' : 'Free cancellation until 24h before check-in'
              }
            }
          ]
        };
      });
      
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleBookFlight = (offer) => {
    setSelectedOffer(offer);
    setBookingType('flight');
    setShowBookingModal(true);
  };

  const handleBookHotel = (offer) => {
    setSelectedOffer(offer);
    setBookingType('hotel');
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Simulate booking process
    alert(`Booking confirmed! You will receive a confirmation email at ${bookingForm.email}`);
    setShowBookingModal(false);
    setBookingForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      passengers: 1,
      checkIn: '',
      checkOut: '',
      specialRequests: ''
    });
  };

  const updateBookingForm = (field, value) => {
    setBookingForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition duration-200 text-sm sm:text-base"
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
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'flights', 'hotels'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition duration-200 ${
                  activeTab === tab
                    ? 'border-green-500 text-green-600 dark:text-green-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About {destination.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Discover the beauty and culture of {destination.name}. This amazing destination offers
                incredible experiences, rich history, and unforgettable memories waiting to be made.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-green-600 dark:text-green-400">📍</span>
                  <span className="text-gray-700 dark:text-gray-300">
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
                  <span className="text-green-600 dark:text-green-400">🎭</span>
                  <span className="text-gray-700 dark:text-gray-300">Rich cultural heritage</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Destination Type</span>
                  <span className="font-medium text-gray-900 dark:text-white">{destination.subType || 'City'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Country</span>
                  <span className="font-medium text-gray-900 dark:text-white">{destination.address?.countryName}</span>
                </div>
                {destination.address?.stateCode && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">State/Region</span>
                    <span className="font-medium text-gray-900 dark:text-white">{destination.address.stateCode}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'flights' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Flight Offers</h2>
              <p className="text-gray-600 dark:text-gray-400">Showing flights to {destination.name}</p>
            </div>
            
            {isLoadingFlights ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-green-500 dark:border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Finding best flights...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {flightOffers.map((offer) => (
                  <div key={offer.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${offer.price.total}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">{offer.price.currency}</div>
                        <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                          {offer.airline}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleBookFlight(offer)}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg transition duration-200 font-medium"
                      >
                        Book Flight
                      </button>
                    </div>
                    
                    {offer.itineraries[0] && (
                      <div>
                        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-lg text-gray-900 dark:text-white">
                              {offer.itineraries[0].segments[0].departure.iataCode}
                            </span>
                            <div className="text-xs">
                              <div className="text-gray-700 dark:text-gray-300">{offer.itineraries[0].segments[0].departure.cityName}</div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {formatTime(offer.itineraries[0].segments[0].departure.at)}
                              </div>
                              <div className="text-gray-400 dark:text-gray-500">
                                {formatDate(offer.itineraries[0].segments[0].departure.at)}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center space-y-1">
                            <div className="flex items-center space-x-2">
                              <div className="border-t border-gray-300 dark:border-gray-600 w-16"></div>
                              <div className="text-gray-400">✈️</div>
                              <div className="border-t border-gray-300 dark:border-gray-600 w-16"></div>
                            </div>
                            <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                              {formatDuration(offer.itineraries[0].duration)}
                            </span>
                            {offer.itineraries[0].segments[0].stops > 0 && (
                              <span className="text-xs text-orange-600 dark:text-orange-400">
                                {offer.itineraries[0].segments[0].stops} stop(s)
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="text-xs text-right">
                              <div className="text-gray-700 dark:text-gray-300">{offer.itineraries[0].segments[0].arrival.cityName}</div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {formatTime(offer.itineraries[0].segments[0].arrival.at)}
                              </div>
                              <div className="text-gray-400 dark:text-gray-500">
                                {formatDate(offer.itineraries[0].segments[0].arrival.at)}
                              </div>
                            </div>
                            <span className="font-medium text-lg text-gray-900 dark:text-white">
                              {offer.itineraries[0].segments[0].arrival.iataCode}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-between mt-2">
                          <span>Aircraft: {offer.itineraries[0].segments[0].aircraft.code}</span>
                          <span>Flight operated by {offer.airline} ({offer.carrierCode})</span>
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hotel Offers</h2>
              <p className="text-gray-600 dark:text-gray-400">Showing hotels in {destination.name}</p>
            </div>
            
            {isLoadingHotels ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-green-500 dark:border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400">Finding amazing hotels...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {hotelOffers.map((hotelOffer) => (
                  <div key={hotelOffer.hotel.hotelId} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                    <div className="h-48 relative overflow-hidden">
                      {hotelOffer.hotel.image ? (
                        <img
                          src={hotelOffer.hotel.image}
                          alt={hotelOffer.hotel.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          onError={(e) => {
                            // Fallback to gradient background if image fails
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 absolute inset-0 flex items-center justify-center" 
                           style={{ display: hotelOffer.hotel.image ? 'none' : 'flex' }}>
                        <div className="text-white text-6xl">🏨</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${
                          hotelOffer.hotel.type === 'LUXURY' ? 'bg-purple-600/90 text-white' :
                          hotelOffer.hotel.type === 'BOUTIQUE' ? 'bg-blue-600/90 text-white' :
                          hotelOffer.hotel.type === 'BUSINESS' ? 'bg-gray-600/90 text-white' :
                          hotelOffer.hotel.type === 'RESORT' ? 'bg-orange-600/90 text-white' :
                          'bg-green-600/90 text-white'
                        }`}>
                          {hotelOffer.hotel.type}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="flex items-center text-yellow-400">
                          {[...Array(hotelOffer.hotel.rating)].map((_, i) => (
                            <span key={i} className="text-sm">⭐</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{hotelOffer.hotel.name}</h3>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(hotelOffer.hotel.rating)].map((_, i) => (
                                <span key={i} className="text-yellow-400 text-sm">⭐</span>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {hotelOffer.hotel.rating === 5 ? 'Luxury' : 
                               hotelOffer.hotel.rating === 4 ? 'Premium' : 
                               hotelOffer.hotel.rating === 3 ? 'Standard' : 'Basic'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Amenities */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {hotelOffer.hotel.amenities?.slice(0, 3).map((amenity, index) => (
                            <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                              {amenity}
                            </span>
                          ))}
                          {hotelOffer.hotel.amenities?.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              +{hotelOffer.hotel.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {hotelOffer.offers[0] && (
                        <div className="mt-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                {hotelOffer.offers[0].room.typeEstimated?.category?.replace(/_/g, ' ') || 'Room'}
                              </p>
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                ${hotelOffer.offers[0].price.total}
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">/night</span>
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {hotelOffer.offers[0].policies?.cancellation || 'Check cancellation policy'}
                              </p>
                            </div>
                            <button 
                              onClick={() => handleBookHotel(hotelOffer)}
                              className="px-6 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg transition duration-200 font-medium"
                            >
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

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full max-h-screen overflow-y-auto transition-colors duration-300">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Book {bookingType === 'flight' ? 'Flight' : 'Hotel'}
                </h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6 transition-colors duration-300">
                {bookingType === 'flight' && selectedOffer && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Flight Details</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{selectedOffer.airline}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedOffer.itineraries[0].segments[0].departure.iataCode} → {selectedOffer.itineraries[0].segments[0].arrival.iataCode}
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">${selectedOffer.price.total}</p>
                  </div>
                )}
                {bookingType === 'hotel' && selectedOffer && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hotel Details</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{selectedOffer.hotel.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedOffer.offers[0].room.typeEstimated?.category?.replace(/_/g, ' ')}
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">${selectedOffer.offers[0].price.total}/night</p>
                  </div>
                )}
              </div>

              {/* Booking Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.firstName}
                      onChange={(e) => updateBookingForm('firstName', e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.lastName}
                      onChange={(e) => updateBookingForm('lastName', e.target.value)}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-colors duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingForm.email}
                    onChange={(e) => updateBookingForm('email', e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={bookingForm.phone}
                    onChange={(e) => updateBookingForm('phone', e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-colors duration-200"
                  />
                </div>

                {bookingType === 'flight' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Number of Passengers
                    </label>
                    <select
                      value={bookingForm.passengers}
                      onChange={(e) => updateBookingForm('passengers', parseInt(e.target.value))}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-colors duration-200"
                    >
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                )}

                {bookingType === 'hotel' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Check-in Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingForm.checkIn}
                        onChange={(e) => updateBookingForm('checkIn', e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Check-out Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingForm.checkOut}
                        onChange={(e) => updateBookingForm('checkOut', e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-colors duration-200"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    value={bookingForm.specialRequests}
                    onChange={(e) => updateBookingForm('specialRequests', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-colors duration-200"
                    placeholder="Any special requests or requirements..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-lg transition duration-200 font-medium"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
