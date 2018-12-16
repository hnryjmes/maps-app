import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const loadScript = (url) => {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
};

class App extends Component {
  state = {
    venues: [],
  }

  componentDidMount() {
    this.getVenues();
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
      .then((response) => {
        this.setState({
          venues: response.data.response.groups[0].items,
        }, this.renderMap());
      })
      .catch((error) => {
        throw Error(error);
      });
  }

  initMap = () => {
    const MAKERS_ACADEMY_POSITION = {
      lat: 51.517352,
      lng: -0.073267,
    };

    const myMap = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: MAKERS_ACADEMY_POSITION.lat, lng: MAKERS_ACADEMY_POSITION.lng },
      zoom: 15,
    });

    const { venues } = this.state;
    venues.map(myVenue => new window.google.maps.Marker({
      position: {
        lat: myVenue.venue.location.lat,
        lng: myVenue.venue.location.lng,
      },
      map: myMap,
    }));
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
