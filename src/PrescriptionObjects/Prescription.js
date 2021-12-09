import React from 'react';
//import Dot from './Dot.js';
//import DateLabel from './DateLabel.js';
//import FullLabel from './FullLabel.js';
import FullScript from './FullScript.js';

class Prescription extends React.Component {
    constructor() {
        super();
        this.state = {color: "red", 
                      timePosition: 0,
                      };
      }
    render() {
      //let modalDiv;
      let magicDiv;

      if (this.props.mode === "dot") {
       // modalDiv = <Dot eventData = {this.props.eventData}/>
        magicDiv = <FullScript id = {this.props.eventData.TickPosInInches} className = "event-dot" eventData = {this.props.eventData}/>

      } else if (this.props.mode === "date") {
        //modalDiv = <DateLabel eventData = {this.props.eventData}/>
        magicDiv = <FullScript id = {this.props.eventData.TickPosInInches} className = "event-date" eventData = {this.props.eventData}/>

      } else if (this.props.mode === "label") {
        //modalDiv = <FullLabel eventData = {this.props.eventData}/>
        magicDiv = <FullScript id = {this.props.eventData.TickPosInInches} className = "event-label" eventData = {this.props.eventData}/>

      } else if (this.props.mode === "full") {
        //modalDiv = <FullScript className = "event-block" eventData = {this.props.eventData}/>
        let classList = "event-block " + this.props.eventData.Yalign;
        magicDiv = <FullScript id = {this.props.eventData.TickPosInInches} className =  {classList} eventData = {this.props.eventData}/>

      } 
        return (
          <div className='Prescription'>
            {magicDiv}
          </div>
        );
  }
}

export default Prescription;
