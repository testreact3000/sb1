import React, {Component} from 'react';
import 'City/css/open-weather-icons.css';
import 'City/css/City.css';
class City extends Component {
  render(){
    let icon, temp;
    if(this.props.weather){
        icon = <i className={`owi owi-${this.props.weather.weather[0].icon} city__weather`} />;
	temp = `${Math.round(this.props.weather.main.temp - 273.15)}°`;    
    }
    	  
    return <div className="city">
            {icon}
	    <div className="city__temp">{temp}</div>
	  </div> ;
  }	
}
export default City;
