'use strict'

var clase = require('../model/clase');

function addClase(req, res){
    var params = req.body;
    var claseNew = new clase();
    
    if(params.limite, params.costo_hora, params.direccion, params.descripcion, params.id_usuario, params.id_materia_particular){
        
        claseNew.limite = params.limite;
        claseNew.costo_hora = params.costo_hora;
        claseNew.direccion = params.direccion;
        claseNew.descripcion = params.descripcion;
        claseNew.visible = true;
        claseNew.id_usuario = params.id_usuario;
        claseNew.id_materia_particular = params.id_materia_particular;

        claseNew.save((err, claseGet) =>{
            if(err) return res.status(500).send({message:'Error al guardar los datos!'});
            if(claseGet){
                res.status(200).send({
                    clase: claseGet
                });
            }
            else {
                return res.status(500).send({ message: 'Error en la peticion' });
            }
        });

    }
    else{
        res.status(404).send({ message : 'Introduzca los valores correctamente'});
    }
}

function getClase2(req, res) {
    var idClase = req.params.id;

    clase.findOne({_id: idClase, visible: true}, (err, ClaseGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(ClaseGet) {
            res.status(200).send({
                Clase : ClaseGet
            });
        }
        else {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

/* GET MANY */
function getClases(req, res) {
    clase.find({ visible: true }, (err, ClasesGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(ClasesGet) {
            res.status(200).send({
                Clases : ClasesGet
            });
        }
        else {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

function updateClase(req, res) {
    var idClase = req.params.id;
    var update = req.body;

    delete update['visible'];

    clase.findOneAndUpdate({_id: idClase, visible: true}, update, { new: true }, (err, ClaseUpdate) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(ClaseUpdate) {
            res.status(200).send({
                Clase: ClaseUpdate
            });
        }
        else {
            return res.status(404).send({ message: 'No se pudo actualizar' });
        }
    });
}

function deleteClase(req, res) {
    var idClase = req.params.id;
    var update;

    clase.findById({_id: idClase, visible: true}, (err, ClaseGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(ClaseGet) {
            update = ClaseGet;
            update.visible = false;
            clase.findByIdAndUpdate(idClase, update, { new: true }, (err, ClaseUpdate) => {
                if(err) {
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
                if(ClaseUpdate) {
                    res.status(200).send({
                        Clase: ClaseUpdate
                    });
                }
                else {
                    return res.status(404).send({ message: 'No se pudo actualizar' });
                }
            });
        }
        else {
            return res.status(404).send({ message: 'Error en la peticion' });
        }
    });
}

module.exports = {
    addClase,
    getClase2,
    getClases,
    updateClase,
    deleteClase
}

