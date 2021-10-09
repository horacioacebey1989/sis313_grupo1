'use strict'
const { query } = require('express');
const { Query } = require('mongoose');
var reserva =  require('../model/reserva');


//ADD PROFESOR
function addReserva(req, res){
    var params = req.body;
    var reservaNew = new reserva();
    if(params.tiempo,params.costo_total, params.id_usuario, params.id_clase){
        reservaNew.tiempo = params.tiempo;
        reservaNew.costo_total = params.costo_total;
        reservaNew.id_usuario = params.id_usuario;
        reservaNew.id_clase = params.id_clase;
        reservaNew.visible = true;

        reservaNew.save((err, reservaGet) =>{
            if(err) return res.status(500).send({message:'Error al guardar los datos!'});
            if(reservaGet){
                res.status(200).send({
                    reserva : reservaGet
                })
            }
        });
    }
    else{
        res.status(404).send({ message : 'Introduzca los valores correctamente'});
    }
}


//GET RESERVA BY ID
function getReserva(req, res){
    var params = req.body;
    var idreserva = params.id;
    reserva.findById(idreserva, (err, reservaGet) => {
        if(err) return res.status(500).send({message : 'Error en la peticion'});
        if(reservaGet){
            res.status(200).send({
                reserva : reservaGet
            })
        }
    });
}

//GET RESERVAS 
function getReservas(req, res) {
    reserva.find({ visible: true }, (err, reservaGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(reservaGet) {
            res.status(200).send({
                reserva : reservaGet
            });
        }
    });
}


//UPDATE RESERVA

function updateReserva(req, res){
    var idReserva = req.params.id;
    var update = req.body;

    reserva.findByIdAndUpdate(idReserva, update, {new:true}, (err, reservaUpdate) => { 

        if(err) return res.status(500).send({message:'Error en la peticion'});

        if(reservaUpdate) return res.status(200).send({
            reserva : reservaUpdate
        })
        else{
            return res.status(404).send({message : 'NO se pudo actualizar'})
        }
    });
}

//DELETE RESERVA

function deleteReserva(req, res) {     
    var idReserva = req.params.id;     

    reserva.findByIdAndUpdate(idReserva, { "visible": false }, (err, reservadelete) => {    

         if (err) return res.status(500).send({ message: 'Error en la peticion' });  

         if (reservadelete) return res.status(200).send({             
             reserva: reservadelete         
            })         
            else {             
                 return res.status(404).send({ messsage: 'No se pudo eliminar!' })         
            }     
    });  
}
module.exports = {
    addReserva,
    getReserva,
    getReservas,
    updateReserva,
    deleteReserva
}