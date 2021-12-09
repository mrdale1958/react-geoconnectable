import React from 'react';
import ReactDOM from 'react-dom';
import TiltyDisplay from './TiltyDisplay';
import reportWebVitals from './reportWebVitals';
import registerServiceWorker from './registerServiceWorker';


let config = {
	
	//screenWidth : 3840,
	screenWidth : 1920,


	maxZoom : 19,
	minZoom : 3,
	currentZoom : 0,
	currentScale : 1.0,
	mapData : [],
	clicksPerRev :  256, // weirdly not 3.14159 * 4 *
	currentSpinPosition : 0,
	phidgetPort: 8089,
	phidgetHost: "localhost",
	homeCoordinates : { latitude: 41.771312, longitude: -113.212749 },
	floatZoom : 14.0,
	lastZoom : -1,
};
config.revsPerFullZoom = (config.maxZoom - config.minZoom)/8;
config.clicksPerZoomLevel =  config.clicksPerRev / config.revsPerFullZoom;
config.maxClicks = config.clicksPerRev * config.revsPerFullZoom * 1.0;

let fauxPhidgetConfig = {
	running : false,
	slideIncrement : 20,
	direction : 1,
	moveTime : 100 // milliseconds
}
config.fauxPhidgetConfig = fauxPhidgetConfig;
fetch('overlays.json',{
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	}
})
.then((response) => {
	//response => response.clone.text();
	//console.log(response);
	return response.json();
})
.then((myJson) => {
	//console.log("raw timeline: " + mydata);
	//setData(myJson);
	//console.log("timelineData: " + timelineData);
	runExhibit(myJson);

})
.catch((error) => {
	console.log("Didn't read json:", error);
	runExhibit(0);
});

 
function runExhibit(overlayData) {
  ReactDOM.render(
    <React.StrictMode>
      <TiltyDisplay db={overlayData} configData={config} />
    </React.StrictMode>,
    document.getElementById('tilty-table-block')
  );
  registerServiceWorker();

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}
