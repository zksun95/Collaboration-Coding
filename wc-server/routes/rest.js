var express = require("express");
var router = express.Router();

var fileServices = require("../services/files-services");

var bp = require("body-parser");
var jp = bp.json();

var Client = require('node-rest-client').Client;
var rest_client = new Client();

EXECUTOR_URL = "http://localhost:1023/build_and_run";
rest_client.registerMethod("build_and_run", EXECUTOR_URL, "POST");

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

//build_run
router.post("/build_run", jp, function(req, res){
    // fileServices.createFile(req.body).then(function(file){
    //     res.json(file);
    // },function(error){
    //     res.status(400).send("File name already in use.");
    // });
    let code = req.body.code;
    let language = req.body.language;
    console.log(code);
    console.log(language);

    rest_client.method.build_and_run(
        {
            "data": {"code":  code, "language": language},
            "headers": {"Content-Type": "application/json"}
        }, (data, res) => {
            console.log(res);
            const text = `Build result: ${data["build"]}
            Run result: ${data["run"]}`;
            data["text"] = text;
            res.json(data);
        }
    )

    res.json({
        "somecode":  code,
        "what": language
    });
});

module.exports = router;