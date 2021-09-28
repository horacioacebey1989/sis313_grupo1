'use strict'

var express = require('express');

var tipoUsuarioController = require('../controllers/tipoUsuarioController');

var auth = require('../middlewares/aunthenticated')

var api = express.Router();


api.post('/addTipoUsuario',  tipoUsuarioController.addTipoUsuario);
api.get('/getTipoUsuarioByID', tipoUsuarioController.getTipoUsuario);
api.get('/getTipoUsuarioByID/:id', tipoUsuarioController.getTipoUsuario2);
api.put('/updateTipoUsuario/:id', tipoUsuarioController.updateTipoUsuario);

module.exports = api;