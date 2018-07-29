// Init image json oject
var allImagesJson  = {}
var imagesToSend = {}

// store images in an array
detectedImages = getAllImages();

// Server @ & port
server_adr = 'localhost'
server_port = '9001'

// the server url
//ws = new WebSocket('wss://'+server_adr+":"+server_port);
var ws = new WebSocket('wss://localhost:9001/');

var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

console.log(datetime);

// open event
ws.onopen = function() {
    console.log("WebSocket Connection Opened");
    // Serialize javascript object to json
    jsonImages = JSON.stringify(detectedImages)
    ws.send(jsonImages);
};

// recieved message event
ws.onmessage = function(msg) {
     console.log(msg.data);
}

//getImageToSend(detectedImages, allImagesJson);

/**
// To start the loop
var mainLoopId = setInterval(function(){
    detectedImages = getAllImages();
    //getImageToSend(detectedImages, allImagesJson);
    
    console.log("hii");
}, 5000);
**/

// Function to filter images to send to the udss server
function getImageToSend(arr1, arr2) {
   
    for (var i = 0, len1 = arr1.length; i < len1; i++) {
       
        if(arr2.length>0){
            
            for (var j = 0, len2 = arr2.length; j < len2; j++) {

                // ignore redendante images
                if (arr1[i].url != arr2[j].url) {
                    imagesToSend.push(arr1[i]);
                    allImagesJson.push(arr1[i]);
                }
            }

        }else{
            imagesToSend.push(arr1[i]);
            allImagesJson.push(arr1[i]);

        }
        
    }
}

// Filter image based on their height and width
function filterImageBySize(height, width) {
    _minHeight = 180;
    _minWidth  = 180;
    if(height>_minHeight && width > _minWidth)
        return true;
    else
        return false;
}

// Get all images in the current web page
function getAllImages() {
    var imagesInfo = []
    try {
        // Get all images in the web page
    	var images = document.getElementsByTagName('img'); 
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
                if(filterImageBySize(height, width) == true){
                    currentImage['id'] = "udss_image"+image_id;
                    currentImage['height'] = height;
                    currentImage['width'] = width;
                    currentImage['url'] = url;
                    imagesInfo.push(currentImage); 
                    // color the selected image
                    
                    images[i].id = currentImage['id'];
                    images[i].style.border = "5px solid orangered";
                    images[i].title = "Checking this image in progress";
                    //images[i].onmouseover = function(){console.log("just hove")};
                    
                    ++image_id;
                }
    		}
    	}
   } catch(err) {
        //console.log(err.message);
    }

    return imagesInfo;
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