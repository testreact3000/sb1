import { Button, Welcome } from "@storybook/react/demo";
import { action } from "@storybook/addon-actions";
import { before, describe, it, specs } from "storybook-addon-specifications";
import { configure } from "enzyme";
import { expect } from "chai";
import { linkTo } from "@storybook/addon-links";
import { mount, shallow } from "enzyme";
import { storiesOf } from "@storybook/react";
import Adapter from "enzyme-adapter-react-16";
import Cities from "Cities";
import City from "City";
import Form from "Form";
import React from "react";
import sinon from "sinon";

configure({ adapter: new Adapter() });

/*
 * StoriesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);
 *
 * storiesOf('Button', module)
 * .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
 * .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);
 */
storiesOf("City", module).add("weather", () => {
  const city = (
    <City
      weather={{
        weather: [{ icon: "09d" }],
        main: { temp: 40 }
      }}
    />
  );

  specs(() =>
    describe("City", () => {
      let output;
      before(() => {
        output = mount(city);
      });
      it("Should have temperature", () => {
        expect(output.text()).to.contain("40");
      });
      it("Should render weather icon", () => {
        const weather = output.find(".city__weather");
        expect(weather.hasClass("owi-09d")).to.be.true;
      });
      it("Should rendender temperature", () => {
        const temp = output.find(".city__temp");
        expect(temp.text()).equal("40°");
      });
    })
  );

  return city;
});

storiesOf("Cities", module)
  .add("Not selected", () => {
    const cities = <Cities cities={["London", "Moscow"]} />;
    specs(() =>
      describe("Cities", () => {
        it("Has City child", () => {
          const comp = shallow(cities);
          expect(comp.find("City")).to.have.length(1);
        });
        it("Has select child", () => {
          const comp = shallow(cities);
          expect(comp.find("select")).to.have.length(1);
        });
        it("No city selected", () => {
          const comp = shallow(cities);
          expect(comp.find("select").props().value).equal("");
        });
        it("3 options in select", () => {
          const comp = shallow(cities);
          expect(comp.find("option")).to.have.length(3);
        });
        it("Test change", () => {
          const comp = mount(cities);
          comp
            .find("select")
            .simulate("change", { target: { value: "Moscow" } });
          expect(comp.find("select").props().value).equal("Moscow");
        });
        it("Test change 2", () => {
          const onChange = sinon.spy();
          const comp = shallow(
            <Cities cities={["London", "Moscow"]} change={onChange} />
          );
          comp
            .find("select")
            .simulate("change", { target: { value: "Moscow" } });
          expect(onChange.calledOnce).to.be.true;
          expect(onChange.getCall(0).args[0].city).equal("Moscow");
        });
      })
    );
    return cities;
  })
  .add("Selected", () => {
    const cities = <Cities cities={["London", "Moscow"]} city="London" />;
    specs(() =>
      describe("Cities", () => {
        it("Has City child", () => {
          const comp = shallow(cities);
          expect(comp.find("City")).to.have.length(1);
        });
        it("Has select child", () => {
          const comp = shallow(cities);
          expect(comp.find("select")).to.have.length(1);
        });
        it("London selected", () => {
          const comp = shallow(cities);
          expect(comp.find("select").props().value).equal("London");
        });
        it("2 options in select", () => {
          const comp = shallow(cities);
          expect(comp.find("option")).to.have.length(2);
        });
      })
    );
    return cities;
  });
