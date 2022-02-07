import React  from 'react';
import buildSpatial from './Spatial.js';

class PhidgetTilty extends React.Component {
  constructor() {
    super();
    this.buildPhidgetConnection = this.buildPhidgetConnection.bind(this);
    this.buildEncoder = this.buildEncoder.bind(this);
    //this.buildSpatial = this.buildSpatial.bind(this);
  
  }
  
  componentDidMount() {
    let phidget22 = window.phidget22;
    const phidgetObject = new phidget22.Connection(this.props.configData.phidgetPort, this.props.configData.phidgetHost);
    
    const phidgetEncoder = new phidget22.Encoder();
    const phidgetSpatial = new phidget22.Accelerometer();
    this.setState((state, props) => {
      return {
        color: "red", 
        conn: phidgetObject, 
        encoder: phidgetEncoder,
        spatial: phidgetSpatial,
        spatialStatus: {zeros: { x: 0.0, y:0.0, z: 0.0},
                        vectorArray: [],
                        runningSum: { magnitude: 0.0, direction: 0.0},
                      }
      }});
    }
  componentDidUpdate() {
    //console.log(this.state, this.state.conn, this.state.encoder, this.state.spatial);
    this.state.conn.connect()
    .then(this.buildPhidgetConnection)
    .catch(error=>console.log(error));;
  }

  buildEncoder() {
    var encoder0 = this.state.encoder;
    const updateRotation  = this.props.rotationCallback;
    const maxClicks = this.props.configData.availableClicks;
    encoder0.onPositionChange = 
      function onEncoder0_PositionChange(positionChange, 
                                          timeChange, 
                                          indexTriggered) {
        let newX = encoder0.getPosition();
        console.log('PositionChange: ', positionChange.toString(),newX);
        if (newX < 0) {
            console.log('0000000000000',newX);
            encoder0.setPosition(0);
            newX=0;
        } else if (newX>maxClicks) {
            console.log('===============',newX);
            encoder0.setPosition();
            newX=maxClicks;
        }
        //console.log('++++++++++',newX);
        updateRotation(newX);    
    }
    encoder0.open((openEncoder) => {
      console.log("rotation device connected");
      updateRotation(openEncoder.getPosition())})
    .catch(function (err) {
        console.log('failed to open the encoder channel:' + err);
    }); 
  }

  /* buildSpatial() {
    var spatial0 = this.state.spatial;
    const updateZoom = this.props.tiltCallback;
    spatial0.onAccelerationChange = 
      function (acceleration, timestamp) {
        //console.log('Acceleration: \t' + acceleration[0]+ '  |  ' + acceleration[1]+ '  |  ' + acceleration[2]);
        //console.log('Timestamp: ' + timestamp.toString())
        //console.log('----------');
        var tableVector 
        updateZoom(acceleration);
      };
    spatial0.open((openSpatial) => {
      console.log("spatial device connected");
      updateZoom(openSpatial.getAcceleration())})
    .catch(function (err) {
        console.log('failed to open the spatial channel:' + err);
    }); 
  } */

  buildPhidgetConnection() {
    this.buildEncoder();
    buildSpatial(this.state.spatial, this.props.tiltCallback);
   //console.log('----------',newX);
        
  }

          

      
     
    
  render() {
      var rotation = 0;
      const encoder = ( this.state?.encoder || 0);
      if ((typeof encoder != 'undefined') && encoder.isattached ){
        rotation = encoder.getPosition();
      }
      var attitude = 0;
      const spatial = ( this.state?.spatial || 0);
      if ( (typeof spatial != 'undefined') && spatial.isattached ) {
        attitude = spatial.getAcceleration();
      }
      return (
          <div className="tilty" >
              <div id={this.props.id}> 
                  
                  <div id="spin-console-block"  style={{ backgroundColor: '#242424' }}>
                  rotation: { rotation }
                  </div>
                  <div id="tilt-console-block"  style={{ backgroundColor: '#424242' }}>
                  attitude: { attitude }
                  </div>
              </div>
          </div>

      );
      
  } 
}

export default PhidgetTilty;

/*
<Modal
                show={show}
                backdrop="static"
                keyboard={false}

              >
                <Modal.Header closeButton>
                  <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  I will not close if you click outside me. Don't even try to press
                  escape key.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleClose}>Understood</Button>
                </Modal.Footer>
              </Modal>
              */