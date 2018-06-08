var files =[
    {id:1,name:"fisrt file",owner:"first user",description:"the first test file?",auth:"public"},
    {id:2,name:"second file",owner:"2nd user",description:"the second test file?",auth:"public"},
    {id:3,name:"third file",owner:"3rd user",description:"the third test file?",auth:"public"}
  ];

var FileModel = require("../data/fileModel");

var getFiles = function(){
    console.log("try get all");
    return new Promise((resolve, reject) => {
        FileModel.find({}, function(err, files){
            if(err){
                reject(err);
            }else{
                resolve(files);
            }
        });
    });
}

var getFile = function(id){
    return new Promise((resolve, reject) => {
        FileModel.findOne({id: id}, function(err, file){
            if(err){
                reject(err);
            }else{
                resolve(file);
            }
        });
    });
}

var createFile = function(newFile){
    return new Promise((resolve, reject) => {
        FileModel.findOne({name: newFile.name}, function(err, file){
            if(file){
                reject("Name already used.");
            }else{
                FileModel.count({}, function(err, num){
                    newFile.id=num+1;
                    var temp = new FileModel(newFile);
                    temp.save();
                    resolve(newFile);
                })
            }
        })
    });
}

module.exports = {
    getFiles: getFiles,
    getFile: getFile,
    createFile: createFile
}