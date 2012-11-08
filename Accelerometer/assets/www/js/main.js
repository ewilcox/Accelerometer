function onDeviceReady() {
	alert("device ready!");
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}