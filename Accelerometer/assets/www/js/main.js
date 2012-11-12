Parse.initialize("NEYolN8G2CaKtAPYcaeYX0nrSrP5tbhQ1bcwB16a", "N2kyDwAWWPx8Jg1azm8ifeJ6fYzF6DHpfmhVWQJc");
var AccelObject = Parse.Object.extend("AccelObject");

function onSuccess(acceleration) {
    alert('Acceleration X: ' + acceleration.x + '\n' +
          'Acceleration Y: ' + acceleration.y + '\n' +
          'Acceleration Z: ' + acceleration.z + '\n' +
          'Timestamp: '      + acceleration.timestamp + '\n');
}

function onError() {
    alert('onError!');
}

//navigator.accelerometer.getCurrentAcceleration(onSuccess, onError);

function onDeviceReady() {
	var data = new AccelObject();
	//data.save( { test:"data1", test2:"data2" } );
	
	$("#startButton").click( function()
        {
			//alert("start button clicked");
        });
	$("#stopButton").click( function()
        {
			//alert("stop button clicked");
        });
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}