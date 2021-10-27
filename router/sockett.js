function sockett(io, arr, posArrI, arrIcons) {
    io.on('connect', (socket) => {
        socket.on('chat message', (key) => {
            // emit message to all users
            io.emit('chat message', key);
        });
        socket.on('disconnect', () => {
            var res = arr.find(e => e.id === socket.id);
            io.emit('out', res, {
                count: io.engine.clientsCount
            })
        })
        // push new user after assigning id
        socket.on('push', (key) => arr.push(key))

        // recall join to assign socket.id to new user
        socket.on('fakejoin', (name) => {
            io.emit('join', {
                name: name,
                icon: arrIcons[posArrI]
            }, {
                count: io.engine.clientsCount
            })
            if (posArrI == arrIcons.length - 1) posArrI = 0;
            else posArrI++;
        })

        socket.on('request best-score', () => {
            console.log("đã nghe");
            io.emit('best-score', {
                bestscore,
                bestplayer
            });
        });
    })

}
module.exports = sockett;
