Parse.initialize("NEYolN8G2CaKtAPYcaeYX0nrSrP5tbhQ1bcwB16a", "N2kyDwAWWPx8Jg1azm8ifeJ6fYzF6DHpfmhVWQJc");
var AccelObject = Parse.Object.extend("AccelObject"),
	on,
	count = 0,
	x,y,z, newY,
	timestamp,
	watchID = null,
	$data;

function isOn() {
	if (on) { return "ON"; }
	else { return "OFF"; }
}
// writes to data page for testing purposes
function writeData() {
	var output = "";
	output += '<p>Count: '+count+'</p>';
	$data.html(output);
}
function onSuccess(acceleration) {
	newY = acceleration.y;
	if ((newY - y) > 2) { count++; }
	y = newY;
//	writeData();
}
function onError() {
    alert('onError!');
}
function writeStatus() {
	var output="",
		state = "";
		if (on) { state = '<span style="font-weight:bold; color:red;">' + isOn() + '</span>'; }
		else { state = isOn(); }
	
	output += '<p>Accelerometer is currently ' + state +'.</p>';
	$("#status").html(output);
}
function currentAccel(a) {
	y = a.y;
}
function startWatch() {
	navigator.accelerometer.getCurrentAcceleration(currentAccel, onError);
    // Update acceleration every 1 seconds
    var options = { frequency: 1000 };
    watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
}
function stopWatch() {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
    }
}

function onDeviceReady() {
	var data = new AccelObject();
	$data = $('#myData');
	
	on = false;
	$(document).ready(function() {
		writeStatus();
	});
	//data.save( { test:"data1", test2:"data2" } );
	
	$("#startButton").click( function()
        {
			on = true;
			writeStatus();
			$data.html();
		    startWatch();
        });
	$("#stopButton").click( function()
        {
			on = false;
			writeStatus();
			stopWatch();
			
        });
	$("#newButton").click( function()
	        {
				on = false;
				writeStatus();
				$("#status").append("NEW data set created");
	        });
}


function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}