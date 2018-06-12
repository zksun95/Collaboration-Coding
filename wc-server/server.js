var express = require("express")
var app = express()
var restRouter = require("./routes/rest");
var pageRouter = require("./routes/page");
var mongoose = require("mongoose");
var path = require("path");
var http = require("http");

var socket_io = require("socket.io");
var io = socket_io();
var editor_socket = require("./services/socket-service.js")(io);

mongoose.connect("mongodb://zksun95:123qwe@ds251210.mlab.com:51210/wecode")

app.use('/', pageRouter);
app.use(express.static(path.join(__dirname, "../compiled")));
app.use("/api/v1", restRouter);

app.use(function(req, res){
    res.sendFile("index.html", {root: path.join(__dirname, '../compiled/')});
});

// app.listen(3000, function(){
//     console.log('listen to 3000')
// })

var server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('error', onError);
server.on('listening', onListening);

function onError(error){
    throw error;
}

function onListening(){
    var addr = server.address();
    var bind = typeof addr == 'string'
               ? 'pipe ' + addr
               : 'port ' + addr.port;
    console.log("Listening on " + bind)
}