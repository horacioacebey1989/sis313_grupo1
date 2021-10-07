'use strict'

var express = require('express');

var profesorController = require('../controllers/profesorController');

var api = express.Router();

api.post('/addProfesor', profesorController.addProfesor);

api.get('/getProfesor', profesorController.getProfesor);

api.put('/updateProfesor/:id', profesorController.updateProfesor);

api.put('/deleteProfesor/:id', profesorController.deleteProfesor);

module.exports = api;