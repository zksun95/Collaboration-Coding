var express = require("express");
var router = express.Router();

var fileServices = require("../services/files-services");

var bp = require("body-parser");
var jp = bp.json();

router.get("/files", function(req, res){
    fileServices.getFiles().then(files => res.json(files));
});

router.get("/files/:id", function(req, res){
    var id = req.params.id;
    fileServices.getFile(+id).then(file => res.json(file));
});

router.post("/files", jp, function(req, res){
    fileServices.createFile(req.body).then(function(file){
        res.json(file);
    },function(error){
        res.status(400).send("File name already in use.");
    });
});

module.exports = router;