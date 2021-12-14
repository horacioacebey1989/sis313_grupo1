'use strict'

var express = require('express');

var reservaController = require('../controllers/reservaController');

var api = express.Router();

api.post('/addReserva', reservaController.addReserva);

api.get('/getReserva', reservaController.getReserva);

api.get('/getReservas', reservaController.getReservas);

api.put('/updateReserva/:id', reservaController.updateReserva);

api.put('/deleteReserva/:id', reservaController.deleteReserva);

api.get('/getReservasClasesEstudiante/:id', reservaController.getReservasClasesEstudiante)

module.exports = api;