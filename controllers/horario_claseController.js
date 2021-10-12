'use strict'

var horario_clase = require('../model/horario_clase');
var clase = require('../model/clase');

function addHorarioClase(req, res){
    var params = req.body;
    var horarioClaseNew = new horario_clase();
    
    if(params.dia, params.hora, params.id_clase){
        
        horarioClaseNew.dia = params.dia;
        horarioClaseNew.hora = params.hora;
        horarioClaseNew.visible = true;
        horarioClaseNew.id_clase = params.id_clase;

        horarioClaseNew.save((err, horarioClaseGet) =>{
            if(err) return res.status(500).send({message:'Error al guardar los datos!'});
            if(horarioClaseGet){
                res.status(200).send({
                    HorarioClase: horarioClaseGet
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

function getHorarioClase2(req, res) {
    var idHorarioClase = req.params.id;

    horario_clase.findOne({_id: idHorarioClase, visible: true}, (err, HorarioClaseGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(HorarioClaseGet) {
            res.status(200).send({
                HorarioClase : HorarioClaseGet
            });
        }
        else {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

/* GET MANY */
function getHorariosClases(req, res) {
    horario_clase.find({ visible: true }, (err, HorariosClasesGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(HorariosClasesGet) {
            res.status(200).send({
                HorariosClases : HorariosClasesGet
            });
        }
        else {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

function getHorariosClaseByClaseId(req, res) {
    var claseId = req.params.id;

    horario_clase.find({ id_clase: claseId, visible: true }, (err, HorariosClasesGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(HorariosClasesGet) {
            res.status(200).send({
                HorariosClases : HorariosClasesGet
            });
        }
        else {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

function getHorariosClaseByClaseName(req, res) {
    var claseNombre = req.params.nombre;
    var HorariosClases = [];

    clase.find({nombre: new RegExp(claseNombre,'i'), visible: true}, (err, clasesGet) => {
        if(err){
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(clasesGet){
            clasesGet.forEach(clase => {
                horario_clase.find({ id_clase: clase._id, visible: true }, (err, HorariosClaseGet) => {
                    if(err) {
                        return res.status(500).send({ message: 'Error en la peticion' });
                    }
                    if(HorariosClaseGet) {
                        HorariosClases.push({clase: clase, horarios: HorariosClaseGet});
                    }
                    else {
                        return res.status(500).send({ message: 'Error en la peticion' });
                    }
                });
            });
            res.status(200).send({
                HorariosPorClase : HorariosClases
            });
        }
        else {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

function updateHorarioClase(req, res) {
    var idHorarioClase = req.params.id;
    var update = req.body;

    delete update['visible'];

    horario_clase.findOneAndUpdate({_id: idHorarioClase, visible: true}, update, { new: true }, (err, HorarioClaseUpdate) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(HorarioClaseUpdate) {
            res.status(200).send({
                HorarioClase: HorarioClaseUpdate
            });
        }
        else {
            return res.status(404).send({ message: 'No se pudo actualizar' });
        }
    });
}

function deleteHorarioClase(req, res) {
    var idHorarioClase = req.params.id;
    var update;

    horario_clase.findById({_id: idHoraioClase, visible: true}, (err, HorarioClaseGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(HorarioClaseGet) {
            update = HorarioClaseGet;
            update.visible = false;
            horario_clase.findByIdAndUpdate(idHoraioClase, update, { new: true }, (err, HorarioClaseUpdate) => {
                if(err) {
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
                if(HorarioClaseUpdate) {
                    res.status(200).send({
                        HorarioClase: HorarioClaseUpdate
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
    addHorarioClase,
    getHorarioClase2,
    getHorariosClases,
    getHorariosClaseByClaseId,
    getHorariosClaseByClaseName,
    updateHorarioClase,
    deleteHorarioClase
}

