console.log("hiiiii--");
// Server @ & port
server_adr = 'localhost'
server_port = '9000'

// the server url
ws = new WebSocket('wss://'+server_adr+":"+server_port);


var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
console.log(datetime);
document.getElementById("udsstitle").innerText = "hhh";



