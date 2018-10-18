import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';

const baseURL = "//0.0.0.0:8080/api/location";

/* This component searches, sends and writes out the user's location */

const getLocationFromApi = async () => {
  try {
    const response = await fetch('//ip-api.com/json');
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

class ProcessLocationData extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      location: "",
    };
  }
  
  async componentWillMount() {

    const currLocation = await getLocationFromApi();
    const currCity = currLocation.city;
    const currCityandCountry = currCity + ',' + currLocation.countryCode.toLowerCase();
    
    let locationToBackend = {
      currCity: currCityandCountry,
    };
    
    console.log(locationToBackend);
    
    this.setState({location: currCity});
  
    fetch(baseURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(locationToBackend),
    })
  }

  render() {
    
    const { location } = this.state;
    
    return (     
        <div className="title">
          <h1>Weather in {String(location)}*</h1>
        </div>
    );
  }
}

export default ProcessLocationData;
