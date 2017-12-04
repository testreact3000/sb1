import PropTypes from "prop-types";
import React, { Component } from "react";
import "City/css/open-weather-icons.css";
import "City/css/City.css";
import _ from "lodash";
/**
 * Dumb component for output city weather information.
 * @reactProps {object} weather Data in format of https://openweathermap.org/current
 * @reactProps {Array} weather.weather
 * @reactProps {string} weather.weather[0].icon Icon of current weather
 * @reactProps {object} weather.main
 * @reactProps {number} weather.main.temp Temperature
 */
class City extends Component {
  /**
   * @ignore
   */
  render() {
    let icon, temp;
    if (this.props.weather) {
      icon = (
        <i
          className={`owi owi-${_.get(
            this.props,
            "weather.weather[0].icon"
          )} city__weather`}
        />
      );
      temp = `${_.get(this.props, "weather.main.temp")}°`;
    }

    return (
      <div className="city">
        {icon}
        <div className="city__temp">{temp}</div>
      </div>
    );
  }
}

City.propTypes = {
  weather: PropTypes.object
};
export default City;
