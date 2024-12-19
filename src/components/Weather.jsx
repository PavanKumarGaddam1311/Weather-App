import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_sky from '../assets/clear.png'
import cloudy from '../assets/cloud.png'
import humidity from '../assets/humidity.png'
import rainy from '../assets/rain.png'
import wind from '../assets/wind.png'
import snow from '../assets/snow.png'
import drizzle from '../assets/drizzle.png'
const Weather = () => {
  const inputRef=useRef()
  const [weatherData,setWeatherData]=useState(false);

  const allIcons={
    '01d':clear_sky,
    '01n':clear_sky,
    '02d':cloudy,
    '02n':cloudy,
    '03d':cloudy,
    '03n':cloudy,
    '04d':drizzle,
    '04n':drizzle,
    '09d':rainy,
    '09n':rainy,
    '10d':rainy,
    '10n':rainy,
    '13d':snow,
    '13n':snow,
  }

  const search = async (city) => {
    if(city === ''){
      alert('Enter City Name')
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
  
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = data.weather && data.weather[0] ? allIcons[data.weather[0].icon] : clear_sky;
      setWeatherData({
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        temperature:Math.floor(data.main.temp),
        location:data.name,
        icon: icon,

      })
  
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };
  
  useEffect(() => {
    search('London');
  }, []);
  

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type='text' placeholder='Search'/>
            <img src={search_icon} alt='' className='search-img' onClick={()=>search(inputRef.current.value)} />

        </div>
      <img src={weatherData.icon} alt='' className='weather-icon'/>
      <p className='temp'>{weatherData.temperature}°c</p>
      <p className='location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className="col">
          <img src={humidity} alt="" className='search-img' />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={wind} alt="" className='search-img' />
          <div>
            <p>{weatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather
