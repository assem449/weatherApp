import React from 'react';
import './App.css';
import MainWeatherWindow from './components/MainWeatherWindow/MainWeatherWindow';
import CityInput from './components/CityInput/CityInput';
import WeatherBox from './components/WeatherBox/WeatherBox';
import ClothingRecommendation from './components/ClothingRecommendation/ClothingRecommendation';

class App extends React.Component {
  // Initialize the state with city set to undefined and an array for 5 days' weather data
  state = {
    city: undefined,
    days: new Array(5)
  };

  // Method to update the state with weather data received from API
  updateState = data => {
    const city = data.city.name;
    const days = [];
    const dayIndices = this.getDayIndices(data);
  
    for (let i = 0; i < 5; i++) {
      // Convert temperature from Kelvin to Celsius
      const temperatureCelsius = data.list[dayIndices[i]].main.temp - 273.15;
  
      days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: temperatureCelsius // Store temperature in Celsius
      });
    }
  
    const currentTemperature = days[0].temp;
    this.setState({
      city: city,
      days: days,
      temperature: currentTemperature
    });
  };
  

  // Asynchronous method to make an API call to OpenWeatherMap based on the provided city
  makeApiCall = async city => {
    const api_data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
    ).then(resp => resp.json());

    if (api_data.cod === '200') {
      await this.updateState(api_data);
      return true;
    } else return false;
  };

  // Helper method to get indices of the next five days' weather data in the API response
  getDayIndices = data => {
    let dayIndices = [];
    dayIndices.push(0);

    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== '15'
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

   // Render method to render the components and UI elements on the webpage
  render() {
    const { city, days, temperature} = this.state;
    const WeatherBoxes = () => {
      const weatherBoxes = this.state.days.slice(1).map((day, index) => (
        <li key={index}>
          <WeatherBox {...day} />
        </li>
      ));

      return <ul className='weather-box-list'>{weatherBoxes}</ul>;
    };

    return (
      <div className='App'>
        <div className='content'>
          <div className='clothes-list'>
            <h2>Clothing recommendations:</h2>
            {city && temperature && <ClothingRecommendation weatherDesc={days[0].weather_desc} temperature={temperature} />}
          </div>
          <div className='weather-info'>
            <MainWeatherWindow data={this.state.days[0]} city={this.state.city}>
              <WeatherBoxes />
            </MainWeatherWindow>
          </div>
        </div>
        <div className='bottom-bar'>
          <CityInput city={this.state.city} makeApiCall={this.makeApiCall.bind(this)} />
        </div>
      </div>
    );
  }
}

export default App;