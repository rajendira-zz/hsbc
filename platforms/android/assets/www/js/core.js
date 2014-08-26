function initFunction(){
	window.setTimeout(function() {
		var e = document.createEvent('Events'); 
		e.initEvent("0000000000000000000000000000000000deviceready",true,false);
		document.dispatchEvent(e);
	}, 500);
}
var core = {
    // Application Constructor
    initialize: function() {
        alert('initing');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        core.receivedEvent('deviceready');
        alert('device is ready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

	    //alert("device ready received");
//		var div = document.createElement('div');
//
//		div.className = 'angularApp';
//
//		div.innerHTML = '<div data-ng-controller = "AppCtrl">\
//			<ion-content><h1> some content </h1><div class="gridStyle" ng-grid="gridOptions"></div></ion-content></div>';
//
//		document.getElementById('angularContent').appendChild(div);


        angular.bootstrap(document, ['App']);

        console.log('Received Event: ' + id);
		alert("bootstraped");
    }
};



