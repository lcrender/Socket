const { io } = require('../server');
const { Usuarios } = require ('../classes/Usuarios');
const usuarios = new Usuarios();
const {createMsg} = require('../helpers/helpers');

io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {

        if(!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre/sala es necesario'
            });
        }

        client.join(data.sala)

        let personas = usuarios.addPerson(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listPerson', usuarios.getPersonsInRoom(data.sala))
        callback(usuarios.getPersonsInRoom(data.sala))
    });
    client.on('createMsg', (data)=> {
        let persona = usuarios.getPerson(client.id)
        let mensaje = createMsg(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('createMsg', mensaje)
    });
    client.on('disconnect', () => {
        let personaBorrada = usuarios.deletePerson (client.id)
        client.broadcast.to(personaBorrada.sala).emit('createMsg', createMsg('Administrador', `${personaBorrada.nombre} abandono el chat`))
        client.broadcast.to(personaBorrada.sala).emit('listPerson', usuarios.getPersonsInRoom(personaBorrada.sala));
    });
    client.on('privateMsg', data => {
        let persona = usuarios.getPerson(client.id);
        client.broadcast.to(data.para).emit('privateMsg', createMsg(persona.nombre, data.mensaje));
    });

});
