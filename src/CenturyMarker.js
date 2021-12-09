import React from 'react';

class CenturyMarker extends React.Component {
    
    render() {
        return (
            <div className='century' id= {this.props.id} style={{left: this.props.position}}>
            &nbsp;
            </div>
        );
  }
}

export default CenturyMarker;
