/**
 * Travel Planner - Amadeus API Service
 * 
 * @author Mark Mikile Mutunga
 * @email markmiki03@gmail.com
 * @phone +254 707 678 643
 * @copyright (c) 2025 Mark Mikile Mutunga. All rights reserved.
 * @license MIT License
 * 
 * Description: API service for integrating with Amadeus Travel API.
 * Handles authentication, destination search, flight offers, and hotel bookings.
 */

// Amadeus API Service
class AmadeusAPI {
  constructor() {
    this.baseURL = 'https://test.api.amadeus.com';
    this.clientId = process.env.REACT_APP_AMADEUS_CLIENT_ID;
    this.clientSecret = process.env.REACT_APP_AMADEUS_CLIENT_SECRET;
    this.accessToken = null;
    this.tokenExpiresAt = null;
  }

  // Get access token for Amadeus API
  async getAccessToken() {
    if (this.accessToken && this.tokenExpiresAt > Date.now()) {
      return this.accessToken;
    }

    try {
      const response = await fetch(`${this.baseURL}/v1/security/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get access token');
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiresAt = Date.now() + (data.expires_in * 1000) - 60000; // Subtract 1 minute for safety

      return this.accessToken;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  }

  // Search for destinations
  async searchDestinations(keyword) {
    try {
      const token = await this.getAccessToken();
      const response = await fetch(
        `${this.baseURL}/v1/reference-data/locations?keyword=${encodeURIComponent(keyword)}&subType=CITY,AIRPORT&page%5Blimit%5D=10`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error searching destinations:', error);
      throw error;
    }
  }

  // Get flight offers
  async getFlightOffers(origin, destination, departureDate, adults = 1) {
    try {
      const token = await this.getAccessToken();
      const response = await fetch(
        `${this.baseURL}/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}&max=10`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error getting flight offers:', error);
      throw error;
    }
  }

  // Get hotel offers
  async getHotelOffers(cityCode, checkInDate, checkOutDate) {
    try {
      const token = await this.getAccessToken();
      const response = await fetch(
        `${this.baseURL}/v2/shopping/hotel-offers?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=1&roomQuantity=1`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error getting hotel offers:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
const amadeusAPI = new AmadeusAPI();
export default amadeusAPI;
