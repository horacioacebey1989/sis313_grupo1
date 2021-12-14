'use strict'

var materia_particular = require('../model/materia_particular');
var clase = require('../model/clase');

function addMateriaParticular(req, res){
    var params = req.body;
    var materia_particularNew = new materia_particular();
    
    if(params.nombre_materia, params.descripcion, params.id_usuario){
        materia_particularNew.nombre_materia = params.nombre_materia;
        materia_particularNew.descripcion = params.descripcion;
        materia_particularNew.id_usuario = params.id_usuario;
        materia_particularNew.visible = true;

        materia_particularNew.save((err, materia_particularGet) =>{
            if(err) return res.status(500).send({message:'Error al guardar los datos!'});
            if(materia_particularGet){
                return res.status(200).send({
                    materia_particular : materia_particular
                })
            }
        });
    }
    else{
        res.status(404).send({ message : 'Introduzca los valores correctamente'});
    }
}

function getMateriaParticular(req, res){

    var params = req.body;
    var idMateriaParticular = params.id;

    materia_particular.findById(idMateriaParticular, (err, materia_particularGet) => {
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(materia_particularGet){
            return res.status(200).send({
                materia_particular : materia_particularGet
            })
        }
    });
}

function getMateriaParticular2(req, res){

    var idMateriaParticular = req.params.id;

    materia_particular.findById(idMateriaParticular, (err, materia_particularGet) => {
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(materia_particularGet){
            return res.status(200).send({
                materia_particular : materia_particularGet
            })
        }
    });
}

function getMateriasProfesor(req, res){
    var idProfesor = req.params.id;

    materia_particular.find({id_usuario: idProfesor, visible: true}, (err, materiasProfesor) => {
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(materiasProfesor){
            return res.status(200).send({
                materiasProfesor : materiasProfesor
            })
        }
    });
}

async function getMateriasNombre(req, res) {
    var nombre = req.params.id;

    // materia_particular.find({nombre_materia: nombre, visible: true}, async (err, materiasNombre) => {
    //     if(err) return res.status(500).send({message : 'Error en la peticion'});
    //     if(materiasNombre){
    //         materiasNombre.forEach(async materiaNombre => {
                
    //             var clases = await clase.find({id_materia_particular: materiaNombre._id}, (err, clasesMateriaNombre) => {
    //                 if(err) return res.status(500).send({message : 'Error en la peticion'});
    //                 if(clasesMateriaNombre) {
    //                     return clasesMateriaNombre;
    //                 }
    //             });
                
    //             return res.status(200).send({
    //                 materiasNombre : clases
    //             })
    //         });
    //     }
    // });
}

function updateMateriaParticular(req, res){
    var idMateriaParticular = req.params.id;
    var update = req.body;

    materia_particular.findByIdAndUpdate(idMateriaParticular, update, {new:true}, (err, materia_particularUpdate) => { 

        if(err) return res.status(500).send({message:'Error en la peticion'});

        if(materia_particularUpdate) return res.status(200).send({
            materia_particular : materia_particularUpdate
        })
        else{
            return res.status(404).send({message : 'NO se pudo actualizar'})
        }
    });
}

function deleteMateriaParticular(req, res){
    var idMateriaParticular = req.params.id;

    materia_particular.findByIdAndUpdate(idMateriaParticular, {"visible": false}, {new:true}, (err, materia_particularUpdate) => { 

        if(err) return res.status(500).send({message:'Error en la peticion'});

        if(materia_particularUpdate) return res.status(200).send({
            materia_particular : materia_particularUpdate
        })
        else{
            return res.status(404).send({message : 'NO se pudo eliminar'})
        }
    });
}

function deleteMateriaParticular(req, res){
    var idMateriaParticular = req.params.id;

    materia_particular.findByIdAndUpdate(idMateriaParticular, {"visible": false}, {new:true}, (err, materia_particularUpdate) => { 

        if(err) return res.status(500).send({message:'Error en la peticion'});

        if(materia_particularUpdate) return res.status(200).send({
            materia_particular : materia_particularUpdate
        })
        else{
            return res.status(404).send({message : 'NO se pudo eliminar'})
        }
    });
}

module.exports = {
    addMateriaParticular,
    getMateriaParticular,
    getMateriaParticular2,
    updateMateriaParticular,
    deleteMateriaParticular,
    getMateriasProfesor,
    getMateriasNombre
}
