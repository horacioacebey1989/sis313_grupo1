'use strict'

var tipo_usuario = require('../model/tipo_usuario');

function addTipoUsuario(req, res){
    var params = req.body;
    var tipo_usuarioNew = new tipo_usuario();
    
    if(params.nombre){
        
        tipo_usuarioNew.nombre = params.nombre;
        tipo_usuarioNew.visible = true;

        tipo_usuario.findOne({ visible: true, "nombre": { $regex: params.nombre, $options: 'i' } }, (err, tipo_usuarioGet) => {
            if(err) {
                return res.status(500).send({ message: 'Error en la peticion' });
            }
            if(tipo_usuarioGet) {
                return res.status(500).send({
                    message : 'Objeto existente'
                });
            }else{
                tipo_usuarioNew.save((err, tipo_usuarioGet) =>{
                    if(err) return res.status(500).send({message:'Error al guardar los datos!'});
                    if(tipo_usuarioGet){
                        res.status(200).send({
                            tipo_usuario: tipo_usuarioGet
                        });
                    }
                });
            }
        });
    }
    else{
        return res.status(404).send({ message : 'Introduzca los valores correctamente'});
    }
}

function getTipoUsuario(req, res) {
    var params = req.body;
    var idTipoUsuario = params.id;

    tipo_usuario.findOne({_id: idTipoUsuario, visible: true, "nombre" : { $regex: /^((?!Administrador).)*$/, $options: 'gi' } }, (err, tipo_usuarioGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(tipo_usuarioGet) {
            res.status(200).send({
                tipo_usuario : tipo_usuarioGet
            });
        }else{
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

function getTipoUsuario2(req, res) {
    var idTipoUsuario = req.params.id;

    tipo_usuario.findOne({_id: idTipoUsuario, visible:true, "nombre" : { $regex: /^((?!Administrador).)*$/, $options: 'gi' } }, (err, tipo_usuarioGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(tipo_usuarioGet) {
            res.status(200).send({
                tipo_usuario : tipo_usuarioGet
            });
        }else{
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

/* GET MANY */
function getTiposUsuario(req, res) {
    tipo_usuario.find({ visible: true, "nombre" : { $regex: /^((?!Administrador).)*$/, $options: 'gi' } }, (err, tipos_usuarioGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(tipos_usuarioGet) {
            res.status(200).send({
                tipos_usuario : tipos_usuarioGet
            });
        }else{
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

function updateTipoUsuario(req, res) {
    var idTipoUsuario = req.params.id;
    var update = req.body;

    delete update['visible'];

    tipo_usuario.findOneAndUpdate({_id: idTipoUsuario, visible: true}, update, { new: true }, (err, tipo_usuarioUpdate) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(tipo_usuarioUpdate) {
            res.status(200).send({
                tipo_usuario: tipo_usuarioUpdate
            });
        }
        else {
            return res.status(404).send({ message: 'No se pudo actualizar' });
        }
    });

}

function deleteTipoUsuario(req, res) {
    var idTipoUsuario = req.params.id;
    var update = { visible: true };

    tipo_usuario.findOne({_id: idTipoUsuario, visible: true}, (err, tipo_usuarioGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion F' });
        }
        if(tipo_usuarioGet) {
            update.visible = false;

            tipo_usuario.findByIdAndUpdate(idTipoUsuario, update, { new: true }, (err, tipo_usuarioUpdate) => {
                if(err) {
                    return res.status(500).send({ message: 'Error en la peticion FFF' });
                }
                if(tipo_usuarioUpdate) {
                    res.status(200).send({
                        message: 'Eliminado exitosamente'
                    });
                }
                else {
                    return res.status(404).send({ message: 'No se pudo actualizar' });
                }
            });
        }else{
            return res.status(500).send({ message: 'Error en la peticion FF' });
        }
    }); 
}

module.exports = {
    addTipoUsuario,
    getTipoUsuario,
    getTipoUsuario2,
    getTiposUsuario,
    updateTipoUsuario,
    deleteTipoUsuario
}