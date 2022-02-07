
 export default function buildEncoder(configData, callback) {
    const phidgetEncoder = configData.encoder;
    buildPhidgetConnection(phidgetEncoder, configData, callback);
    //setTimeout(clockedPositionChangeNotifier, configData.moveTime);
    return phidgetEncoder;
} 

/*
function  processPositionChange(newPosition) {
        console.log("processPositionChange", newPosition, this.state.currentPosition);
        this.setState(prevState => ({
            currentPosition:  newPosition
        }));      
    }

function clockedPositionChangeNotifier() {
        const updateSlider = this.props.positionCallback;
        if (this.state.lastPosition !== this.state.currentPosition)  {
            console.log("updateLastPositon", this.state.currentPosition, this.state.lastPosition);
            this.setState(prevState => ({
                lastPosition:  this.state.currentPosition
            }));
            updateSlider(this.state.currentPosition);
        }
        setTimeout(this.clockedPositionChangeNotifier, this.props.configData.moveTime);
    }
*/
function buildPhidgetConnection(encoder0, configData, callback) {
        console.log("building encoder", encoder0);
       
        console.log("defining encoder0.onDetach", encoder0);
   
        encoder0.onDetach = function(ch, description) {
            console.log(encoder0, ' detached', ch, description);
        };
        console.log("defining encoder0.onError", encoder0);
        encoder0.onError = function(ch, description) {
            console.log(encoder0, ' error', ch, description);
        };
        console.log("opening Encoder device", encoder0);
        encoder0.open(1000)
        .then (function (openEncoder){
            console.log('encoder is open', openEncoder);
            //theComponent.processPositionChange(openEncoder.getPosition())
        })
        .catch(function (err) {
            console.log('failed to open the encoder:', err);
            console.log('trying again with default time')
            encoder0.open();
        });  
    }
    


