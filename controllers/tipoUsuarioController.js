'use strict'

var tipoUsuario = require('../model/tipoUsuario');

function addTipoUsuario(req, res){
    var params = req.body;
    var tipoUsuarioNew = new tipoUsuario();
    if(params.nombre){
        tipoUsuarioNew.nombre = params.nombre;
        tipoUsuarioNew.estado = true;

        tipoUsuarioNew.save((err, tipoUsuarioGet) =>{
            if(err) return res.status(500).send({message:'Error al guardar los datos!'});
            if(tipoUsuarioGet){
                return res.status(200).send({
                    tipoUsuario : tipoUsuarioGet
                })
            }
        });
    }
    else{
        res.status(404).send({ message : 'Introduzca los valores correctamente'});
    }
}

function getTipoUsuario(req, res){

    var params = req.body;
    
    var idTipoUsuario = params.id;

    tipoUsuario.findById(idTipoUsuario, (err, tipoUsuarioGet) =>{
            if(err) return res.status(500).send({message : 'Error en la peticion'});
            if(tipoUsuarioGet){
                return res.status(200).send({
                    tipoUsuario : tipoUsuarioGet
                })
            }
    });

}

function getTipoUsuario2(req, res){

    var idTipoUsuario = req.params.id;

    tipoUsuario.findById(idTipoUsuario, (err, tipoUsuarioGet) =>{
            if(err) return res.status(500).send({message : 'Error en la peticion'});
            if(tipoUsuarioGet){
                return res.status(200).send({
                    tipoUsuario : tipoUsuarioGet
                })
            }
    });

}

function updateTipoUsuario(req, res){
    var idTipoUsuario = req.params.id;
    var update = req.body;

    tipoUsuario.findByIdAndUpdate(idTipoUsuario, update,{new:true}, (err, tipoUsuarioUpdate)=>{
                if(err) return res.status(500).send({message:'Error en la peticion'});

                if(tipoUsuarioUpdate) return res.status(200).send({
                        tipoUsuario : tipoUsuarioUpdate
                })
                else{
                    return res.status(404).send({messsage : 'No se pudo actualizar!'})
                }
    });

}

module.exports = {
    addTipoUsuario,
    getTipoUsuario,
    getTipoUsuario2,
    updateTipoUsuario
}

