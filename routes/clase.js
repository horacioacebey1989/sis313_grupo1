'use strict'

var express = require('express');
var claseController = require('../controllers/claseController');
var auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/addClase', claseController.addClase);
api.get('/getClase2/:id', claseController.getClase2);
api.get('/getClases/:page?', claseController.getClases);
api.put('/updateClase/:id', claseController.updateClase);
api.delete('/deleteClase/:id', claseController.deleteClase);
api.get('/getClasesMateriasNombre/:id', claseController.getClasesMateriasNombre);
api.get('/getClasesProfesor/:id', claseController.getClasesProfesor);

module.exports = api;