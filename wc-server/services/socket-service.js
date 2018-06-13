//var rclient = require('../tools/redis-ops');
const TIMEOUT = 3600;

module.exports = function(io) {
    var collaborations = [];
    var socketId_sessionId = [];

    io.on("connection", (socket)=>{
        let sessionId = socket.handshake.query['sessionId'];  
        console.log(sessionId+" with "+socket.id);

        socketId_sessionId[socket.id] = sessionId;
        if(!(sessionId in collaborations)){
            collaborations[sessionId] = {
                'participants': []
            }
        }
        collaborations[sessionId]['participants'].push(socket.id);
        console.log(collaborations[sessionId]['participants']);

        function emitInfo(socketId, eventName, info){
            let emitSessionId = socketId_sessionId[socketId];
            if(emitSessionId in collaborations){
                let participants = collaborations[emitSessionId]['participants'];
                for(let i in participants){
                    console.log("emit to: " + participants[i]);
                    if(socketId != participants[i]){
                        io.to(participants[i]).emit(eventName, info);
                    }
                }
            }else{
                console.log("WARNING: cannot find session id ("+emitSessionId+")")
            }
        }

        //emitInfo();

        socket.on("change", (change)=>{
            console.log("change from "+socketId_sessionId[socket.id]+": "+change);
            emitInfo(socket.id, "change", change);
            // let emitSessionId = socketId_sessionId[socket.id];
            // if(emitSessionId in collaborations){
            //     let participants = collaborations[emitSessionId]['participants'];
            //     for(let i in participants){
            //         console.log("emit to: " + participants[i]);
            //         if(socket.id != participants[i]){
            //             io.to(participants[i]).emit("change", change);
            //         }
            //     }
            // }else{
            //     console.log("WARNING: cannot find session id ("+emitSessionId+")")
            // }
        });

        socket.on("changeCursor", (cursor)=>{
            console.log("cursor from "+socketId_sessionId[socket.id]+": "+cursor);
            cursor = JSON.parse(cursor);
            cursor["cursorId"] = socket.id;
            emitInfo(socket.id, "changeCursor", JSON.stringify(cursor));
            // let emitSessionId = socketId_sessionId[socket.id];
            // if(emitSessionId in collaborations){
            //     let participants = collaborations[emitSessionId]['participants'];
            //     for(let i in participants){
            //         console.log("emit to: " + participants[i]);
            //         if(socket.id != participants[i]){
            //             io.to(participants[i]).emit("changeCursor", JSON.stringify(cursor));
            //         }
            //     }
            // }else{
            //     console.log("WARNING: cannot find session id ("+emitSessionId+")")
            // }
        });

        socket.on("disconnect", function(){
            var index = collaborations[sessionId]['participants'].indexOf(socket.id);
            if (index > -1) {
                collaborations[sessionId]['participants'].splice(index, 1);
            }
            //socket.off();
            //socket.disconnect();
            emitInfo(socket.id, "deleteCursor", socket.id);
            console.log("disconnected: " + socket.id);
            //collaborations[sessionId]['participants'].push(socket.id);
        });

        // setInterval(function(){
        //     console.log("users sent: "+socket.id);
        //     socket.emit('currentUsers', collaborations[sessionId]['participants']); 
        // }, 20000);
    });
}