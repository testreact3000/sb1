import Cities from "Cities";
import React, { Component } from "react";
import _ from "lodash";
import "Form/css/Form.css";
/**
 * Wheather form.
 * -----
 * It contains wheather selector by city, comment field and submit button
 * @reactProps {Function(state)} onSubmit
 * @reactProps {Array} cities List of cities
 */
class Form extends Component {
  /**
   * @property {Array} list City data list
   * @property {string} comment Unsaved comment field
   * @property {object} info Unsaved weather info
   * @property {Boolean} error Error flag
   */
  static get defaultProps() {
    return {
      list: [],
      comment: "",
      info: null,
      error: false
    };
  }

  /**
   * @ignore
   */
  constructor(props) {
    super(props);
    /**
     * @ignore
     */
    this.state = _.assign({}, Form.defaultProps, props.defaults);
  }

  /**
   * Handle submit
   */
  handleSubmit(e) {
    e.preventDefault();
    const state = _.clone(this.state, true);
    if (state.info.city !== "") {
      state.error = false;
      state.list.push({
        comment: state.comment,
        info: state.info
      });
      state.comment = "";
    } else {
      state.error = true;
    }
    this.setState(state, () => {
      if (this.props.onSubmit !== undefined) {
        this.props.onSubmit(this.state);
      }
    });
  }

  /**
   * Handle change city
   */
  changeCity(info) {
    this.setState({ info });
  }

  /**
   * Handle change comment
   */
  changeComment(e) {
    this.setState({ comment: e.target.value });
  }

  /**
   * Render single item of table
   */
  listItem(data, id) {
    let wd = _.get(data, "info.weather_date");
    wd = wd === undefined ? "—" : wd.toString();
    return (
      <tr key={id}>
        <td>{data.info.city}</td>
        <td>{wd}</td>
        <td>{_.get(data, "info.weather.main.temp", "—")}</td>
        <td>{_.get(data, "info.weather.weather[0].description", "—")}</td>
        <td>{data.comment}</td>
      </tr>
    );
  }

  /**
   * @ignore
   */
  render() {
    const table =
      this.state.list.length > 0 ? (
        <table className="form__table">
          <thead>
            <tr>
              <th>Cty</th>
              <th>Weather date</th>
              <th>Temp</th>
              <th>Weather</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {this.state.list.map((data, id) =>
              this.listItem(data, this.state.list.length - id)
            )}
          </tbody>
        </table>
      ) : (
        <div className="form__table">
          No weather info yet. Left ther first one.
        </div>
      );
    let error;
    if (this.state.error) {
      error = <div class="form__error">Please select the city</div>;
    }
    return (
      <div>
        {table}
        <form onSubmit={this.handleSubmit.bind(this)} className="form">
          {error}
          <Cities
            cities={this.props.cities}
            change={this.changeCity.bind(this)}
            city={_.get(this.state, "info.city")}
          />

          <textarea
            className="form__comment"
            value={this.state.comment}
            onChange={this.changeComment.bind(this)}
          />
          <div className="form__submit">
            <input type="submit" value="Add" />
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
