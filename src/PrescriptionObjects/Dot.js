import React from 'react';

class Dot extends React.Component {
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
        <div className= {"event-dot " + this.categoryToClassname(this.props.eventData['CATEGORY'])}>
        &nbsp;
        </div>
    );
  }
}

export default Dot;
