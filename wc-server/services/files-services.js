var files =[
    {id:1,name:"fisrt file",owner:"first user",description:"the first test file?",auth:"public"},
    {id:2,name:"second file",owner:"2nd user",description:"the second test file?",auth:"public"},
    {id:3,name:"third file",owner:"3rd user",description:"the third test file?",auth:"public"}
  ];

var getFiles = function(){
    return new Promise((resolve, reject) => {
        resolve(files);
    });
}

var getFile = function(id){
    return new Promise((resolve, reject) => {
        resolve(files.find(file => file.id===id));
    });
}

var createFile = function(newFile){
    return new Promise((resolve, reject) => {
        if(files.find(file => file.name === newFile.name)){
            reject("name in use");
        }else{
            newFile.id = files.length+1;
            files.push(newFile);
            resolve(newFile);
        }
    });
}

module.exports = {
    getFiles: getFiles,
    getFile: getFile,
    createFile: createFile
}