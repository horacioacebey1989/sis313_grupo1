'use strict'

var express = require('express');
var claseController = require('../controllers/claseController');
var auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/addClase', auth.ensureAuthProfesor, claseController.addClase);
api.get('/getClase2/:id', claseController.getClase2);
api.get('/getClases', claseController.getClases);
api.put('/updateClase/:id', auth.ensureAuthProfesor, claseController.updateClase);
api.delete('/deleteClase/:id', auth.ensureAuthProfesor, claseController.deleteClase);

module.exports = api;