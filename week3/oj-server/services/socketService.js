/**
 * Created by Amber on 3/24/17.
 */
module.exports = function(io) {
    var collaborations = [];
    //map from socket to sessionId
    var socketIdToSessionId = [];

    io.on('connection', socket => {
        let sessionId = socket.handshake.query['sessionId'];

        //why do we need this map?
        socketIdToSessionId[socket.id] = sessionId;

        if(!(sessionId in collaborations)) {
            collaborations[sessionId] = {
                'participants': []
            }
        } else {
            collaborations[sessionId]['participants'].push(socket.id);
        };

        socket.on('change', delta=> {
            console.log('change', socketIdToSessionId[socket.id],delta);
            let sessionId = socketIdToSessionId[socket.id];
            if(sessionId in collaborations) {
                let participants = collaborations[sessionId][participants];
                for(let i = 0; i < participants.length; i++) {
                    if(participants[i] !== socket.id) {
                        io.to(participants[i].emit("change",delta));
                    }
                }
            }
        })

    })

}