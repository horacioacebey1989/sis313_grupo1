'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var llave_secreta = 'q1w2e3';

exports.createToken = function(usuario){
    var data = {
        sudId : usuario._id,
        nombre : usuario.nombre,
        fecha_nacimiento : usuario.fecha_nacimiento,
        contacto : usuario.contacto,
        username : usuario.username,
        password : usuario.password,
        visible : usuario.visible,
        id_tipo_usuario : usuario.id_tipo_usuario,
        exp : moment().add(30, 'days').unix
    };
    return jwt.encode(data, llave_secreta);
}


