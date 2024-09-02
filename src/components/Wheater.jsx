import React, { useState, useEffect } from 'react';
import './weather.css';
import search from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';

const Wheater = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Kochi');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    fetchWeatherData('Kochi');
  }, []);

  const fetchWeatherData = async (cityName) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = () => {
    fetchWeatherData(inputValue);
    setCity(inputValue);
    setInputValue('');
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { main, weather, wind } = weatherData;
  const temperature = Math.round(main.temp);
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const weatherIcon = weather[0].main.toLowerCase();

  const getWeatherIcon = () => {
    switch (weatherIcon) {
      case 'clear':
        return clear_icon;
      case 'clouds':
        return cloud_icon;
      case 'drizzle':
        return drizzle_icon;
      case 'snow':
        return snow_icon;
      default:
        return clear_icon;
    }
  };

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          type="text"
          placeholder='Enter city'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <img
          src={search}
          alt="Search"
          onClick={handleSearch}
        />
      </div>
      <img
        src={getWeatherIcon()}
        className='weather-icon'
        alt="Weather Icon"
      />
      <p className='temperature'>{temperature}°C</p>
      <p className='city'>{city}</p>
      <div className='weather-data'>
        <div className="col">
          <img src={humidity_icon} alt="Humidity Icon" />
          <div>
            <p>{humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind_icon} alt="Wind Icon" />
          <div>
            <p>{windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wheater;
