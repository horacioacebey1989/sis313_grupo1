'use strict'

var express = require('express');

var usuarioController = require('../controllers/usuarioController');

var api = express.Router();


api.post('/addUsuario', usuarioController.addUsuario);
api.get('/loginUsuario', usuarioController.loginUsuario);
api.get('/getUsuario', usuarioController.getUsuario);


module.exports = api;