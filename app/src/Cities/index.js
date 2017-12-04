import City from "City";
import React, { Component } from "react";
import "Cities/css/Cities.css";

/**
 * City selector
 * @reactProps {Array} cities List of cities in selector
 * @reactProps {string} city Cty selecetd by default
 * @reactProps {Function} change Call on change city
 */
class Cities extends Component {
  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    /**
     * @ignore
     */
    this.state = {
      cities: props.cities || [],
      errors: [],
      city: props.city || "",
      change: props.change || (() => {}),
      weather: null,
      weather_date: null
    };
  }

  /**
   * Expose data for external usage for react component.
   */
  get value() {
    return {
      city: this.state.city,
      weather: this.state.weather,
      weather_date: this.state.weather_date
    };
  }

  /**
   * Handle change of city. Get weather from remote
   * Call props.change if any
   */
  handleChange(e) {
    const city = e.target.value;
    this.setState(
      {
        city,
        weather: null,
        weather_date: null,
        errors: []
      },
      () => {
        this.state.change(this.value);
        this.loadCityWeather(city);
      }
    );
  }

  /**
   * Redraw weather data on create component
   */
  componentDidMount() {
    this.loadCityWeather(this.state.city);
  }

  /**
   * Load weather from openweathermap.org
   */
  loadCityWeather(city) {
    clearTimeout(this.state.timeout);
    this.setState({
      timeout: setTimeout(() => {
        this.loadCityWeather(city);
      }, 1000 * 60 * 30)
    });
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${
        city
      }&APPID=bd5e378503939ddaee76f12ad7a97608`
    )
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then(json => {
        this.setState(
          {
            weather_date: new Date(),
            weather: json
          },
          () => {
            this.state.change(this.value);
          }
        );
      });
  }

  /**
   * @ignore
   */
  render() {
    let cities = this.state.cities.map((x, id) => (
      <option key={id} value={x}>
        {x}
      </option>
    ));
    if (this.state.city === "") {
      cities = [<option key={-1}>Select city</option>, ...cities];
    }
    return (
      <div className="cities">
        <select value={this.state.city} onChange={this.handleChange.bind(this)}>
          {cities}
        </select>
        <City
          weather={this.state.weather}
          updated={this.state.weather_date}
          city={this.state.city}
        />
      </div>
    );
  }
}
export default Cities;
