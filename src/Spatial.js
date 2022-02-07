

export default function buildSpatial(spatial0, tiltCallback, configData) {
    //var spatial0 = this.state.spatial;
    const updateTilt = tiltCallback;
    spatial0.onAccelerationChange = 
      function (acceleration, timestamp) {
        //console.log('Acceleration: \t' + acceleration[0]+ '  |  ' + acceleration[1]+ '  |  ' + acceleration[2]);
        //console.log('Timestamp: ' + timestamp.toString())
        //console.log('----------');
        ingestSpatialData(configData, acceleration); 
        updateTilt(getTilt(configData));
      };
    spatial0.open((openSpatial) => {
      console.log("spatial device connected");
      ingestSpatialData(configData,openSpatial.getAcceleration()); 
      updateTilt(getTilt(configData));
    })
    .catch(function (err) {
        console.log('failed to open the spatial channel:' + err);
    }); 
  }
function setZeros(configData,x0,y0,z0){
    configData.spatialStatus.zeros = [ x0, y0, z0 ]
}

//vectorArray: [],
//                        runningSum: { magnitude: 0.0, direction: 0.0},

function ingestSpatialData(configData, Acceleration) {
        if (configData.spatialStatus.vectorArray.length === 0) {
            setZeros(configData, Acceleration[0], Acceleration[1], Acceleration[2]);
        }
        let newX = configData.sensorData.flipX * (Acceleration[0] - configData.sensorData.zeros[0]);
        let newY = configData.sensorData.flipY * (Acceleration[1] - configData.sensorData.zeros[1]);
        //newZ = sensorData.Acceleration[2] - configData.sensorData.zeros[2];
        let currentMagnitude = Math.sqrt(newX*newX + newY*newY);
        let currentDirection = Math.atan(newY/newX);
        configData.spatialStatus.vectorArray.unshift({magnitude: currentMagnitude, direction: currentDirection});
        configData.spatialStatus.runningSum.magnitude += currentMagnitude;
        configData.spatialStatus.runningSum.direction += currentDirection;
        if (configData.sensorData.vectorArray.length === configData.sensorData.bufferLength) {
            let lostData = configData.spatialStatus.vectorArray.pop();
            configData.spatialStatus.runningSum.magnitude -= lostData.magnitude;
            configData.spatialStatus.runningSum.direction -= lostData.direction;
        }
         
    }

    function getTilt(configData) {
        let retval = false;
        if (configData.sensorData.vectorArray.length > 0) {
            let newTilt = { magnitude: configData.spatialStatus.runningSum.magnitude / configData.sensorData.vectorArray.length ,
                direction: configData.spatialStatus.runningSum.direction / configData.sensorData.vectorArray.length};
            if (Math.abs(newTilt.magnitude) > configData.spatialStatus.tiltThreshold) {
                configData.spatialStatus.currentTilt = newTilt;
                retval = true;
            }
            else {
                configData.spatialStatus.currentTilt = { magnitude: 0, direction: 0 };
            }
            
            return retval;
        }
        return retval;
}
