/**
 * Weather Data Utility Module
 * 
 * Provides weather data fetching functionality using OpenWeatherMap API.
 * This module handles API requests and error handling for weather information.
 * 
 * Author: Weather App Project
 * API Provider: OpenWeatherMap
 * Dependencies: request
 */

const request = require('request');

/**
 * OpenWeatherMap API Configuration
 * 
 * Contains the base URL and API key for OpenWeatherMap service.
 * The API key is used to authenticate requests to the weather service.
 */
const openWeatherMap = {
    BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY: "ff576ceec1e9f4e798b23382b04b0d2d"
};

/**
 * Fetch Weather Data for a Location
 * 
 * Makes an API request to OpenWeatherMap to get current weather data
 * for a specified location (city name).
 * 
 * @param {string} address - The city name or location to get weather for
 * @param {Function} callback - Callback function with signature (error, result)
 *                             - error: boolean indicating if request failed
 *                             - result: weather data object from API
 * 
 * @example
 * weatherData('London', (error, result) => {
 *   if (error) {
 *     console.log('Error fetching weather');
 *   } else {
 *     console.log(result.main.temp); // Temperature in Kelvin
 *   }
 * });
 */
const weatherData = (address, callback) => {
    // Construct API URL with encoded city name and API key
    const url = 
        openWeatherMap.BASE_URL + 
        encodeURIComponent(address) + 
        "&APPID=" + 
        openWeatherMap.SECRET_KEY;

    // Make HTTP request to OpenWeatherMap API
    request({url, json: true}, (error, data) => {
        if(error) {
            callback(true, "Unable to fetch data, please try again: " + error);
            return;
        }
        
        // Return the weather data from the API response
        callback(false, data?.body);
    });
};


// Export the weatherData function for use in other modules
module.exports = weatherData;