import React, { Component } from 'react';
import City from './City';
import  './Cities/css/Cities.css'
class Cities extends Component {
  constructor(props){
     super(props);
     this.state={
       cities : props.cities,
       errors: [],
       city: props.city||"",
       change: props.change || (()=>{}),
       weather: null,
       weather_date: null,
       timeout: null,     
     };	  
  }
  handleChange(e){
    const city = e.target.value;	  
    console.log(['change',city]);	  
    this.setState({city}, () => {
	    this.state.change(city);
            this.loadCityWeather(city); 
    });	  
  }
  componentDidMount(){
    console.log(['mount',this.state.city]);	  
    this.loadCityWeather(this.state.city);
  }	
  loadCityWeather(city){
      clearTimeout(this.state.timeout);
      this.setState({timeout:setTimeout(()=>{this.loadCityWeather(city)},1000*60)});	  
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=bd5e378503939ddaee76f12ad7a97608`).then(
	  (resp) => {
	     if(resp.ok){
	       return resp.json();
	     }
	  }    
      ).then((json)=>{
         this.setState ({
            weather_date : new Date(),
            weather : json,		 
	 });
      });
  }	
  render() {
    let cities = this.state.cities.map((x,id)=>{
       return <option key={id} value={x}>{x}</option>;
    })
    if(this.state.city===""){
      cities = [
        <option key={-1}>Select city</option>,
        ...cities	    
      ];	  
    }	  
    return <div className="cities">
		  <select value={this.state.city} onChange={this.handleChange.bind(this)}>{cities}</select>
                  <City 
	             weather={this.state.weather} 
	             updated={this.state.weather_date}
	             city={this.state.city} 
		  />
           </div>		  
  }

}
export default Cities;
