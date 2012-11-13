Parse.initialize("NEYolN8G2CaKtAPYcaeYX0nrSrP5tbhQ1bcwB16a", "N2kyDwAWWPx8Jg1azm8ifeJ6fYzF6DHpfmhVWQJc");
var AccelObject = Parse.Object.extend("AccelObject"),
	query = new Parse.Query(AccelObject),
	on, i,
	count = 0,
	x,y,z, newY,
	timestamp,
	watchID = null,
	$data,
	data,
	$items;

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
		if (on) { state = '<span style="font-weight:bold; font-size:20px; color:red;">' + isOn() + '</span>'; }
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
	if (data===undefined) { data = new AccelObject(); }
	$data = $('#myData');
	if (on === null) { on = false; }
	$(document).ready(function() {
		writeStatus();
	});
	$("#startButton").click( function() {
		on = true;
		writeStatus();
		$data.html();
	    startWatch();
    });
	$("#stopButton").click( function() {
		on = false;
		writeStatus();
		stopWatch();
		data.save({ count:count });
    });
	$("#newButton").click( function() {
		count = 0;
		data = new AccelObject();
		on = false;
		stopWatch();
		writeStatus();
		$("#status").append("NEW data set created");
    });
	$("#testButton").click( function() {
		alert("Count: " + count + " - " + data);
    });
	$("#getDataButton").click( function() {
		document.location.href='#page2';
		var output = "";
		$items = $('items');
		query.find({
			  success: function(results) {
				  for (i=0; i<results.length; i++) {
					  //output += results[i].get("createdAt");
					  alert(results[i].get("count"));
				  }
				  //alert("Successfully retrieved " + results.length + " records.");
			  },
			  error: function(error) {
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
	});
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}