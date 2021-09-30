'use strict'

var usuario = require('../model/usuario');
var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');

function addUsuario(req, res){
    console.log(req.body);
    var params = req.body;
    var usuarioNew = new usuario();
    
    if(params.nombre, params.password, params.tipoUsuario){
        usuarioNew.nombre = params.nombre;
        usuarioNew.password = params.password;
        usuarioNew.estado = true;
        usuarioNew.tipoUsuario = params.tipoUsuario;
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
    
    usuario.findOne({nombre: params.nombre}, (err, usuarioCheck)=>{
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


// UPDATE

module.exports = {
    addUsuario,
    loginUsuario
}
