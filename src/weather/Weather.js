import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";
import Thunder from "../assets/thunder.jpg";
import { FaCity } from "react-icons/fa6";
import { FaWind } from "react-icons/fa";
import { TbWindElectricity } from "react-icons/tb";
import { TbSunWind } from "react-icons/tb";
import { CiClock1 } from "react-icons/ci";
import { FiSunrise } from "react-icons/fi";
import { GiWindyStripes } from "react-icons/gi";
import NextDaysWeather from "../nextDaysWeather/NextDaysWeather";

const Weather = () => {
  // clear sky , broken clouds , scattered clouds ,
  const [weather, setWeather] = useState([]);
  const [city, setCity] = useState("");

  const apiKey = "72119f14b5d11e3def0fcae39e2a03af";
  const apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=ontario&cnt=24&appid=${apiKey}`;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=canberra&appid=${apiKey}`;

  const fetchWeatherDetails = async () => {
    const weatherData = await axios.get(apiForecast);
    console.log(weatherData, "weather");
  };

  useEffect(() => {
    fetchWeatherDetails();
  }, []);

  return (
    <>
      <div className="main_weather_ui">
        <div className="input-search-bar">
          <input type="text" className="input_search" />
          <button className="search-btn">Search</button>
        </div>
        <div className="weather_info">
          <div className="city-degree">
            <div className="city-div">
              <FaCity className="city-icon" />
            </div>
            <div className="date-location">
              <h1 className="city_name">Lahore, PK</h1>
              <h3 className="date_now">
                24 <sup>th</sup> February, 2024
              </h3>
            </div>
            <div className="degree-div">
              <h1 className="city_degree">24.5 C</h1>
              <h3 className="weather-update">Overcast clouds</h3>
            </div>
          </div>
          <div className="feels-like">
            <FaWind className="city-icon" />
            <div className="feels-like-degree">
              <h2 className="feels-like-text">Feels Like</h2>
              <h3 className="feel-degree">25.6 C</h3>
            </div>
          </div>
          <div className="feels-like">
            <TbWindElectricity className="city-icon" />
            <div className="feels-like-degree">
              <h2 className="feels-like-text">Min. Temp.</h2>
              <h3 style={{ fontSize: "20px" }} className="feel-degree">
                25.6 C
              </h3>
            </div>
            <TbSunWind className="city-icon" />
            <div className="feels-like-degree">
              <h2 className="feels-like-text">Max. Temp.</h2>
              <h3 style={{ fontSize: "20px" }} className="feel-degree">
                25.6 C
              </h3>
            </div>
          </div>
          <div className="time-zone">
            <CiClock1 className="city-icon" />
            <div className="feels-like-degree">
              <h2 className="timezone-text">Timezone.</h2>
              <h3 style={{ fontSize: "20px" }} className="timezone-hours">
                8 hours
              </h3>
            </div>
          </div>
          <div className="time-zone">
            <FiSunrise className="city-icon" />
            <div className="feels-like-degree">
              <h2 className="timezone-text">Sunrise.</h2>
              <h3 style={{ fontSize: "20px" }} className="timezone-hours">
                8 hours
              </h3>
            </div>
          </div>
          <div className="time-zone">
            <FiSunrise className="city-icon" />
            <div className="feels-like-degree">
              <h2 className="timezone-text">Sunset.</h2>
              <h3 style={{ fontSize: "20px" }} className="timezone-hours">
                16 hours
              </h3>
            </div>
          </div>
          <div className="wind-measurements">
            <div className="wind">
              <GiWindyStripes className="city-icon" />
              <h2 className="wind-text">Wind:</h2>
            </div>
            <div className="wind-fields">
              <div className="wind-degree">
                <h3 className="wind-degree">Deg.</h3>
                <span className="wind-degree-text">233</span>
              </div>
              <div className="wind-gust">
                <h3 className="wind-gust">Gust.</h3>
                <span className="wind-gust-text">233</span>
              </div>
              <div className="wind-speed">
                <h3 className="wind-speed">Speed.</h3>
                <span className="wind-speed-text">233</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NextDaysWeather />
    </>
  );
};

export default Weather;
