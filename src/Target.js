import React from 'react';
import {Rectangle} from 'google-maps-react';


class Mask extends React.Component {
    

    render() {
        
        
        return(
            <Rectangle
            fillColor={this.props.targetColor}
            fillOpacity={this.props.fillOpacity}
            bounds={this.props.targetBounds}
            strokeColor={this.props.targetColor}
            strokeOpacity={this.props.strokeOpacity}
            strokeWeight={2}
          />        )
    }
}
export default Mask;

