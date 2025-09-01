/**
 * Weather App Frontend JavaScript
 * 
 * This script handles:
 * - Automatic geolocation detection and reverse geocoding
 * - Weather data fetching and display
 * - User search functionality for cities
 * - Date formatting and display
 * 
 * Dependencies: None (Vanilla JavaScript)
 * API Endpoints: /weather, /reverse-geocode
 */

// API endpoint for weather data
var weatherApi = "/weather";

// DOM element selectors
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const tempElement = document.querySelector(".temperature span");
const locationElement = document.querySelector(".place");
const dateElement = document.querySelector(".date");

/**
 * Initialize and display current date
 * Format: "Day, Month" (e.g., "15, January")
 */
const currentDate = new Date();
const options = {month: "long"};
const monthName = currentDate.toLocaleString("en-US", options);
dateElement.textContent = currentDate.getDate() + ", " + monthName;

/**
 * Automatic Geolocation Detection
 * 
 * Attempts to get user's current location and automatically
 * load weather data for their detected city.
 * 
 * Process:
 * 1. Check if geolocation is supported
 * 2. Request user's coordinates
 * 3. Reverse geocode coordinates to get city name
 * 4. Load weather data for detected city
 */
if ("geolocation" in navigator) {
    locationElement.textContent = "Loading...";
    
    navigator.geolocation.getCurrentPosition(
        function (position) {
            // Extract coordinates from geolocation response
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Call our server's reverse geocoding endpoint
            const apiUrl = `/reverse-geocode?lat=${lat}&lon=${lon}`;
            
            fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                // Check if we successfully got a city name
                if (data && data.address && data.address.city) {
                    const city = data.address.city;
                    showData(city);
                } else {
                    locationElement.textContent = "Location detected, but city not found";
                }
            })
            .catch((error) => {
                locationElement.textContent = "Error detecting location";
            });
        },
        function (error) {
            // Handle geolocation errors gracefully
            let errorMessage = "Unable to detect location";
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Location access denied";
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = "Location unavailable";
                    break;
                case error.TIMEOUT:
                    errorMessage = "Location request timed out";
                    break;
            }
            locationElement.textContent = errorMessage;
        }
    );
} else {
    locationElement.textContent = "Geolocation not supported";
}

/**
 * Weather Search Form Handler
 * 
 * Handles user input for manual city searches.
 * Prevents default form submission and calls weather API.
 */
weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Reset UI elements
    locationElement.textContent = "Loading...";
    weatherIcon.className = "";
    tempElement.textContent = "";
    weatherCondition.textContent = "";

    // Fetch weather data for user-entered city
    showData(search.value);
});

/**
 * Display Weather Data
 * 
 * Processes and displays weather information for a given city.
 * Handles weather icons, temperature conversion, and error states.
 * 
 * @param {string} city - The city name to get weather data for
 */
function showData(city) {
    getWeatherData(city, (result) => {
        // Check if API returned valid weather data
        if(result.cod == 200) {
            // Set weather icon based on weather condition
            if (
                result.weather[0].description == "rain" ||
                result.weather[0].description == "fog"
            ) {
                weatherIcon.className = "wi wi-day-" + result.weather[0].description;    
            } else {
                weatherIcon.className = "wi wi-day-cloudy";
            }

            // Display location name
            locationElement.textContent = result?.name;
            
            // Convert temperature from Kelvin to Celsius and display
            tempElement.textContent = 
                (result?.main?.temp - 273.5).toFixed(2) + String.fromCharCode(176);
            
            // Display weather condition in uppercase
            weatherCondition.textContent = 
                result?.weather[0]?.description?.toUpperCase();
        } else {
            // Handle API errors (city not found, etc.)
            locationElement.textContent = "City not found";
        }
    });
}

/**
 * Fetch Weather Data from API
 * 
 * Makes an API call to the server's weather endpoint and
 * executes a callback with the response data.
 * 
 * @param {string} city - The city name to get weather data for
 * @param {Function} callback - Function to call with the weather data
 */
function getWeatherData(city, callback) {
    const locationApi = weatherApi + "?address=" + city;
    
    fetch(locationApi)
        .then((response) => response.json())
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            // Handle network errors
            callback({ cod: 404, message: "Network error" });
        });
}