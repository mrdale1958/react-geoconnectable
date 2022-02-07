import React from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import Overlays from './Overlays.js';
import Target from './Target.js';
//import Mask from './Mask.js'; Static entry in index.html


class GoogleMapTilty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: "red",
    }
  }
  render() {
    const containerStyle = {
      position: 'relative',  
      width: '1080px',
      height: '1080px'
    }
    const currentZoom = 3 + this.props.configData.maxZoom*this.props.rotationPosition/this.props.configData.maxClicks;
    console.log("Zoom:", currentZoom, "Attitude", this.props.tableAttitude);
    return (
      <Map className='tilting-map' 
                    containerStyle={containerStyle}
                    google={this.props.google} 
                    zoom={currentZoom}
                    initialCenter={{
                      lat: 40.854885,
                      lng: -88.081807
                    }}>
        <Target />
        <Overlays rotationPosition = {this.props.rotationPosition} tableAttitude = {this.props.tableAttitude} db={this.props.db} configData={this.props.configData} />

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
