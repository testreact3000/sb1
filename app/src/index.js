import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Cities from 'Cities';
import registerServiceWorker from './registerServiceWorker';
import UniversalRouter from 'universal-router';


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

function changeCity (city) {
  window.history.pushState({city},null,`/${city}`);
}
const routes = [ 
	{ 
	  path : "/", 
          async action({params,next}) {
	      const cities = await loadCities();
	      params.cities = cities;
	      return await next();	      
	  }, 
	  children : [
	    { 
	      path: "/:city", 
	      action: (context,{city, cities}) => {
		  return <Cities city={city} cities={cities} change={changeCity}/>
	      }, 
	    }, 
	    { 
	      path: '(.*)', 
	      action: (context, {cities}) => <Cities cities={cities} change={changeCity} /> , 
	    }]
	 } ]; 

const router = new UniversalRouter(routes);

router
  .resolve({pathname:window.location.pathname})
  .then((rootComponent) => {
    ReactDOM.render(rootComponent, document.getElementById('root'));
    registerServiceWorker();
  });
