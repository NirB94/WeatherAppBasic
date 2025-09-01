/**
 * Weather App Server
 * 
 * Express.js server that provides:
 * - Static file serving for the web interface
 * - Weather data API endpoint
 * - Reverse geocoding API endpoint for location detection
 * - Handlebars template rendering
 * 
 * Author: Weather App Project
 * Dependencies: express, hbs, request
 */

const express = require('express');
const hbs = require('hbs');
const path = require('path');
const request = require('request');

const app = express();
const weatherData = require("../utils/weatherData");

// Server configuration
const port = process.env.PORT || 3000;

// Path configuration for static files and templates
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Express middleware and view engine setup
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));

/**
 * Homepage Route
 * 
 * Serves the main weather application interface
 */
app.get("", (req, res) => {
    res.render("index", {title: "Weather App"});
});

/**
 * Weather Data API Endpoint
 * 
 * Fetches weather information for a specified location.
 * 
 * Query Parameters:
 * - address (required): City name or location to get weather for
 * 
 * Returns: JSON weather data from OpenWeatherMap API
 */
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send("Address is required");
    }
    
    weatherData(req.query.address, (error, result) => {
        if (error) {
            return res.send(error);
        }
        
        res.send(result);
    });
});

/**
 * Reverse Geocoding API Endpoint
 * 
 * Converts latitude/longitude coordinates to city names.
 * Used for automatic location detection when user allows geolocation.
 * 
 * Query Parameters:
 * - lat (required): Latitude coordinate
 * - lon (required): Longitude coordinate
 * 
 * Returns: JSON object with address information including city name
 * 
 * Note: Uses OpenWeatherMap's reverse geocoding API to avoid CORS issues
 * that occur when calling external APIs directly from the browser.
 */
app.get("/reverse-geocode", (req, res) => {
    const { lat, lon } = req.query;
    
    // Validate required parameters
    if (!lat || !lon) {
        return res.send({ error: "Latitude and longitude are required" });
    }
    
    // Use OpenWeatherMap's reverse geocoding API
    const apiKey = "ff576ceec1e9f4e798b23382b04b0d2d";
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
    
    request({ url, json: true }, (error, response) => {
        if (error) {
            return res.send({ error: "Unable to fetch location data" });
        }
        
        // OpenWeatherMap returns an array, format it to match expected structure
        if (response.body && response.body.length > 0) {
            const location = response.body[0];
            const formattedResponse = {
                address: {
                    city: location.name,
                    country: location.country,
                    state: location.state
                }
            };
            res.send(formattedResponse);
        } else {
            res.send({ error: "No location found" });
        }
    });
});

/**
 * 404 Error Handler
 * 
 * Catches all unmatched routes and displays a 404 error page
 */
app.use((req, res) => {
    res.render("404", {title: "Page not found"});
});

/**
 * Start Server
 * 
 * Starts the Express server on the specified port
 */
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

