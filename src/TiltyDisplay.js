import React from 'react';
import './TiltyDisplay.css';

import GoogleMapTilty from './GoogleMapTilty.js';
//import MouseSlider from './MouseSlider.js';
import PhidgetTilty from './PhidgetTilty.js';
import FauxPhidgetTilty from './FauxPhidgetTilty.js';
//import NoSikoPhidgetSlider from './NoSikoPhidgetSlider.js';


class TiltyDisplay extends React.Component {
  
  constructor() {
    super();
    this.state = {
        sliderPosition: 0
    };
    this.handlePhidgetCallback = this.handlePhidgetCallback.bind(this);
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
  handlePhidgetCallback = (positionData) =>{
    console.log('phidget callback',positionData);
    this.setState((state, props) => {
      return {sliderPosition: positionData}; // + this.props.configData.screenWidth/2};
    });
  }

  render(){
    return(
        
      <div className="TiltyDisplay">

        <GoogleMapTilty sliderPosition = {this.state.sliderPosition} db={this.props.db} configData={this.props.configData} />
        <PhidgetTilty id='phidgetSlider' positionCallback = {this.handlePhidgetCallback} configData={this.props.configData} />
        <FauxPhidgetTilty id='fauxphidgetSlider' sliderPosition = {this.state.sliderPosition} positionCallback = {this.handlePhidgetCallback} configData={this.props.configData} /> 
      </div>
    );
  }
}

export default TiltyDisplay;
