// Init the websocket!
var ws = null;

if ("WebSocket" in window) {

// Server @ & port
server_adr = '10.42.0.1'
server_port = '9000'
// the server url
server_url = "ws://"+server_adr+":"+server_port+"/echo";
// Open websocket
var ws = new WebSocket(server_url);

// ws events
ws.onopen = function() {
    // Web Socket is connected, send data using send()
    console.log("Connection to server is opened...");
};
                
ws.onmessage = function (evt) { 
    var received_msg = evt.data;
    console.log("Message is received...");
    console.log("MEssage: "+received_msg);
};
                
ws.onclose = function() { 
    // websocket is closed.
    console.log("Connection is closed..."); 
};

}else {
    // The browser doesn't support WebSocket
    console.log("WebSocket NOT supported by your Browser!");
}

// Get All images from the current web page
imagesJson = getAllImages();


//  Print images in console.
console.log(imagesJson);


 
// Filter image based on their height and width
function filter_image(height, width) {
    _minHeight = 200;
    _minWidth  = 400;
    if(height>_minHeight && width > _minWidth)
        return true;
    else
        return false;
}

// Get all images in the current web page
function getAllImages() {
    // Get all images in the web page
	var images = document.getElementsByTagName('img'); 
	var imagesInfo = {}
    var image_id = 0;
    // Loop all images in the web page
	for(var i = 0; i < images.length; i++) {
		var currentImage = {}
		var height = images[i].height;
		var width = images[i].width;
		var load_complete  = images[i].complete;
        var url = images[i].src;
		if(load_complete == true){
            // Check the size of the image
            if(filter_image(height, width) == true){
                ++image_id;
                currentImage['id'] = "udss_image"+image_id;
                currentImage['height'] = height;
                currentImage['width'] = width;
                currentImage['url'] = url;
                imagesInfo[i] = currentImage; 
                // color the selected image
                images[i].id = currentImage['id'];
                images[i].style.border = "5px solid orangered";
                images[i].title = "Checking this image in progress";
                //images[i].onmouseover = function(){console.log("just hove")};
            }
		}
	}

    return JSON.stringify(imagesInfo);
}


// Sync data
function getServers(auth_url, data) {
    var formData = new FormData();
    formData.append("info", data);
    console.log(auth_url);
    var xhr = new XMLHttpRequest();
    var eventSource = xhr.upload || xhr;
    eventSource.addEventListener("progress", function(e){
        var current = e.loaded || e.position ;
        var total = e.total || e.totalSize;
        var percant = parseInt((current/total)*100, 10);
        // DO whatever you want with progress
    });
    xhr.open("POST", auth_url, true);
    xhr.send(formData);
    xhr.onload = function() {
        if (this.status === 200)
            console.log(this)
    };
}
