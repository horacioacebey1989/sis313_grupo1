'use strict'

var express = require('express');

var usuarioController = require('../controllers/usuarioController');

var api = express.Router();


api.post('/addUsuario', usuarioController.addUsuario);
api.get('/loginUsuario', usuarioController.loginUsuario);
api.get('/getUsuario', usuarioController.getUsuario);
api.get('/getUsuario2/:id', usuarioController.getUsuario2);
api.get('/getUsuarios', usuarioController.getUsuarios);
api.get('/updateUsuario/:id', usuarioController.updateUsuario);
api.get('/deleteUsuario/:id', usuarioController.deleteUsuario);


module.exports = api;