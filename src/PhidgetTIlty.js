import React from 'react';



class PhidgetTilty extends React.Component {
    constructor() {
        let phidget22 = window.phidget22;
        super();
        const phidgetObject = new phidget22.Connection(this.props.configData.phidgetPort, this.props.configData.phidgetHost);
        
        const phidgetEncoder = new phidget22.Encoder();
        const phidgetAccelerometer = new phidget22.Accelerometer();
        this.state = {color: "red", 
                conn: phidgetObject, 
                encoder: phidgetEncoder, 
                currentPosition: 0,
                accelerometer: phidgetAccelerometer};
        this.buildPhidgetConnection = this.buildPhidgetConnection.bind(this);
        this.processPositionChange = this.processPositionChange.bind(this);
        this.clockedPositionChangeNotifier = this.clockedPositionChangeNotifier.bind(this);
    }

    componentDidMount() {
        console.log(this.state, this.state.conn, this.state.encoder);
        this.state.conn.connect().then(this.buildPhidgetConnection)
		.catch(error=>console.log(error));;
        setTimeout(this.clockedPositionChangeNotifier, this.props.configData.moveTime);
    }

    processPositionChange(newPosition) {
        this.setState(prevState => ({
            currentPosition:  newPosition
        }));      
    }

    clockedPositionChangeNotifier() {
        const updateSlider = this.props.positionCallback;
        if (this.state.lastPosition !== this.state.currentPosition)  {
            this.setState(prevState => ({
                lastPosition:  this.state.currentPosition
            }));
            updateSlider(this.state.currentPosition);
        }
        setTimeout(this.clockedPositionChangeNotifier, this.props.configData.moveTime);
    }

    processAttitudeChange(newAccelerationVector) {
        this.setState(prevState => ({
            currentAttitude:  newAccelerationVector
        })); 
    }

    
    

    buildPhidgetConnection() {
        const theComponent = this;

        // connectToAccelerometer() {
        var accelerometer0 = this.state.accelerometer;

        accelerometer0.onAccelerationChange = function onAccelerometer0_Error(acceleration, timestamp) {
            console.log('Acceleration: \t' + acceleration[0]+ '  |  ' + acceleration[1]+ '  |  ' + acceleration[2]);
            console.log('Timestamp: ' + timestamp.toString())
            console.log('----------');
        };
    
        accelerometer0.onAttach = function onAccelerometer0_Error() {
            console.log('Attach!')
        };
    
        accelerometer0.onDetach = function onAccelerometer0_Error() {
            console.log('Detach!')
        };
    
        accelerometer0.onError = function onAccelerometer0_Error(code, description) {
            console.log('Description: ' + description.toString())
            console.log('----------');
        };
        
        accelerometer0.open((openEncoder) => {this.processPositionChange(openEncoder.getPosition())})
        .catch(function (err) {
            console.log('failed to open the channel:' + err);
        });    
        
        accelerometer0.open((openAccelerometer) => 
            {this.processAttitudeChange(openAccelerometer.getPosition())})
        
        .catch(function (err){
            console.error('Error during open:', err);
            process.exit(1);
        })
            
        //connectToEncoder();
        var encoder0 = this.state.encoder;
        const maxClicks = this.props.configData.availableClicks;
        encoder0.onPositionChange = function onEncoder0_PositionChange(positionChange, timeChange, indexTriggered) {
            let newX = encoder0.getPosition();
            ////console.log('PositionChange: ', positionChange.toString(),newX);
            if (newX < 0) {
                //console.log('0000000000000',newX);
                encoder0.setPosition(0);
                newX=0;
            } else if (newX>maxClicks) {
                //console.log('===============',newX);
                encoder0.setPosition(maxClicks);
                newX=maxClicks;
            }
            //console.log('++++++++++',newX);
            //console.log('----------',newX);
            theComponent.processPositionChange(newX);
        };
    
        encoder0.onDetach = function(ch) {
            console.log(encoder0 + ' detached');
        };
        encoder0.onError = function(ch) {
            console.log(encoder0 + ' error');
        };
        encoder0.open((openEncoder) => {this.processPositionChange(openEncoder.getPosition())})
        .catch(function (err) {
            console.log('failed to open the channel:' + err);
        });  
    }
        
    render() {
        return (
            <div className="tilty" >
                <div id={this.props.id}> &nbsp; </div>
            </div>

        );
  }
}

export default PhidgetTilty;
