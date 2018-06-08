var express = require("express")
var app = express()
var restRouter = require("./routes/rest");
var pageRouter = require("./routes/page");
var mongoose = require("mongoose");
var path = require("path");

mongoose.connect("mongodb://zksun95:123qwe@ds251210.mlab.com:51210/wecode")

app.use('/', pageRouter);
app.use(express.static(path.join(__dirname, "../compiled")));
app.use("/api/v1", restRouter);

app.use(function(req, res){
    res.sendFile("index.html", {root: path.join(__dirname, '../compiled/')});
});

app.listen(3000, function(){
    console.log('listen to 3000')
})