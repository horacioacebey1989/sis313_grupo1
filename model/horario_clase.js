'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HorarioClaseSchema = Schema({
        dia : String,
        hora : String,
        visible : Boolean,
        id_clase : {type : Schema.ObjectId, ref : 'Clase'}
});

module.exports = mongoose.model('Horario_Clase', HorarioClaseSchema);