import React, { Component } from 'react';

class Cities extends Component {
  constructor(props){
     super(props);
     this.state={
       cities : props.cities,
       errors: [],
       city: props.city||"",
       change: props.change || (()=>{}),     
     };	  
  }
/*  componentDidMount(){
     loadCities()
     .then((cities)=>{
        this.setState({cities});
     }).catch((err)=>{
        this.setState({errors:[...this.state.errors,err]});
     });  
  }*/
  handleChange(e){
    const city = e.target.value;	  
    this.setState({city}, () => {this.state.change(city)});	  
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
    return <select value={this.state.city} onChange={this.handleChange.bind(this)}>{cities}</select>
  }

}
export default Cities;
