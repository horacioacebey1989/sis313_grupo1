'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var llave_secreta = 'q1w2e3';

function ensureAuthAdministrador(req, res, next) {
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
        if(data.tipo_usuario.localeCompare('Administrador') != 0){
            return res.status(404).send({
                message : 'El usuario no tiene los privilegios'
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

function ensureAuthProfesor(req, res, next) {
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
        if(data.tipo_usuario.localeCompare('Profesor') != 0){
            return res.status(404).send({
                message : 'El usuario no tiene los privilegios'
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

function ensureAuthEstudiante(req, res, next) {
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
        if(data.tipo_usuario.localeCompare('Estudiante') != 0){
            return res.status(404).send({
                message : 'El usuario no tiene los privilegios'
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

function ensureAuthGeneral(req, res, next) {
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

module.exports = {
    ensureAuthAdministrador,
    ensureAuthProfesor,
    ensureAuthEstudiante,
    ensureAuthGeneral
}