import React from 'react';
// import CenturyMarker from './CenturyMarker.js';
//import GuideGrid from './GuideGrid.js';
import Year from './Year.js';

class Overlay extends React.Component {
    constructor() {
      super();
      this.state = {color: "red"};
    }
    sortEventsByYear(database) {
      let sortedByYear = database.sort((a,b) => (a.EXTENDED_YEAR > b.EXTENDED_YEAR) ? 1 : -1);
	    let uniqueExtendedYears = new Set();
	    for (var event of sortedByYear) {
		    uniqueExtendedYears.add(event.EXTENDED_YEAR);
      }
      
      let yearCount = uniqueExtendedYears.size;
      return([sortedByYear, yearCount]);
    }
   
    buildDivs(database, position) {
     
    }

    render() {
      //let [sortedData] = this.sortEventsByYear(this.props.db)   
// need to use yearCount for distribution? something else
      let sortedData = 0;
      let divs = this.buildDivs(sortedData, this.props.sliderPosition);
     
        return (
            <div id='GenericOverlay'>
            {divs}
            {/* <GuideGrid configData={this.props.configData} /> */}
            </div>
        );
  }
}

export default Overlay;
