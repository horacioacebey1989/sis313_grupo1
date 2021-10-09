'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClaseSchema = Schema({
        limite : Number,
        costo_hora : Number,
        direccion : String,
        descripcion : String,
        visible : Boolean,
        id_usuario : {type : Schema.ObjectId, ref : 'Usuario'},
        id_materia_particular : {type : Schema.ObjectId, ref : 'Materia_Particular'}
});

module.exports = mongoose.model('Clase', ClaseSchema);