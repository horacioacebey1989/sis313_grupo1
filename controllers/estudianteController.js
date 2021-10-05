'use strict'

var estudiante = require('../model/estudiante');

function addEstudiante(req, res){
    var params = req.body;
    var estudianteNew = new estudiante();
    
    if(params.id_usuario){
        estudianteNew.id_usuario = params.id_usuario;
        estudianteNew.visible = true;

        estudianteNew.save((err, estudianteGet) =>{
            if(err) return res.status(500).send({message:'Error al guardar los datos!'});
            if(estudianteGet){
                return res.status(200).send({
                    estudiante : estudiante
                })
            }
        });
    }
    else{
        res.status(404).send({ message : 'Introduzca los valores correctamente'});
    }
}

function getEstudiante(req, res){

    var params = req.body;
    var idEstudiante = params.id;

    estudiante.findById(idEstudiante, (err, estudianteGet) => {
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(estudianteGet){
            return res.status(200).send({
                estudiante : estudianteGet
            })
        }
    });
}

function getEstudiante2(req, res){

    var idEstudiante = req.params.id;

    estudiante.findById(idEstudiante, (err, estudianteGet) => {
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(estudianteGet){
            return res.status(200).send({
                estudiante : estudianteGet
            })
        }
    });
}

function updateEstudiante(req, res){
    var idEstudiante = req.params.id;
    var update = req.body;

    estudiante.findByIdAndUpdate(idEstudiante, update, {new:true}, (err, estudianteUpdate) => { 

        if(err) return res.status(500).send({message:'Error en la peticion'});

        if(estudianteUpdate) return res.status(200).send({
            estudiante : estudianteUpdate
        })
        else{
            return res.status(404).send({message : 'NO se pudo actualizar'})
        }
    });
}

function deleteEstudiante(req, res){
    var idEstudiante = req.params.id;

    estudiante.findByIdAndUpdate(idEstudiante, {"visible": false}, {new:true}, (err, estudianteUpdate) => { 

        if(err) return res.status(500).send({message:'Error en la peticion'});

        if(estudianteUpdate) return res.status(200).send({
            estudiante : estudianteUpdate
        })
        else{
            return res.status(404).send({message : 'NO se pudo eliminar'})
        }
    });
}

module.exports = {
    addEstudiante,
    getEstudiante,
    getEstudiante2,
    updateEstudiante,
    deleteEstudiante
}
