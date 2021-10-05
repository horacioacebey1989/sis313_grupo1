'use strict'

var usuario = require('../model/usuario');
var jwt = require('../services/jwt')

function addUsuario(req, res){
    console.log(req.body);
    var params = req.body;
    var usuarioNew = new usuario();
    
    if(params.nombre, params.password, params.contacto, params.username){
        usuarioNew.nombre = params.nombre;
        usuarioNew.password = params.password;
        usuarioNew.contacto = params.contacto;
        usuarioNew.username = params.username;
        usuarioNew.visible = true;
        usuarioNew.save((err, usuarioGet) =>{
            if(err) return res.status(500).send({message:'Error al guardar los datos!'});
            if(usuarioGet){
                res.status(200).send({
                    usuario : usuarioGet
                })
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
    
    usuario.findOne({usuario: params.nombre}, (err, usuarioCheck)=>{
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


//GET USUARIO
function getUsuario(req, res){
    var params = req.body;
    var verify = params.username;
    usuario.findOne({username : verify}, (err, usuarioGet) => {
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(usuarioGet){
            res.status(200).send({
                //tipoUsuario : tipoUsuarioGet
                username : usuarioGet
            })
        }else{
            return res.status(404).send({message : 'No se encontraron coincidencias'})
        }
    });
}

// UPDATE

module.exports = {
    addUsuario,
    loginUsuario,
    getUsuario
}
