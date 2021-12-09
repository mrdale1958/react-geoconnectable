import React from 'react';
import Overlay from './Overlay.js';


class Overlays extends React.Component {
    constructor() {
      super();
      this.state = {color: "red",  loadedFeatures : [],
    };
    }
    buildDivs(database, position){
        return <div></div>;
    }
    render() {
        //let [sortedData] = this.props.db.overlays; 
        let sortedData = 0; 
        let divs = this.buildDivs(sortedData, this.props.sliderPosition);
       
          return (
              <div id='Overlays'>
              <Overlay  configData={this.props.configData} />
              {divs}
              
              </div>
          );
    }
}    
    
export default Overlays;
