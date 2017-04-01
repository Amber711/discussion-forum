/**
 * Created by Amber on 3/24/17.
 */
var redisClient = require('../modules/redisClient');
const TIME_OUT_IN_SECS = 3600;


module.exports = function(io) {
    var collaborations = [];
    //map from socket to sessionId
    var socketIdToSessionId = [];
    var sessionPath = "/temp_sessions";


    io.on('connection', socket => {
        let sessionId = socket.handshake.query['sessionId'];

        //sessionId for a same editor, each user has his/her own socketId.
        //Everytime when user connects, query his sessionId, and put it this map with the socket.id
        socketIdToSessionId[socket.id] = sessionId;

        if(sessionId in collaborations) {
            collaborations[sessionId]['participants'].push(socket.id);
        } else {
            redisClient.get(sessionPath +'/'+ sessionId, function(data) {
                    if(data) {
                        console.log('this sessionId is still stored in the redis, restore it to the memory');
                        collaborations[sessionId] = {
                            'cachedChangeEvents': JSON.parse(data),
                            'participants': []
                        };
                    } else {
                        console.log('this is a new sessionId, creating a new one')
                        collaborations[sessionId] = {
                            'cachedChangeEvents': [],
                            'participants': []
                        }
                    }
                collaborations[sessionId]['participants'].push(socket.id);

            });
        }

        socket.on('change', delta=> {
            console.log('change', socketIdToSessionId[socket.id],delta);
            let sessionId = socketIdToSessionId[socket.id];

            if(sessionId in collaborations) {
                collaborations[sessionId]["cachedChangeEvents"].push(['change', delta, Date.now()]);
            }
            forwardEvents(socket.id, 'change', delta);
        });

        socket.on('cursorMove', cursor => {
            console.log('server-side: cursorMove event:', cursor);
            cursor = JSON.parse(cursor);
            cursor['socketId'] = socket.id;
            forwardEvents(socket.id, 'cursorMove' , JSON.stringify(cursor));


        });

        socket.on('restoreBuffer', () => {
            let sessionId = socketIdToSessionId[socket.id];
            if(sessionId in collaborations) {
                var changeEvents = collaborations[sessionId]['cachedChangeEvents'];
                // emit the cached change events one by one;
                for(let i = 0; i < changeEvents.length; i++) {
                    socket.emit(changeEvents[i][0], changeEvents[i][1]);
                }
            }

        });

        socket.on('disconnect', function() {
            let sessionId = socketIdToSessionId[socket.id];
            if( sessionId in collaborations ) {
                let participants = collaborations[sessionId].participants;
                let index = participants.indexOf(socket.io);
                if( index >= 0) {
                    participants.splice(index, 0);
                    if(participants.length == 0) {
                        //everyone left the sessionId, so store this sessionId's info to Redis
                        let key = sessionPath + '/' + sessionId;
                        let value = JSON.stringify(collaborations[sessionId]['cachedChangeEvents']);

                        redisClient.set(key, value, redisClient.redisPrint);
                        redisClient.expire(key, TIME_OUT_IN_SECS);

                        delete collaborations[sessionId];
                        console.log('delete collaborations[sessionId]',delete collaborations[sessionId])
                    }
                }
            }
        });

        function forwardEvents (socketId, eventName, dataString) {
            let sessionId = socketIdToSessionId[socketId];
            if(sessionId in collaborations) {
                let participants = collaborations[sessionId]['participants'];
                for(let i = 0; i < participants.length; i++) {
                    if(participants[i] !== socket.id) {
                        io.to(participants[i]).emit(eventName,dataString);
                    }
                }
            } else {
                console.log("WARNING: count not tie socket_io to any collaboration")
            }
        }

    })

};