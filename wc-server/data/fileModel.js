var mongoose = require("mongoose");
var fileSchema = mongoose.Schema({
    id: Number,
    name: String,
    description: String,
    owner: String,
    auth: String
});

var fileModel = mongoose.model("FileModel", fileSchema);

module.exports = fileModel;