import React from 'react';
import './SlidingDisplay.css';
import MovingBackground from './MovingBackground.js';
import Lanes from './Lanes.js';
import PharmacyWall from './PharmacyWall.js';
import Slider from './Slider.js';
import BackgroundGraphic from './Timeline 15 ART1900fix.svg';

class SlidingDisplay extends React.Component {
  
  //state = {
  //  sliderPosition: "",
  // }

  handleCallback = (positionData) =>{
    this.setState({sliderPosition: positionData})
  }
 

  render(){
    const {position} = 0; //this.state.sliderPosition;
    return(
        
      <div className="SlidingDisplay">
        <MovingBackground image = {BackgroundGraphic} alttext='John Mattos background graphic' sliderPosition = {position} />
        <Lanes />
        <PharmacyWall sliderPosition = {position} />
        <Slider id='mouseSlider' positionCallback = {this.handleCallback} />
      </div>
    );
  }
}

export default SlidingDisplay;
