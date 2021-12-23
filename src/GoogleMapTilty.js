import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Overlays from './Overlays.js';
import Target from './Target.js';
//import Mask from './Mask.js'; Static entry in index.html


class GoogleMapTilty extends React.Component {
  constructor() {
    super();
    this.state = {color: "red",
    
    }
  }
  render() {
    return (
      <Map google={this.props.google} zoom={14.9}>
        <Target />
        <Overlays sliderPosition = {this.state.sliderPosition} db={this.props.db} configData={this.props.configData} />

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

       
      </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API_KEY),
  version: 'beta'
})(GoogleMapTilty);
