import React from 'react';
import ReactDOM from 'react-dom';
import ProcessLocationData from './processLocationData.jsx'

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
      description: ""
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    this.setState({icon: weather.icon.slice(0, -1)});
    this.setState({description: weather.description})
  }

  render() {
    const { icon } = this.state;
    const { description } = this.state;
    
    return (
      <div className="icon">
        <ProcessLocationData />
        { icon && <img src={`/img/${icon}.svg`} /> }
        <p>{ description }</p>
        <p className="info">* This app's functionality is based on geolocation. If your geolocation is off or shows an other location that isn't your actual location it won't work as desired.</p>
        <footer>Author: Marko Klemetti, Further Development: Tiia Rautavesi</footer>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
