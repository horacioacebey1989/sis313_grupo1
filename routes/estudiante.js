'use strict'

var express = require('express');

var estudianteController = require('../controllers/estudianteController');

var api = express.Router();


api.post('/addEstudiante', estudianteController.addEstudiante);
api.get('/getEstudiantebyID', estudianteController.getEstudiante);
api.get('/getEstudiantebyID/:id', estudianteController.getEstudiante2);
api.put('/updateEstudiante/:id', estudianteController.updateEstudiante);
api.put('/deleteEstudiante/:id', estudianteController.deleteEstudiante);

module.exports = api;