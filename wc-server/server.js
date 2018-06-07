var express = require("express")
var app = express()
var restRouter = require("./routes/rest");
var mongoose = require("mongoose");

mongoose.connect("mongodb://zksun95:123qwe@ds251210.mlab.com:51210/wecode")

app.use("/api/v1", restRouter);

app.listen(3000, function(){
    console.log('listen to 3000')
})