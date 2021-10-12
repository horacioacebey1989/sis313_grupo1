'use strict'

var express = require('express');

var materia_particularController = require('../controllers/materia_particularController');

var api = express.Router();


api.post('/addMateriaParticular', materia_particularController.addMateriaParticular);
api.get('/getMateriaParticularbyID', materia_particularController.getMateriaParticular);
api.get('/getMateriaParticularbyID/:id', materia_particularController.getMateriaParticular2);
api.put('/updateMateriaParticular/:id', materia_particularController.updateMateriaParticular);
api.put('/deleteMateriaParticular/:id', materia_particularController.deleteMateriaParticular);

module.exports = api;