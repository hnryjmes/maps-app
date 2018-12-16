import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&callback=initMap`);
    window.initMap = this.initMap;
  }

  initMap = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 51.5073, lng: -0.1276},
      zoom: 15
    });
    console.log(map);
  }

  render() {
    return (
      <main>
        <div id="map">
        </div>
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
