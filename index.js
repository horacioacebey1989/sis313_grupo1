'use strict'

var moongose = require('mongoose');
var app = require('./app');
var port = 3800;

moongose.Promise = global.Promise;

moongose.connect('mongodb://localhost:27017/class_finder_database')
    .then(()=>{
        console.log('Se ha conectado a la base datos existosamente!');
        app.listen(port, ()=>{
            console.log('Servidor corriendo!');
        })
    })
    .catch( err => console.log(err));
