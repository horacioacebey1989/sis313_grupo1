'use strict'

var usuario = require('../model/usuario');
var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');

function addUsuario(req, res){
    console.log(req.body);
    var params = req.body;
    var usuarioNew = new usuario();
    
    if(params){
        usuarioNew.nombre = params.nombre;
        usuarioNew.fecha_nacimiento = params.fecha_nacimiento;
        usuarioNew.contacto = params.contacto;
        usuarioNew.username = params.username;
        usuarioNew.password = params.password;
        usuarioNew.visible = true;
        
        usuarioNew.save((err, usuarioGet) =>{
            if(err) return res.status(500).send({message:'Error al guardar los datos!'});
            if(usuarioGet){
                bcrypt.hash(params.password,null,null,(err,hash)=>{
                    if(err) {
                        return res.status(500).send({message:'Error al guardar los datos'});
                    }
                    if(hash) {
                        usuarioNew.password = hash;
                        res.status(200).send({
                            usuario: usuarioGet
                        });
                    }
                });
            }
        });
    }
    else{
        res.status(404).send({ message : 'Introduzca los valores correctamente'});
    }
}

// LOGIN
function loginUsuario(req, res){
    var params = req.body;

    usuario.findOne({nombre: params.nombre, visible: True}, (err, usuarioCheck)=>{
            if(err) return res.status(500).send({message:'Error en la peticion'});
            if(usuarioCheck){
                return res.status(200).send({
                    usuario : usuarioCheck,
                    token : jwt.createToken(usuarioCheck)
                })
            }
            else{
                return res.status(404).send({message: 'No ha encontrado el usuario!'})
            }
    });

}

function getUsuario(req, res) {
    var params = req.body;
    var idUsuario = params.id;
    usuario.findById({_id: idUsuario, visible: True}, (err, UsuarioGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(UsuarioGet) {
            res.status(200).send({
                Usuario : UsuarioGet
            });
        }
    });
}

function getUsuario2(req, res) {
    var idUsuario = req.params.id;
    usuario.findById({_id: idUsuario, visible:True}, (err, UsuarioGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(UsuarioGet) {
            res.status(200).send({
                Usuario : UsuarioGet
            });
        }
    });
}

/* GET MANY */
function getUsuarios(req, res) {
    usuario.find({ visible: True }, (err, UsuarioGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(UsuarioGet) {
            res.status(200).send({
                Usuario : UsuarioGet
            });
        }
    });
}

function updateUsuario(req, res) {
    var idUsuario = req.params.id;
    var update = req.body;
    usuario.findByIdAndUpdate({_id: idUsuario, visible: True}, update, { new: true }, (err, UsuarioUpdate) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(UsuarioUpdate) {
            res.status(200).send({
                Usuario: UsuarioUpdate
            });
        }
        else {
            return res.status(404).send({ message: 'No se pudo actualizar' });
        }
    });

}

function deleteUsuario(req, res) {
    var idUsuario = req.params.id;
    var update;

    usuario.findById({_id: idUsuario, visible: True}, (err, UsuarioGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(UsuarioGet) {
            update = UsuarioGet;
        }
    });

    update.visible = False;

    usuario.findByIdAndUpdate(idUsuario, update, { new: true }, (err, UsuarioUpdate) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(UsuarioUpdate) {
            res.status(200).send({
                Usuario: UsuarioUpdate
            });
        }
        else {
            return res.status(404).send({ message: 'No se pudo actualizar' });
        }
    }); 
}

module.exports = {
    addUsuario,
    loginUsuario,
    getUsuario,
    getUsuario2,
    getUsuarios,
    updateUsuario,
    deleteUsuario
}