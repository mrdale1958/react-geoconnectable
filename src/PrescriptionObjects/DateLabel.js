import React from 'react';

class DateLabel extends React.Component {
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
    return (
      <div className={"event-date " + this.categoryToClassname(this.props.eventData['CATEGORY'])}>
        <div>
          <div className='event-year'>{this.props.eventData['YEAR']}</div>
          <div className='event-location'>{this.props.eventData['COUNTRY']}</div>
        </div>
      </div>         );
  }
}

export default DateLabel;
