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

        socket.on("change", (change)=>{
            console.log("change from "+socketId_sessionId[socket.id]+": "+change);
            let emitSessionId = socketId_sessionId[socket.id];
            if(emitSessionId in collaborations){
                let participants = collaborations[emitSessionId]['participants'];
                for(let i in participants){
                    console.log("emit to: " + participants[i]);
                    if(socket.id != participants[i]){
                        io.to(participants[i]).emit("change", change);
                    }
                }
            }else{
                console.log("WARNING: cannot find session id ("+emitSessionId+")")
            }
        })

        //io.to(socket.id).emit('message', 'something from the server');
        socket.on("changeCursor", (cursor)=>{
            console.log("cursor from "+socketId_sessionId[socket.id]+": "+cursor);
            let emitSessionId = socketId_sessionId[socket.id];
            cursor = JSON.parse(cursor);
            cursor["cursorId"] = socket.id;
            if(emitSessionId in collaborations){
                let participants = collaborations[emitSessionId]['participants'];
                for(let i in participants){
                    console.log("emit to: " + participants[i]);
                    if(socket.id != participants[i]){
                        io.to(participants[i]).emit("changeCursor", JSON.stringify(cursor));
                    }
                }
            }else{
                console.log("WARNING: cannot find session id ("+emitSessionId+")")
            }
        })
    })
}