storiesOf("Form", module)
  .add("Initial", () => {
    const form = (
      <Form
        cities={[
          "London",
          "Moscow",
          "Dhaka",
          "Mata Utu",
          "Apia",
          "Ouagadougou"
        ]}
      />
    );
    specs(() =>
      describe("Initial Form", () => {
        let comp;
        before(() => {
          comp = shallow(form);
        });
        it("Has `No weather info…` text", () => {
          expect(comp.find(".form__table").text()).contain(
            "No weather info yet"
          );
        });
        it("Has cities component", () => {
          expect(comp.find("Cities")).to.have.length(1);
        });
        it("Has comment textarea", () => {
          expect(comp.find(".form__comment")).to.have.length(1);
        });
        it("Has submit button", () => {
          expect(comp.find('input[type="submit"]')).to.have.length(1);
        });
      })
    );
    return form;
  })
  .add("With defaults", () => {
    const defs = {
      list: [
        {
          comment: "",
          info: {
            city: "Dhaka",
            weather: {
              coord: { lon: 90.41, lat: 23.71 },
              weather: [
                { id: 721, main: "Haze", description: "haze", icon: "50n" }
              ],
              base: "stations",
              main: {
                temp: 295.15,
                pressure: 1012,
                humidity: 73,
                temp_min: 295.15,
                temp_max: 295.15
              },
              visibility: 3200,
              wind: { speed: 3.1, deg: 310 },
              clouds: { all: 0 },
              dt: 1511456400,
              sys: {
                type: 1,
                id: 7879,
                message: 0.0071,
                country: "BD",
                sunrise: 1511396322,
                sunset: 1511435459
              },
              id: 1185241,
              name: "Dhaka",
              cod: 200
            },
            weather_date: "2017-11-23T17:37:01.681Z"
          }
        },
        {
          comment: "",
          info: {
            city: "Sarajevo",
            weather: {
              coord: { lon: 18.36, lat: 43.85 },
              weather: [
                {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01n"
                }
              ],
              base: "stations",
              main: {
                temp: 279.15,
                pressure: 1021,
                humidity: 75,
                temp_min: 279.15,
                temp_max: 279.15
              },
              visibility: 10000,
              wind: { speed: 2.6, deg: 100 },
              clouds: { all: 0 },
              dt: 1511456400,
              sys: {
                type: 1,
                id: 5967,
                message: 0.014,
                country: "BA",
                sunrise: 1511416333,
                sunset: 1511450029
              },
              id: 3191281,
              name: "Sarajevo",
              cod: 200
            },
            weather_date: "2017-11-23T17:37:05.978Z"
          }
        },
        {
          comment: "3",
          info: {
            city: "Bridgetown",
            weather: {
              coord: { lon: -59.62, lat: 13.1 },
              weather: [
                {
                  id: 802,
                  main: "Clouds",
                  description: "scattered clouds",
                  icon: "03d"
                }
              ],
              base: "stations",
              main: {
                temp: 303.15,
                pressure: 1012,
                humidity: 66,
                temp_min: 303.15,
                temp_max: 303.15
              },
              visibility: 10000,
              wind: { speed: 6.2, deg: 100 },
              clouds: { all: 40 },
              dt: 1511456400,
              sys: {
                type: 1,
                id: 4160,
                message: 0.0034,
                country: "BB",
                sunrise: 1511431289,
                sunset: 1511472527
              },
              id: 3374036,
              name: "Bridgetown",
              cod: 200
            },
            weather_date: "2017-11-23T17:37:10.221Z"
          }
        },
        {
          comment: "4",
          info: { city: "Mata Utu", weather_date: "2017-11-23T17:37:15.545Z" }
        },
        {
          comment: "5",
          info: {
            city: "Dhaka",
            weather: {
              coord: { lon: 90.41, lat: 23.71 },
              weather: [
                { id: 721, main: "Haze", description: "haze", icon: "50n" }
              ],
              base: "stations",
              main: {
                temp: 295.15,
                pressure: 1012,
                humidity: 73,
                temp_min: 295.15,
                temp_max: 295.15
              },
              visibility: 3200,
              wind: { speed: 3.1, deg: 310 },
              clouds: { all: 0 },
              dt: 1511456400,
              sys: {
                type: 1,
                id: 7879,
                message: 0.0071,
                country: "BD",
                sunrise: 1511396322,
                sunset: 1511435459
              },
              id: 1185241,
              name: "Dhaka",
              cod: 200
            },
            weather_date: "2017-11-23T17:37:32.748Z"
          }
        },
        {
          comment: "",
          info: {
            city: "Brussels",
            weather: {
              coord: { lon: 4.35, lat: 50.85 },
              weather: [
                {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01n"
                }
              ],
              base: "stations",
              main: {
                temp: 283.29,
                pressure: 1008,
                humidity: 76,
                temp_min: 281.15,
                temp_max: 285.15
              },
              visibility: 10000,
              wind: { speed: 3.6, deg: 240 },
              clouds: { all: 0 },
              dt: 1511457900,
              sys: {
                type: 1,
                id: 4842,
                message: 0.0028,
                country: "BE",
                sunrise: 1511421151,
                sunset: 1511451932
              },
              id: 2800866,
              name: "Brussels",
              cod: 200
            },
            weather_date: "2017-11-23T17:38:10.794Z"
          }
        },
        {
          comment: "",
          info: {
            city: "Sofia",
            weather: {
              coord: { lon: 23.32, lat: 42.7 },
              weather: [
                {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01n"
                }
              ],
              base: "stations",
              main: {
                temp: 278.15,
                pressure: 1021,
                humidity: 86,
                temp_min: 278.15,
                temp_max: 278.15
              },
              visibility: 6000,
              wind: { speed: 1, deg: 160 },
              clouds: { all: 0 },
              dt: 1511458200,
              sys: {
                type: 1,
                id: 5444,
                message: 0.0035,
                country: "BG",
                sunrise: 1511414941,
                sunset: 1511449040
              },
              id: 727011,
              name: "Sofia",
              cod: 200
            },
            weather_date: "2017-11-23T17:44:38.688Z"
          }
        },
        {
          comment: "adasa",
          info: {
            city: "Bridgetown",
            weather: {
              coord: { lon: -59.62, lat: 13.1 },
              weather: [
                {
                  id: 802,
                  main: "Clouds",
                  description: "scattered clouds",
                  icon: "03d"
                }
              ],
              base: "stations",
              main: {
                temp: 303.15,
                pressure: 1012,
                humidity: 66,
                temp_min: 303.15,
                temp_max: 303.15
              },
              visibility: 10000,
              wind: { speed: 6.2, deg: 100 },
              clouds: { all: 40 },
              dt: 1511456400,
              sys: {
                type: 1,
                id: 4160,
                message: 0.0034,
                country: "BB",
                sunrise: 1511431289,
                sunset: 1511472527
              },
              id: 3374036,
              name: "Bridgetown",
              cod: 200
            },
            weather_date: "2017-11-23T17:44:47.836Z"
          }
        },
        {
          comment: "asdas",
          info: {
            city: "Sarajevo",
            weather: {
              coord: { lon: 18.36, lat: 43.85 },
              weather: [
                {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01n"
                }
              ],
              base: "stations",
              main: {
                temp: 279.15,
                pressure: 1021,
                humidity: 75,
                temp_min: 279.15,
                temp_max: 279.15
              },
              visibility: 10000,
              wind: { speed: 2.6, deg: 100 },
              clouds: { all: 0 },
              dt: 1511456400,
              sys: {
                type: 1,
                id: 5967,
                message: 0.014,
                country: "BA",
                sunrise: 1511416333,
                sunset: 1511450029
              },
              id: 3191281,
              name: "Sarajevo",
              cod: 200
            },
            weather_date: "2017-11-23T17:45:00.660Z"
          }
        },
        {
          comment: "",
          info: {
            city: "Brussels",
            weather: {
              coord: { lon: 4.35, lat: 50.85 },
              weather: [
                {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01n"
                }
              ],
              base: "stations",
              main: {
                temp: 282.73,
                pressure: 1008,
                humidity: 76,
                temp_min: 281.15,
                temp_max: 284.15
              },
              visibility: 10000,
              wind: { speed: 4.1, deg: 230 },
              clouds: { all: 0 },
              dt: 1511459400,
              sys: {
                type: 1,
                id: 4842,
                message: 0.0029,
                country: "BE",
                sunrise: 1511421153,
                sunset: 1511451931
              },
              id: 2800866,
              name: "Brussels",
              cod: 200
            },
            weather_date: "2017-11-23T18:03:23.776Z"
          }
        },
        {
          comment: "",
          info: {
            city: "Brussels",
            weather: {
              coord: { lon: 4.35, lat: 50.85 },
              weather: [
                {
                  id: 800,
                  main: "Clear",
                  description: "clear sky",
                  icon: "01n"
                }
              ],
              base: "stations",
              main: {
                temp: 282.73,
                pressure: 1008,
                humidity: 76,
                temp_min: 281.15,
                temp_max: 284.15
              },
              visibility: 10000,
              wind: { speed: 4.1, deg: 230 },
              clouds: { all: 0 },
              dt: 1511459400,
              sys: {
                type: 1,
                id: 4842,
                message: 0.0029,
                country: "BE",
                sunrise: 1511421153,
                sunset: 1511451931
              },
              id: 2800866,
              name: "Brussels",
              cod: 200
            },
            weather_date: "2017-11-23T18:03:23.776Z"
          }
        }
      ],
      comment: "trololo",
      info: {
        city: "Brussels",
        weather: {
          coord: { lon: 4.35, lat: 50.85 },
          weather: [
            { id: 800, main: "Clear", description: "clear sky", icon: "01n" }
          ],
          base: "stations",
          main: {
            temp: 282.73,
            pressure: 1008,
            humidity: 76,
            temp_min: 281.15,
            temp_max: 284.15
          },
          visibility: 10000,
          wind: { speed: 4.1, deg: 230 },
          clouds: { all: 0 },
          dt: 1511459400,
          sys: {
            type: 1,
            id: 4842,
            message: 0.0029,
            country: "BE",
            sunrise: 1511421153,
            sunset: 1511451931
          },
          id: 2800866,
          name: "Brussels",
          cod: 200
        },
        weather_date: "2017-11-23T18:03:23.776Z"
      },
      error: false
    };
    // Prettier-ignore
    const form = (
      <Form
        cities={[
          "London",
          "Moscow",
          "Dhaka",
          "Mata Utu",
          "Apia",
          "Ouagadougou",
          "Brussels"
        ]}
        defaults={defs}
      />
    );

    specs(() =>
      describe("Form with data", () => {
        let comp;
        before(() => {
          comp = mount(form);
        });
        it("Form table row count equals list length", () => {
          expect(
            comp
              .find(".form__table")
              .find("tbody")
              .find("tr")
          ).to.have.length(defs.list.length);
        });
        it("City restored", () => {
          expect(comp.find("Cities").props().city).equals(defs.info.city);
        });
        it("Comment restored", () => {
          expect(comp.find(".form__comment").props().value).equals(
            defs.comment
          );
        });
      })
    );
    return form;
  });
