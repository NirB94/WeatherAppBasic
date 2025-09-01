# Weather App - Node.js Learning Project

A basic weather application built to learn backend/frontend development and JavaScript, featuring external API integration with OpenWeatherMap for real-time weather data retrieval and display.

## 📚 Learning Purpose

This is a **beginner-level project** created to:
- Learn full-stack JavaScript development
- Practice backend and frontend communication
- Understand external API integration and data handling
- Explore Node.js/Express server development
- Get familiar with template engines (Handlebars)

*Note: This is a basic implementation for learning purposes. A more advanced version with additional features may be developed in the future.*

## ✨ Features

- **🌍 Automatic Location Detection**: Uses browser geolocation to automatically detect and display weather for your current location
- **🔍 Manual City Search**: Search for weather information by entering any city name
- **🌡️ Real-time Weather Data**: Current temperature, weather conditions, and location details
- **📱 Responsive Design**: Works on desktop and mobile devices
- **⚠️ Error Handling**: Graceful handling of location errors and invalid city searches
- **📅 Date Display**: Shows current date in a user-friendly format

## 🛠️ Technologies Used

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Handlebars (HBS)** - Template engine for server-side rendering
- **Request** - HTTP client library for API calls

### Frontend
- **Vanilla JavaScript** - No frameworks, pure JS for learning
- **HTML5** - Modern semantic markup
- **CSS3** - Custom styling with gradients and animations
- **Weather Icons** - External CDN for weather condition icons

### External Services
- **OpenWeatherMap API** - Weather data provider
- **Geolocation API** - Browser location detection

### Development Tools
- **Nodemon** - Automatic server restart during development
- **npm** - Package management

## 🏗️ Project Structure

```
WeatherAppNodeJS/
├── src/
│   └── app.js                 # Main Express server
├── public/
│   ├── css/
│   │   └── styles.css         # Application styles
│   └── js/
│       └── app.js             # Frontend JavaScript
├── templates/
│   ├── views/
│   │   ├── index.hbs          # Main page template
│   │   └── 404.hbs            # Error page template
│   └── partials/
│       └── header.hbs         # Reusable header component
├── utils/
│   └── weatherData.js         # Weather API utility module
├── package.json               # Dependencies and scripts
└── README.md                  # Project documentation
```

## 🚀 API Endpoints

### Weather Data
- **Endpoint**: `GET /weather`
- **Parameters**: `address` (required) - City name
- **Returns**: JSON weather data from OpenWeatherMap

### Reverse Geocoding
- **Endpoint**: `GET /reverse-geocode`
- **Parameters**: `lat` (required), `lon` (required) - Coordinates
- **Returns**: JSON location data with city name

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/WeatherAppNodeJS.git
   cd WeatherAppNodeJS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 💡 How It Works

### Automatic Location Detection
1. App requests user's geolocation permission
2. Browser provides latitude/longitude coordinates
3. Server performs reverse geocoding to get city name
4. Weather data is fetched and displayed automatically

### Manual Search
1. User enters city name in search field
2. Frontend sends request to `/weather` endpoint
3. Server queries OpenWeatherMap API
4. Weather data is returned and displayed

## 🎯 Key Learning Outcomes

- **Server-Side Rendering** vs Client-Side Rendering concepts
- **RESTful API** design and implementation
- **External API integration** and error handling
- **Asynchronous JavaScript** with callbacks and promises
- **Template engines** for dynamic content rendering
- **Static file serving** with Express
- **Environment configuration** and deployment preparation

## 🔧 Technical Highlights

- **Modular Architecture**: Separated concerns between server logic and utility functions
- **Error Handling**: Comprehensive error management for network issues, invalid inputs, and API failures
- **Responsive Design**: Custom CSS without frameworks for learning purposes
- **Browser Compatibility**: Geolocation API with fallback options
- **Temperature Conversion**: Kelvin to Celsius conversion for user-friendly display

## 🌐 Browser Compatibility

- **Geolocation**: Requires HTTPS in production (works on localhost for development)
- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **JavaScript**: ES6+ features used

## ⚠️ Current Limitations

- API key is hardcoded (for learning purposes only)
- No user authentication or data persistence
- Basic styling and UI components
- Limited weather information display

## 🔮 Future Improvements

- Environment variables for API keys
- Extended weather forecast (5-day)
- User preferences and favorites
- Weather charts and historical data
- Progressive Web App (PWA) features

## 📖 Learning Resources

This project helped me understand:
- Node.js ecosystem and npm packages
- Express.js routing and middleware
- Handlebars templating syntax
- Asynchronous JavaScript patterns
- HTTP requests and API integration
- Frontend-backend communication

## 🤝 Contributing

This is a learning project, but suggestions and improvements are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with your improvements

## 📄 License

This project is for educational purposes and personal learning.

## 🙏 Acknowledgments

- **OpenWeatherMap** for providing free weather API access
- **Express.js community** for excellent documentation
- **Node.js** for making server-side JavaScript possible
- Various online tutorials and resources that guided this learning journey

---

*Built with ❤️ as a learning project to understand full-stack JavaScript development*