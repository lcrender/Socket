const { io } = require('../server');
const { Usuarios } = require ('../classes/Usuarios');
const usuarios = new Usuarios();
const {createMsg} = require('../helpers/helpers');

io.on('connection', (client) => {
    client.on('enterChat', (data, callback) => {
        if(!data.nombre) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }
        let personas = usuarios.addPerson(client.id, data.nombre);
        client.broadcast.emit('listPerson', usuarios.getPersons())
        callback(personas)
    });
    client.on('createMsg', (data)=> {
        let persona = usuarios.getPerson(client.id)
        let mensaje = createMsg(persona.nombre, data.mensaje);
        client.broadcast.emit('createMsg', mensaje)
    });
    client.on('disconnect', () => {
        let personaBorrada = usuarios.deletePerson (client.id)
        client.broadcast.emit('createMsg', createMsg('Administrador', `${personaBorrada.nombre} abandono el chat`))
        client.broadcast.emit('listPerson', usuarios.getPersons());
    });
    client.on('privateMsg', data => {
        let persona = usuarios.getPerson(client.id);
        client.broadcast.to(data.para).emit('privateMsg', createMsg(persona.nombre, data.mensaje));
    });

});
