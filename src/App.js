import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

class App extends Component {
  componentDidMount() {
    this.getVenues();
    this.renderMap();
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&callback=initMap`);
    window.initMap = this.initMap;
  }

  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      query: 'coffee',
      near: 'London',
      v: 20182507,
    };

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => console.log(response.data.response.groups[0].items))
      .catch(error => console.log(error));
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 51.517352, lng: -0.073267 },
      zoom: 15,
    });
    console.log(map);
  }

  render() {
    return (
      <main>
        <div id="map" />
      </main>
    );
  }
}

export default App;
