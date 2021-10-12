'use strict'

var express = require('express');
var horario_claseController = require('../controllers/horario_claseController');
var auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/addHorarioClase', auth.ensureAuthProfesor, horario_claseController.addHorarioClase);
api.get('/getHorarioClase2/:id', auth.ensureAuthGeneral, horario_claseController.getHorarioClase2);
api.get('/getHorariosClases', auth.ensureAuthGeneral, horario_claseController.getHorariosClases);
api.get('/getHorariosClaseByClaseId', auth.ensureAuthGeneral, horario_claseController.getHorariosClaseByClaseId);
api.get('/getHorariosClaseByClaseName', auth.ensureAuthGeneral, horario_claseController.getHorariosClaseByClaseName);
api.put('/updateHorarioClase/:id', auth.ensureAuthProfesor, horario_claseController.updateHorarioClase);
api.delete('/deleteHorarioClase/:id', auth.ensureAuthProfesor, horario_claseController.deleteHorarioClase);

module.exports = api;