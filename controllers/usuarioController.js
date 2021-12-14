'use strict'

var usuario = require('../model/usuario');
var tipo_usuario = require('../model/tipo_usuario');
var jwt = require('../services/jwt');
var bcrypt = require('bcrypt-nodejs');

function addUsuario(req, res){
    var params = req.body;
    var usuarioNew = new usuario();
    
    if(params.nombre, params.fecha_nacimiento, params.contacto, params.username, params.password, params.id_tipo_usuario){
        
        usuarioNew.nombre = params.nombre;
        usuarioNew.fecha_nacimiento = params.fecha_nacimiento;
        usuarioNew.contacto = params.contacto;
        usuarioNew.username = params.username;
        usuarioNew.password = params.password;
        usuarioNew.visible = true;
        usuarioNew.id_tipo_usuario = params.id_tipo_usuario;

        tipo_usuario.findOne({"nombre": {$regex: 'Administrador', $options: 'i'}, visible: true}, (err, tipo_usuarioGet) => {
            if(err){
                return res.status(500).send({ message: 'Error en la peticion' });
            }
            if(tipo_usuarioGet._id.toString().localeCompare(usuarioNew.id_tipo_usuario) == 0){
                return res.status(500).send({ message: 'Error en la peticion' });
            }
            else {
                usuario.findOne({ visible: true, "username": { $regex: params.username, $options: 'i' } }, (err, usuarioGet) => {
                    if(err) {
                        return res.status(500).send({ message: 'Error en la peticion' });
                    }
                    if(usuarioGet) {
                        return res.status(500).send({
                            message : 'Objeto existente'
                        });
                    }else{
                        bcrypt.hash(usuarioNew.password,null,null,(err,hash)=>{
                            if(err) {
                                return res.status(500).send({message:'Error al guardar los datos'});
                            }
                            if(hash) {
                                usuarioNew.password = hash;
                                usuarioNew.save((err, usuarioGet) =>{
                                    if(err) return res.status(500).send({message:'Error al guardar los datos!'});
                                    if(usuarioGet){
                                        res.status(200).send({
                                            usuario: usuarioGet
                                        });
                                    }
                                    else {
                                        return res.status(500).send({ message: 'Error en la peticion' });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    else{
        res.status(404).send({ message : 'Introduzca los valores correctamente'});
    }
}

// LOGIN
// function loginUsuario(req, res){
//     var params = req.body;

//     usuario.findOne({username: params.username, visible: true}, (err, usuarioCheck)=>{
//         if(err) return res.status(500).send({message:'Error en la peticion'});
//         if(usuarioCheck){

//             bcrypt.compare(params.password,usuarioCheck.password,(err,result)=>{
//                 if(err) {
//                     return res.status(500).send({ message: 'Error en la peticion' });
//                 }
//                 if(!result){
//                     return res.status(500).send({ message: 'Invalid password' });
//                 }
//                 else{
//                     tipo_usuario.findById({_id: usuarioCheck.id_tipo_usuario, visible: true}, (err, tipo_usuarioGet) => {
//                         if(err) {
//                             return res.status(500).send({ message: 'Error en la peticion' });
//                         }
//                         if(tipo_usuarioGet) {
//                             usuarioCheck.tipo_usuario = tipo_usuarioGet;
//                             return res.status(200).send({
//                                 usuario : usuarioCheck,
//                                 token : jwt.createToken(usuarioCheck)
//                             })
//                         }
//                         else {
//                             return res.status(500).send({ message: 'Error en la peticion' });
//                         }
//                     });
//                 }
//             });
//         }
//         else{
//             return res.status(404).send({message: 'No ha encontrado el usuario!'})
//         }
//     });
// }

function loginUsuario(req, res){
    var params = req.body;

    usuario.findOne({username: params.username, visible: true}, (err, usuarioCheck)=>{
        if(err) return res.status(500).send({message:'Error en la peticion'});
        if(usuarioCheck){

            bcrypt.compare(params.password,usuarioCheck.password,(err,result)=>{
                if(err) {
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
                if(!result){
                    return res.status(500).send({ message: 'Invalid password' });
                }
                else{
                    tipo_usuario.findById({_id: usuarioCheck.id_tipo_usuario, visible: true}, (err, tipo_usuarioGet) => {
                        if(err) {
                            return res.status(500).send({ message: 'Error en la peticion' });
                        }
                        if(tipo_usuarioGet) {
                            var usuarioToShow = {
                                _id: usuarioCheck._id,
                                nombre: usuarioCheck.nombre,
                                fecha_nacimiento: usuarioCheck.fecha_nacimiento,
                                contacto: usuarioCheck.contacto,
                                username: usuarioCheck.username,
                                password: usuarioCheck.password,
                                tipo: tipo_usuarioGet.nombre
                            };
                            return res.status(200).send({
                                token : jwt.createToken(usuarioToShow)
                            })
                        }
                        else {
                            return res.status(500).send({ message: 'Error en la peticion' });
                        }
                    });
                }
            });
        }
        else{
            return res.status(404).send({message: 'No ha encontrado el usuario!'})
        }
    });
}

function getUsuarioByName(req, res) {
    var params = req.body;
    var usuarios = [];

    tipo_usuario.findOne({ nombre: "Administrador"},(err, adminGet) => {
        if(err){
            return res.status(500).send({message: 'Error en la peticion'});
        }
        if(adminGet){
            usuario.find({ nombre: new RegExp(params.nombre,'i'), visible: true }, (err, UsuariosGet) => {
                if(err) {
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
                if(UsuariosGet) {
                    UsuariosGet.forEach(usuario => {
                        if(usuario.id_tipo_usuario.localeCompare(adminGet._id) != 0){
                            usuarios.push(usuario);
                        }
                    });
                    res.status(200).send({
                        Usuarios : usuarios
                    });
                }
                else {
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
            });
        }
        else {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

function getUsuario(req, res) {
    var params = req.body;
    var idUsuario = params.id;

    usuario.findOne({_id: idUsuario, visible: true}, (err, UsuarioGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(UsuarioGet) {
            tipo_usuario.findById(UsuarioGet.id_tipo_usuario, (err, adminGet) => {
                if(err){
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
                if(adminGet){
                    return res.status(500).send({ message: 'Error en la peticion' });
                }else {
                    res.status(200).send({
                        Usuario : UsuarioGet
                    });
                }
            });
        }
        else {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

function getUsuario2(req, res) {
    var idUsuario = req.params.id;

    usuario.findOne({_id: idUsuario, visible: true}, (err, UsuarioGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(UsuarioGet) {
            tipo_usuario.findById(UsuarioGet.id_tipo_usuario, (err, adminGet) => {
                if(err){
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
                if(adminGet){
                    return res.status(500).send({ message: 'Error en la peticion' });
                }else {
                    res.status(200).send({
                        Usuario : UsuarioGet
                    });
                }
            });
        }
        else {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

/* GET MANY */
function getUsuarios(req, res) {
    var usuarios = [];

    tipo_usuario.findOne({ nombre: "Administrador"},(err, adminGet) => {
        if(err){
            return res.status(500).send({message: 'Error en la peticion'});
        }
        if(adminGet){
            usuario.find({ visible: true }, (err, UsuariosGet) => {
                if(err) {
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
                if(UsuariosGet) {
                    UsuariosGet.forEach(usuario => {
                        if(usuario.id_tipo_usuario.toString().localeCompare(adminGet._id) != 0){
                            usuarios.push(usuario);
                        }
                    });
                    res.status(200).send({
                        Usuarios : usuarios
                    });
                }
                else {
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
            });
        }
        else {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
    });
}

function updateUsuario(req, res) {
    var idUsuario = req.params.id;
    var update = req.body;

    delete update['visible'];

    if(update.password){
        bcrypt.hash(update.password,null,null,(err,hash)=>{
            if(err) {
                return res.status(500).send({message:'Error al guardar los datos'});
            }
            if(hash) {
                update.password = hash;
                usuario.findOneAndUpdate({_id: idUsuario, visible: true}, update, { new: true }, (err, UsuarioUpdate) => {
                    if(err) {
                        return res.status(500).send({ message: 'Error en la peticion' });
                    }
                    if(UsuarioUpdate) {
                        res.status(200).send({
                            Usuario: UsuarioUpdate
                        });
                    }
                    else {
                        return res.status(404).send({ message: 'No se pudo actualizar' });
                    }
                });
            }
        });
    }else{
        usuario.findOneAndUpdate({_id: idUsuario, visible: true}, update, { new: true }, (err, UsuarioUpdate) => {
            if(err) {
                return res.status(500).send({ message: 'Error en la peticion' });
            }
            if(UsuarioUpdate) {
                res.status(200).send({
                    Usuario: UsuarioUpdate
                });
            }
            else {
                return res.status(404).send({ message: 'No se pudo actualizar' });
            }
        });
    }
}

function deleteUsuario(req, res) {
    var idUsuario = req.params.id;
    var update;

    usuario.findById({_id: idUsuario, visible: true}, (err, UsuarioGet) => {
        if(err) {
            return res.status(500).send({ message: 'Error en la peticion' });
        }
        if(UsuarioGet) {
            update = UsuarioGet;
            update.visible = false;
            usuario.findByIdAndUpdate(idUsuario, update, { new: true }, (err, UsuarioUpdate) => {
                if(err) {
                    return res.status(500).send({ message: 'Error en la peticion' });
                }
                if(UsuarioUpdate) {
                    res.status(200).send({
                        Usuario: UsuarioUpdate
                    });
                }
                else {
                    return res.status(404).send({ message: 'No se pudo actualizar' });
                }
            });
        }
        else {
            return res.status(404).send({ message: 'Error en la peticion' });
        }
    });
}

module.exports = {
    addUsuario,
    loginUsuario,
    getUsuarioByName,
    getUsuario,
    getUsuario2,
    getUsuarios,
    updateUsuario,
    deleteUsuario
}

