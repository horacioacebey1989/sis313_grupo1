'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var llave_secreta = 'q1w2e3';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(404).send({message: 'La peticion no tiene cabecera!'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        var data = jwt.decode(token, llave_secreta);
        if(data.exp <= moment().unix()){
            return res.status(404).send({
                message : 'El token ha expirado'
            });
        }
    }catch(ex){
        return res.status(404).send({
            message : 'Se produjo un error'
        });
    }

    req.usuario = data;

    next();
}