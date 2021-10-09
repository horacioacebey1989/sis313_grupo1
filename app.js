'use strict'
var express = require('express');
var bodyParser = require ('body-parser');
var app = express();

//CARGAR RUTAS
var usuario_route = require('./routes/usuario');
var tipo_usuario_route = require('./routes/tipo_usuario');

// MIDDLEWARES
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());

// RUTAS 
app.post('/prueba', (req, res) =>{
    console.log(req.body);
    res.status(200).send({
        message : 'Accion de prueba 2'
    })
});

app.get('/', (req, res) =>{
    res.status(200).send({
        message : 'API REST'
    })
});

app.use('/api', usuario_route);
app.use('/api', tipo_usuario_route);

// EXPORTACION
module.exports = app;