'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EstudianteSchema = Schema({
        visible : Boolean,
        id_usuario : {type : Schema.ObjectId, ref : 'Usuario'}
});

module.exports = mongoose.model('Estudiante', EstudianteSchema);