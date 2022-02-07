import React  from 'react';
import { Hook, Console, Decode } from 'console-feed'

class Accelerometer extends React.Component {
    constructor(props) {
        super(props);
        const phidgetAccelerometer = new this.props.phidget22.Accelerometer();
        this.state = {
            logs: [],
            accelerometer: phidgetAccelerometer,
            currentAttitude: [0,0],
            lastattitude: [0,0]
        }
        this.buildPhidgetConnection = this.buildPhidgetConnection.bind(this);

        this.processAttitudeChange = this.processAttitudeChange.bind(this);
        //this.clockedPositionChangeNotifier = this.clockedPositionChangeNotifier.bind(this);
    }

    componentDidMount() {
       // Hook(window.console, log => {
       //     this.setState(({ logs }) => ({ logs: [...logs, Decode(log)] }))
       //   })
          this.buildPhidgetConnection();

          setTimeout(this.clockedPositionChangeNotifier, this.props.configData.moveTime);
        }

    processAttitudeChange(newAttitude) {
        console.log("processing attitude change", newAttitude, this.state.currentaAttitude);
        this.setState(prevState => ({
            currentAttitude:     newAttitude 

        }));      
    }
    buildPhidgetConnection() {
        const theComponent = this;
        console.log("building phidgets accelerometer connection");
        // connectToAccelerometer() {
        var accelerometer0 = this.state.accelerometer;
        console.log("building accelerometer", accelerometer0);
        accelerometer0.onAccelerationChange = function onAccelerometer0_Error(acceleration, timestamp) {
            //console.log('Acceleration: \t' + acceleration[0]+ '  |  ' + acceleration[1]+ '  |  ' + acceleration[2]);
            //console.log('Timestamp: ' + timestamp.toString())
            //console.log('----------');
            theComponent.processAttitudeChange(acceleration)
        };
    
        accelerometer0.onAttach = function onAccelerometer0_Error() {
            console.log('accelerometer0.onAttach Attach!')
        };
    
        accelerometer0.onDetach = function onAccelerometer0_Error() {
            console.log('accelerometer0.onDetach Detach!')
        };
    
        accelerometer0.onError = function onAccelerometer0_Error(code, description) {
            console.log('accelerometer0.onError Description: ' + description.toString())
            console.log('----------');
        };
        
        
        accelerometer0.open((openAccelerometer) => 
            {
                console.log('accelerometer0 is open', openAccelerometer);
                this.processAttitudeChange(openAccelerometer.getPosition())
            })
        .catch(function (err){
            console.error('Error during open:', err);
            process.exit(1);
        })

        if (! accelerometer0.isopen) {
            //console.log("accelerometer not open?");
        }
    }
    render() {
        return(
            <div id="accelerometer"> 

                <div id="accelerometer-block"  style={{ backgroundColor: '#540000' }}>
                    Accelerometer says {this.state.currentAttitude} 
                </div>
            </div>
        )
    }
}

export default Accelerometer;