import React from 'react';
import Prescription from './PrescriptionObjects/Prescription.js';


class Category extends React.Component {
    categoryToClassname(category) {
        let retVal = category.replace(/[ /]/g, "_").toLowerCase();
        //console.log(category,retVal);
        return retVal;
    }
       
    buildDivs(database, position) {
        const categoryDiv = database.map((event,index) =>
        <Prescription key = {this.props.id + index}
                    position = {Number(event.TickPosInInches) * this.props.configData.clickDensity} 
                    eventData = { event }
                    mode = {this.props.eventDisplayMode}
                    configData={this.props.configData}/>
        );
        
        return( categoryDiv );
    }
    
    render() {
        let sortedData = this.props.categoryEvents;
        let divs = this.buildDivs(sortedData, this.props.sliderPosition)
        return (
              <div className={'category-block ' + this.categoryToClassname(this.props.id) + '_top'} id = {this.props.id}>
              {divs}
              </div>
          );
    }
}

export default Category;
