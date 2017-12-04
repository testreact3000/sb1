import Cities from "Cities";
import Form from "Form";
import React from "react";
import ReactDOM from "react-dom";
import UniversalRouter from "universal-router";
import registerServiceWorker from "./registerServiceWorker";

/**
 * @const store Storage abstraction
 */
const store = require("store");

/**
 * Load list of world capitals.
 */
function loadCities() {
  return fetch(
    "https://cors-anywhere.herokuapp.com/http://country.io/capital.json"
  )
    .then(resp => {
      if (!resp.ok) {
        throw Error(resp.statusText);
      }
      return resp.json();
    })
    .then(resp => {
      const cities = [];
      for (const cc in resp) {
        if (resp[cc] !== "") {
          cities.push(resp[cc]);
        }
      }
      return cities;
    });
}

/**
 * Save state of selector to history api.
 */
function changeCity(data) {
  window.history.pushState({ city: data.city }, null, `/city/${data.city}`);
}

/**
 * Save state of component to abstract storage.
 */
function saveList(data) {
  store.set("form", JSON.stringify(data));
}

/**
 * Routes
 */
const routes = [
  {
    path: "/",
    async action({ params, next }) {
      const cities = await loadCities();
      params.cities = cities;
      return await next();
    },
    children: [
      {
        path: "/city/:city",
        action: (context, { city, cities }) => (
          <Cities city={city} cities={cities} change={changeCity} />
        )
      },
      {
        path: "/city",
        action: (context, { cities }) => (
          <Cities cities={cities} change={changeCity} />
        )
      },
      {
        path: "(.*)",
        action: (context, { cities }) => {
          let data = store.get("form");
          if (data !== undefined) {
            data = JSON.parse(data);
          }
          return <Form cities={cities} onSubmit={saveList} defaults={data} />;
        }
      }
    ]
  }
];
/**
 * @const router Universal router
 */
const router = new UniversalRouter(routes);

router.resolve({ pathname: window.location.pathname }).then(rootComponent => {
  ReactDOM.render(rootComponent, document.getElementById("root"));
  registerServiceWorker();
});
