'use strict'
var express = require('express');
var bodyParser = require ('body-parser');
var app = express();

var usuario_route = require('./routes/usuario');
var tipo_usuario_route = require('./routes/tipo_usuario');
var materia_particular_route = require('./routes/materia_particular');
var clase_route = require('./routes/clase');
var horario_clase_route = require('./routes/horario_clase');
var reserva_route = require('./routes/reserva');

var tipo_usuario_route = require('./routes/tipo_usuario');
// MIDDLEWARES
 app.use(bodyParser.urlencoded({extended:true}));
 app.use(bodyParser.json());

// RUTAS 
app.get('/', (req, res) =>{
    res.status(200).send({
        message : 'API REST'
    })
});

app.use('/api', usuario_route);
app.use('/api', reserva_route);
app.use('/api', tipo_usuario_route);
app.use('/api', materia_particular_route);
app.use('/api', clase_route);
app.use('/api', horario_clase_route);

// EXPORTACION
module.exports = app;