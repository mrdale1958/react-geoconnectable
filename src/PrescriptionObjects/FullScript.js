import React from 'react';

class FullScript extends React.Component {
    constructor() {
      super();
      this.state = {color: "red", timePosition: 0};
    }
    categoryToClassname(category) {
      let retVal = category.replace(/[ /]/g, "_").toLowerCase();
      //console.log(category,retVal);
      return retVal;
    }      
    render() {
      let eventBody;
      if (this.props.eventData['SIGNIFICANCE'] !== "") {
        eventBody = <div className='event-body' 
            dangerouslySetInnerHTML={{ __html: this.props.eventData['SIGNIFICANCE']}} />
      }
      return (
          <div className={this.props.className + " " + this.categoryToClassname(this.props.eventData['CATEGORY'])}>
            <div className="event-block-header">
              <span className='event-year'>{this.props.eventData['YEAR']}</span>
              <span className='event-location'>{this.props.eventData['COUNTRY']}</span>
            </div>
            <div className='event-heading' 
              dangerouslySetInnerHTML={{ __html: this.props.eventData['EVENT']}}>
            </div>
            {eventBody}
          </div>
      );
  }
}

export default FullScript;
