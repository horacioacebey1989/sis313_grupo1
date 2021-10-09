'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClaseSchema = Schema({
        nombre : String,
        fecha_nacimiento : Date,
        contacto : String,
        username : String,
        password : String,
        visible : Boolean
});

module.exports = mongoose.model('Clase', ClaseSchema);