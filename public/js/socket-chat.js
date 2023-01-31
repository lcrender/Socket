const socket = io();
const params = new URLSearchParams (window.location.search);
if (!params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

let usuario = {
    nombre: params.get('nombre')
};

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit('enterChat', usuario, function(res){
        console.log('Usuarios conectados', res)
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Alejandro',
//     mensaje: 'Hola Mundo Cruel'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('createMsg', function(mensaje) {
    console.log('Servidor:', mensaje);
});
socket.on('listPerson', function(personas) {
    console.log(personas);
});

socket.on('privateMsg', function(mensaje) {
    console.log('Mensaje Privado', mensaje)
})