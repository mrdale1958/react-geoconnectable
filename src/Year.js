import React from 'react';
import Category from './Category.js';

class Year extends React.Component {
    
    
    buildDivs(database, position, mode) {
        const eventsByCategory = {};
        for (var event in  database) {
            let eventData = database[event];
            if (eventsByCategory[eventData.CATEGORY]) {
                eventsByCategory[eventData.CATEGORY].push(eventData);
            } else {
                eventsByCategory[eventData.CATEGORY] = [ eventData];
            }
        }
        const yearDiv = Object.keys(eventsByCategory).map((category) =>
            
            <Category  key = {category} 
                        id = {category} 
                        eventDisplayMode = {mode}
                        categoryEvents = { eventsByCategory[category] } 
                        configData = {this.props.configData}/>);
        
        return( yearDiv );
    }
    integral (x1,x2,m,b) {
        return(((m/2)*x2*x2 + b*x2)-((m/2)*x1*x1 + b*x1))
    }
    distortScreenPosition(linearScreenPosition) {
        let retval;
        
        let midpoint = this.props.configData.screenWidth/2;
        if (linearScreenPosition <= midpoint) {
            retval = this.integral(0,linearScreenPosition, this.props.configData.leftSideSlope, this.props.configData.leftSideIntercept);

        } else {
            retval = midpoint + this.integral(midpoint,linearScreenPosition, this.props.configData.rightSideSlope, this.props.configData.rightSideIntercept);
                            
        }
        return(retval);
        


    }

    render() {
        let mode = "none";
        let divs = <div>&nbsp;</div>
        let currentScreenPosition = this.props.position - this.props.sliderPosition + this.props.configData.screenWidth/2;
        if ( currentScreenPosition >= this.props.configData.leftEdge) {
            if (currentScreenPosition > this.props.configData.yearTrigger) {
                //if (currentScreenPosition > this.props.configData.labelTrigger) {
                    if (currentScreenPosition > this.props.configData.contentTrigger) {
                        if (currentScreenPosition > this.props.configData.rightEdge - this.props.configData.contentTrigger) {
                            //if (currentScreenPosition > this.props.configData.rightEdge - this.props.configData.labelTrigger) {
                                if (currentScreenPosition > this.props.configData.rightEdge - this.props.configData.yearTrigger) {
                                    if (currentScreenPosition < this.props.configData.rightEdge ) {
                                        mode = "dot";
                                    }									
                                } else {
                                    mode = "date";
                                }
                            //} else {
                            //    mode = "none";
                            //}
                        } else {
                            mode = "full";
                        }
                    //} else {
                    //    mode = "none";
                    //}				
                } else {
                    mode = "date";
                }
            } else {
                mode = "dot";
            } 
        } 
            
        
        if ( mode !== "none" ) {
            divs = this.buildDivs(this.props.yearsEvents, this.props.sliderPosition, mode)
        }
        let z_index = 0;
        if ( mode === "full" ) z_index = 1;

        let distortedScreenPosition = this.distortScreenPosition(currentScreenPosition);
        return (
          <div className = 'year' 
                id = {this.props.id} 
                style={{left: distortedScreenPosition,
                    zIndex: z_index}}>
          {divs}
          </div>
        );
    }  
}

export default Year;
