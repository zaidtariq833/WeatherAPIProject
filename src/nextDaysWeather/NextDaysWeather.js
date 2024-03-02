import React from "react";
import { Card } from "antd";
import "./NextDaysWeather.css";
import { FaCity } from "react-icons/fa6";
import moment from "moment";

const NextDaysWeather = ({ data }) => {
  const inputDate = moment("2024-03-01 15:00:00");
  const formattedDate = inputDate.format("Do MMMM, YYYY hh:mmA");
  return (
    <div className="next-weather-cards">
      {data?.data?.list?.map((nextWeather) => {
        return (
          <>
            <Card
              hoverable
              style={{
                width: 240,
                backgroundColor: "dodgerblue",
                border: "none",
              }}
            >
              <div className="next-weather-degree">
                <h3 className="next_weather_now">
                  {moment(nextWeather?.dt_txt).format(
                    "MMMM Do YYYY, h:mm:ss a"
                  )}
                </h3>
                <div className="next-weather-degree-condition">
                  <h1 className="next_weather_degree">
                    {nextWeather?.main?.temp.toFixed(1)}&deg; C
                  </h1>
                  <h3 className="next-weather-update">
                    {nextWeather?.weather[0]?.description}
                  </h3>
                </div>
              </div>
            </Card>
          </>
        );
      })}
    </div>
  );
};

export default NextDaysWeather;
