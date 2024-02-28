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
import moment from "moment";

const Weather = () => {
  // clear sky , broken clouds , scattered clouds ,
  const [weather, setWeather] = useState({});
  const [cityDetails, setCityDetails] = useState("");
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [windDegree, setWindDegree] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [windGust, setWindGust] = useState("");

  const apiKey = "72119f14b5d11e3def0fcae39e2a03af";
  const api = `https://api.openweathermap.org/data/2.5/forecast?q=${cityDetails}&units=metric&cnt=24&appid=${apiKey}`;

  const searchCity = (e) => {
    setCityDetails(e.target.value);
    console.log(cityDetails, "city data");
  };

  const displayWeatherDetails = async () => {
    try {
      const data = await axios.get(api);
      console.log(data, "Data added");
      setWeather(data);
      console.log(weather, "weateh");
    } catch (error) {
      console.log(error, "Failed to load weather Data");
    }
  };

  const sunriseAndSunsetConversion = () => {
    const sunriseTimestamp = weather?.data?.city?.sunrise;
    const sunsetTimestamp = weather?.data?.city?.sunset;
    const sunriseDate = new Date(sunriseTimestamp * 1000);
    const sunsetDate = new Date(sunsetTimestamp * 1000);
    const sunriseTime = sunriseDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSunrise(sunriseTime);
    const sunsetTime = sunsetDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setSunset(sunsetTime);
  };

  const windDegreeCalculate = (degrees) => {
    const directions = [
      "North",
      "NorthEast",
      "East",
      "SouthEast",
      "South",
      "SouthWest",
      "West",
      "NorthWest",
    ];
    const index = Math.round((degrees % 360) / 45);
    const direction = directions[index % 8];
    setWindDegree(direction);
  };

  const windSpeedCalculation = (speed) => {
    const speedKmh = (speed * 3.6).toFixed(2);
    setWindSpeed(speedKmh);
  };

  const windGustCalculation = (speed) => {
    const speedKmh = (speed * 3.6).toFixed(2);
    setWindGust(speedKmh);
  };

  // https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid=KEYHere
  useEffect(() => {
    displayWeatherDetails();
    sunriseAndSunsetConversion();
    const deg = weather?.data?.list[0]?.wind?.deg;
    const speed = weather?.data?.list[0]?.wind?.speed;
    const gust = weather?.data?.list[0]?.wind?.gust;
    windDegreeCalculate(deg);
    windSpeedCalculation(speed);
    windGustCalculation(gust);
  }, [cityDetails]);

  return (
    <>
      <div className="main_weather_ui">
        <div className="input-search-bar">
          <input
            type="text"
            className="input_search"
            name="cityDetails"
            value={cityDetails}
            onChange={searchCity}
          />
          <button className="search-btn">Search</button>
        </div>
        {cityDetails !== "" ? (
          <>
            <div className="weather_info">
              <div className="city-degree">
                <div className="city-div">
                  <FaCity className="city-icon" />
                </div>
                <div className="date-location">
                  <h1 className="city_name">
                    {weather?.data?.city?.name}, {weather?.data?.city?.country}
                  </h1>
                  <h3 className="date_now">
                    {/* {moment().format(weather?.data?.list[0]?.dt_txt)} */}
                    {moment().format(weather?.data?.list[0]?.dt_txt)}
                  </h3>
                </div>
                <div className="degree-div">
                  <h1 className="city_degree">
                    {weather?.data?.list[0]?.main?.temp.toFixed(1)}&deg; C
                  </h1>
                  <h3 className="weather-update">
                    {weather?.data?.list[0]?.weather[0]?.description}
                  </h3>
                </div>
              </div>
              <div className="feels-like">
                <FaWind className="city-icon" />
                <div className="feels-like-degree">
                  <h2 className="feels-like-text">Feels Like</h2>
                  <h3 className="feel-degree">
                    {weather?.data?.list[0]?.main?.feels_like.toFixed(1)}&deg; C
                  </h3>
                </div>
              </div>
              <div className="feels-like">
                <TbWindElectricity className="city-icon" />
                <div className="feels-like-degree">
                  <h2 className="feels-like-text">Min. Temp.</h2>
                  <h3 style={{ fontSize: "20px" }} className="feel-degree">
                    {weather?.data?.list[0]?.main?.temp_min?.toFixed(1)}&deg; C
                  </h3>
                </div>
                <TbSunWind className="city-icon" />
                <div className="feels-like-degree">
                  <h2 className="feels-like-text">Max. Temp.</h2>
                  <h3 style={{ fontSize: "20px" }} className="feel-degree">
                    {weather?.data?.list[0]?.main?.temp_max?.toFixed(1)}&deg; C
                  </h3>
                </div>
              </div>
              <div className="time-zone">
                <CiClock1 className="city-icon" />
                <div className="feels-like-degree">
                  <h2 className="timezone-text">Timezone.</h2>
                  <h3 style={{ fontSize: "20px" }} className="timezone-hours">
                    {weather?.data?.city?.timezone / 3600} hours
                  </h3>
                </div>
              </div>
              <div className="time-zone">
                <FiSunrise className="city-icon" />
                <div className="feels-like-degree">
                  <h2 className="timezone-text">Sunrise.</h2>
                  <h3 style={{ fontSize: "20px" }} className="timezone-hours">
                    {sunrise}
                  </h3>
                </div>
              </div>
              <div className="time-zone">
                <FiSunrise className="city-icon" />
                <div className="feels-like-degree">
                  <h2 className="timezone-text">Sunset.</h2>
                  <h3 style={{ fontSize: "20px" }} className="timezone-hours">
                    {sunset}
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
                    <span className="wind-degree-text">{windDegree}</span>
                  </div>
                  <div className="wind-gust">
                    <h3 className="wind-gust">Gust.</h3>
                    <span className="wind-gust-text">{windSpeed} km/hr</span>
                  </div>
                  <div className="wind-speed">
                    <h3 className="wind-speed">Speed.</h3>
                    <span className="wind-speed-text">{windGust} km/hr</span>
                  </div>
                </div>
              </div>
            </div>
            <NextDaysWeather />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Weather;
