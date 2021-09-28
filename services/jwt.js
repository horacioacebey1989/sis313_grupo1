'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var llave_secreta = 'q1w2e3';

exports.createToken = function(usuario){
        var data = {
            sudId : usuario._id,
            nombre: usuario.nombre,
            password : usuario.password,
            estado : usuario.estado,
            exp : moment().add(30, 'days').unix
        };
        return jwt.encode(data, llave_secreta);
}


