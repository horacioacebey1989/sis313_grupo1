'use strict'
const { query } = require('express');
const { Query } = require('mongoose');
var profesor =  require('../model/profesor');

//GET PROFESOR BY ID
function getProfesor(req, res){
    var params = req.body;
    var idprofe = params.id;
    profesor.findById(idprofe, (err, profesorGet) => {
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(profesorGet){
            res.status(200).send({
                profesor : profesorGet
            })
        }
    });

}

//ADD PROFESOR
function addProfesor(req, res){
    var params = req.body;
    var profesorNew = new profesor();
    if(params.id_usuario){
        profesorNew.id_usuario = params.id_usuario;
        profesorNew.visible = true;

        profesorNew.save((err, profesorGet) =>{
            if(err) return res.status(500).send({message:'Error al guardar los datos!'});
            if(profesorGet){
                res.status(200).send({
                    profesor : profesorGet
                })
            }
        });
    }
    else{
        res.status(404).send({ message : 'Introduzca los valores correctamente'});
    }
}

//EDIT PROFESOR

function updateProfesor(req, res){
    var idProfesor = req.params.id;
    var update = req.body;

    profesor.findByIdAndUpdate(idProfesor, update, {new:true}, (err, profesorUpdate) => { 

        if(err) return res.status(500).send({message:'Error en la peticion'});

        if(profesorUpdate) return res.status(200).send({
            profesor : profesorUpdate
        })
        else{
            return res.status(404).send({message : 'NO se pudo actualizar'})
        }
    });
}

//DELETE PROFESOR

function deleteProfesor(req, res) {     
    var idProfesor = req.params.id;     

    profesor.findByIdAndUpdate(idProfesor, { "visible": false }, (err, profesordelete) => {    

         if (err) return res.status(500).send({ message: 'Error en la peticion' });  

         if (profesordelete) return res.status(200).send({             
             profesor: profesordelete         
            })         
            else {             
                 return res.status(404).send({ messsage: 'No se pudo eliminar!' })         
            }     
    });  
}


module.exports = {
    getProfesor,
    addProfesor,
    updateProfesor,
    deleteProfesor
}