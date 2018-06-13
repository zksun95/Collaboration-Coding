var rclient = require('../tools/redis-ops');
const TIMEOUT = 3600;

module.exports = function(io) {
    var collaborations = [];
    var socketId_sessionId = [];

    //var sessionPrefix = "/col_session/";

    io.on("connection", (socket)=>{
        let sessionId = socket.handshake.query['sessionId'];  
        console.log(sessionId+" with "+socket.id);

        socketId_sessionId[socket.id] = sessionId;
        
        if(sessionId in collaborations){
            collaborations[sessionId]['participants'].push(socket.id);
        }else{
            rclient.get(makeSessionKey(sessionId), function(data){
                if(data){
                    console.log("load from redis ...");
                    collaborations[sessionId] = {
                        'cache': JSON.parse(data),
                        'participants': []
                    };
                }else{
                    console.log("create in redis ...");
                    collaborations[sessionId] = {
                        'cache': [],
                        'participants': []
                    };

                }
                collaborations[sessionId]['participants'].push(socket.id);
            });
            // console.log(collaborations);
            // collaborations[sessionId]['participants'].push(socket.id);
        }

        function makeSessionKey(sid){
            return "/collaborations_session/" + sid;
        }

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
            
            if(sessionId in collaborations){
                collaborations[sessionId]['cache'].push(["change", change, Date.now()]);
            }

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

        socket.on("loadCode", ()=>{
            console.log("Reloading for " + sessionId + "(socket: " + socket.id + ")");
            if(sessionId in collaborations){
                let changes = collaborations[sessionId]['cache'];
                for(let i=0; i<changes.length; i++){
                    socket.emit(changes[i][0], changes[i][1]);
                }
            }
        })

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
            if(sessionId in collaborations){
                var index = collaborations[sessionId]['participants'].indexOf(socket.id);
                if (index > -1) {
                    collaborations[sessionId]['participants'].splice(index, 1);
                    if(participants.length == 0){
                        console.log("Last user disconnected");
                        let key = makeSessionKey(sessionId);
                        let value = JSON.stringify(collaborations[sessionId]['cache']);
                        rclient.set(key, value, rclient.redisPrint);
                        rclient.expire(key, TIMEOUT);
                        delete collaborations[sessionId];
                    }
                }
                emitInfo(socket.id, "deleteCursor", socket.id);
                console.log("disconnected: " + socket.id);
                //collaborations[sessionId]['participants'].push(socket.id);
            }
            
        });

        // setInterval(function(){
        //     console.log("users sent: "+socket.id);
        //     socket.emit('currentUsers', collaborations[sessionId]['participants']); 
        // }, 20000);
    });
}