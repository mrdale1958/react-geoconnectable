import React from 'react';
import './TiltyDisplay.css';

import GoogleMapTilty from './GoogleMapTilty.js';
//import MouseSlider from './MouseSlider.js';
import PhidgetTilty from './PhidgetTilty.js';
//import FauxPhidgetTilty from './FauxPhidgetTilty.js';
//import NoSikoPhidgetSlider from './NoSikoPhidgetSlider.js';


class TiltyDisplay extends React.Component {
  
  constructor() {
    super();
    this.state = {
        sliderPosition: 0
    };
    this.handlePhidgetEncoderCallback = this.handlePhidgetEncoderCallback.bind(this);
    this.handlePhidgetAccelerometerCallback = this.handlePhidgetAccelerometerCallback.bind(this);
    //this.handleMouseCallback = this.handleMouseCallback.bind(this);
}
//state = {
  //  sliderPosition: "",
  // }

 /*  handleMouseCallback = (positionData) =>{
    this.setState((state, props) => {
      return {sliderPosition: positionData};
    });
  } */
  componentDidMount() {
    const maxClicks = this.props.configData.availableClicks;
      if (this.props.configData.encoder) {
        this.props.configData.encoder.onPositionChange = 
        function onEncoder0_PositionChange(positionChange, 
                                            timeChange, 
                                            indexTriggered) {
          let newX = this.props.configData.encoder.getPosition();
          ////console.log('PositionChange: ', positionChange.toString(),newX);
          if (newX < 0) {
              //console.log('0000000000000',newX);
              this.props.configData.encoder.setPosition(0);
              newX=0;
          } else if (newX>maxClicks) {
              //console.log('===============',newX);
              this.props.configData.encoder.setPosition(maxClicks);
              newX=maxClicks;
          }
          //console.log('++++++++++',newX);
          //console.log('----------',newX);
          this.handlePhidgetEncoderCallback(newX);
    };
  }
    if (this.props.configData.spatial) {
      this.props.configData.spatial.onPositionChange = 
          function (acceleration, timestamp) {
      console.log('Acceleration: \t' + acceleration[0]+ '  |  ' + acceleration[1]+ '  |  ' + acceleration[2]);
      console.log('Timestamp: ' + timestamp.toString())
      console.log('----------');
      this.handlePhidgetAccelerometerCallback(acceleration);
    };
  }
  }
  handlePhidgetEncoderCallback = (positionData) =>{
    console.log('phidget encoder callback',positionData);
    this.setState((state, props) => {
      return {rotationPosition: positionData}; // + this.props.configData.screenWidth/2};
    });
  }

  handlePhidgetAccelerometerCallback = (tiltVector) =>{
    //console.log('phidget accelerometer callback',tiltVector);
    this.setState((state, props) => {
      return {tableAttitude: tiltVector}; // + this.props.configData.screenWidth/2};
    });
  }

  render(){
    return(
        
      <div className="TiltyDisplay">

        <GoogleMapTilty rotationPosition={this.state.rotationPosition} tableAttitude={this.state.tableAttitude} db={this.props.db} configData={this.props.configData} />
        <PhidgetTilty id='phidgetSpinny' 
              configData={this.props.configData} rotationCallback={this.handlePhidgetEncoderCallback}  tiltCallback={this.handlePhidgetAccelerometerCallback} />
      </div>
    );
  }
}

export default TiltyDisplay;
