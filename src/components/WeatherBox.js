import React from 'react';
import './WeatherBox.css';

export default class WeatherBox extends React.Component {
  // returns weekday to a given Date value
  getDay = date => {
    let weekday = new Array(7);
    weekday[0] = 'Sunday';
    weekday[1] = 'Monday';
    weekday[2] = 'Tuesday';
    weekday[3] = 'Wednesday';
    weekday[4] = 'Thursday';
    weekday[5] = 'Friday';
    weekday[6] = 'Saturday';

    return weekday[new Date(date).getDay()];
  };
  description = weatherDescription => {
    if (weatherDescription.includes('rain')) {
      return 'Bring an umbrella!';
    } else if (weatherDescription.includes('cloud')) {
      return 'Bring a jacket';
    } else if (weatherDescription.includes('clear')) {
      return 'It\'s sunny!';
    } else {
      return 'Weather conditions are uncertain';
    }
  };

  render(props) {
    const { date, icon, temp, weather_desc } = this.props;

    // Check if date, icon, temp, and weather description are available before rendering
    if (!date || !icon || !temp || !weather_desc) {
      return null;
    }
    const weatherDescription= this.description(weather_desc);

    return (
      <div className='weather-box'>
        <h1>{this.props.date ? this.getDay(this.props.date) : ''}</h1>
        <img
          src={
            this.props.icon
              ? require(`../images/${this.props.icon}.svg`)
              : require('../images/01d.svg')
          }
          alt='sun'
        />
        <span className='temp'>{Math.round(this.props.temp - 273.15)}°C</span>
        <p>{weatherDescription}</p>
      </div>
    );
  }
}