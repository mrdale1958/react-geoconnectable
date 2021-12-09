import React from 'react';

class Template extends React.Component {
    constructor() {
        super();
        this.state = {color: "red"};
      }
    render() {
      let acceleratedPosition = this.props.configData.printedGraphicScaleX * this.props.sliderPosition;
        return (
          <div className="printed-graphic" style={{left: 
                  String(
                    Math.max(-this.props.configData.availableClicks, 
                      Math.min(this.props.configData.printedGraphicOffset, -acceleratedPosition + this.props.configData.printedGraphicOffset))) + "px"}}>
          {/* <object id="printed-svg-object" data="Timeline 11 ARTscreen versiondm.svg" type="image/svg+xml"> 
            <img src="background.jpg" />
          </object>	 */}
          <img src={this.props.image} 	id="printed-svg-object" alt={this.props.alttext}/>	
        </div>
        );
  }
}

export default Template;
