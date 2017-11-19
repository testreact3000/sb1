import React, { Component } from 'react';


function loadCities () {
    return fetch('https://cors-anywhere.herokuapp.com/http://country.io/capital.json')
     .then((resp)=>{
	if(!resp.ok){
	   throw Error(resp.statusText);
	}     
        return resp.json();
     })
     .then((resp)=>{
	let cities = [];
	for(let cc in resp){
	   if(resp[cc]!==""){
	     cities.push(resp[cc]);
	   }
	}
	return cities;     
     });	  
}

class Cities extends Component {
  constructor(props){
     super(props);
     this.state={
       cities: [],
       errors: [],
     };	  
  }
  componentDidMount(){
     loadCities()
     .then((cities)=>{
        this.setState({cities});
     }).catch((err)=>{
        this.setState({errors:[...this.state.errors,err]});
     });  
  }	
  render() {
    const cities = this.state.cities.map((x,id)=>{
       return <option key={id} value={x}>{x}</option>;
    })
    return <select >{cities}</select>
  }

}
export default Cities;
