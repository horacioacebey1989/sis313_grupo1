'use strict'

var express = require('express');
var horario_claseController = require('../controllers/horario_claseController');
var auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/addHorarioClase', horario_claseController.addHorarioClase);
api.get('/getHorarioClase2/:id', horario_claseController.getHorarioClase2);
api.get('/getHorariosClases/:page?', horario_claseController.getHorariosClases);
api.get('/getHorariosClaseByClaseId', horario_claseController.getHorariosClaseByClaseId);
api.get('/getHorariosClaseByClaseName', horario_claseController.getHorariosClaseByClaseName);
api.put('/updateHorarioClase/:id', horario_claseController.updateHorarioClase);
api.put('/deleteHorarioClase/:id', horario_claseController.deleteHorarioClase);

module.exports = api;