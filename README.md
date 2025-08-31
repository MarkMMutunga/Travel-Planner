# ✈️ Travel Planner

A comprehensive travel planning and booking web application built with React, Tailwind CSS, and integrated with travel APIs.

![Travel Planner Logo](./public/logo192.svg)

## 🌍 Description

The Travel Planner is a modern, full-featured web application designed to help users discover amazing destinations worldwide, book flights and hotels, and create unforgettable travel experiences. With a focus on user experience and beautiful design, the app provides a seamless travel planning journey from search to booking.

## ✨ Key Features

### 🔍 **Destination Discovery**
- Global destination search with beautiful imagery
- Curated destinations including African gems (Kenya, South Africa, Morocco)
- Interactive destination cards with hover effects
- Detailed destination pages with comprehensive information

### ✈️ **Flight Booking System**
- Real airline integration (Kenya Airways, Air France, Lufthansa, etc.)
- Flight search with pricing and aircraft information
- Interactive booking modals with passenger details
- Multiple flight options with detailed itineraries

### 🏨 **Hotel Booking Platform**
- Categorized hotels (Luxury, Boutique, Business, Budget, Resort)
- Real hotel images based on category and location
- Star ratings and amenity listings
- Booking system with guest information forms

### 🎨 **Modern UI/UX**
- Beautiful green/emerald gradient theme
- Responsive design for all devices
- Smooth animations and transitions
- Professional airplane-themed branding
- Custom favicon and logo design

### 🔧 **Technical Features**
- Component-based React architecture
- Tailwind CSS for styling
- Amadeus API integration ready
- Environment configuration
- Progressive Web App capabilities

## 🛠️ Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **APIs**: Amadeus Travel API
- **Languages**: JavaScript (ES6+), HTML5, CSS3
- **Tools**: Node.js, npm, Git
- **Design**: Custom SVG logos and icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Amadeus API credentials (optional for full functionality)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MarkMMutunga/Travel-Planner.git
cd Travel-Planner
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup (Optional)**
```bash
# Copy .env file and add your API credentials
cp .env.example .env
# Edit .env with your Amadeus API credentials
```

4. **Start the development server**
```bash
npm start
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production  
- `npm test` - Launches the test runner
- `npm eject` - Removes this tool and copies build dependencies

## 📁 Project Structure

```
Travel-Planner/
├── public/
│   ├── favicon.svg          # Custom airplane favicon
│   ├── logo192.svg          # App icon (192px)
│   ├── logo512.svg          # App icon (512px)
│   ├── index.html           # Main HTML template
│   ├── manifest.json        # PWA configuration
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── SearchBar.js     # Destination search component
│   │   ├── DestinationCard.js   # Individual destination card
│   │   ├── DestinationList.js   # Destination grid display
│   │   └── DestinationDetails.js # Detailed destination view
│   ├── services/
│   │   └── amadeusAPI.js    # API service integration
│   ├── App.js               # Main application component
│   ├── index.js             # Application entry point
│   └── index.css            # Global styles
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── LICENSE                  # MIT License
└── README.md               # Project documentation
```

## 🎯 Demo Features

### Search Experience
- Type destinations like "Kenya", "Madagascar", "Iceland"
- Beautiful destination cards with real images
- Smooth hover animations and transitions

### Destination Details
- Comprehensive destination information
- Tabbed interface (Overview, Flights, Hotels)
- Real airline and hotel data simulation

### Booking System
- Interactive flight selection with airline details
- Hotel booking with category-based filtering
- Professional booking forms and modals

## 🌟 Future Enhancements

- **Real-time API Integration**: Full Amadeus API implementation
- **User Authentication**: Login and profile management
- **Trip Saving**: Save and manage multiple trip plans
- **Payment Integration**: Secure booking and payment processing
- **Mobile App**: React Native version
- **Social Features**: Share trips and recommendations
- **Advanced Filters**: Price range, amenities, ratings
- **Offline Mode**: PWA with offline capabilities

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mark Mikile Mutunga**
- 📧 Email: [markmiki03@gmail.com](mailto:markmiki03@gmail.com)
- 📱 Phone: +254 707 678 643
- 🐙 GitHub: [@MarkMMutunga](https://github.com/MarkMMutunga)

## 🙏 Acknowledgments

- Travel images from [Unsplash](https://unsplash.com)
- Icons and inspiration from travel industry best practices
- Amadeus Travel API for travel data integration
- React and Tailwind CSS communities for excellent documentation

---

⭐ If you found this project helpful, please give it a star on GitHub!

🚀 **Ready to plan your next adventure?** [Try Travel Planner Live](https://github.com/MarkMMutunga/Travel-Planner)
