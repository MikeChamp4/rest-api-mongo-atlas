const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('../services/jwt.service');

async function registerUser(req, res){

    const user = new User(req.body);

    const {email, password} = req.body;

    try {
        
        if(!email) throw ({message: 'El email es obligatorio'});
        if(!password) throw ({message: 'El password es obligatorio'});

        // Check if email is already registered //
        const foundEmail = await User.findOne({email});
        if(foundEmail) throw ({message: 'El email ya está registrado'});

        // Encrypt password //
        const salt = await bcryptjs.genSaltSync(10);
        user.password = await bcryptjs.hash(password, salt);
        user.save();

        res.status(200).send(user);

    } catch (error) {
        res.status(500).json(error);
    }
}

async function loginUser(req, res){
    const {email, password} = req.body;
    
    try {
        
        // Check if email is already registered //
        const user = await User.findOne({email});
        if(!user) throw ({message: 'Error en el email o contraseña'});

        // Check password //
        const passwordSuccess = await bcryptjs.compare(password, user.password);
        if(!passwordSuccess) throw ({message: 'Error en el email o contraseña'});


        res.status(200).send({token: jwt.createToken(user, "12h")});
    } catch (error) {
        res.status(500).json(error);
    }
}

function protected(req, res){
    res.status(200).send({message: 'Contenido del endpoint protegido'})
}

async function uploadAvatar(req, res){
    const params = req.params;

    if (!mongoose.Types.ObjectId.isValid(params.id)) {
        return res.status(400).send({ message: 'El ID proporcionado no es válido' });
    }

    try {
        const userData = await User.findById(params.id);

        if (!userData){
            res.status(404).send({message: 'No se ha encontrado ningún usuario'});
        } else {
            let user = userData;

            if(req.files){
                const filePath = req.files.avatar.path;
                const fileSplit = filePath.split('\\');
                let fileName = fileSplit[1];

                let extSplit = fileName.split('.');
                let fileExt = extSplit[1];
                
                if(fileExt !== 'png' && fileExt !== 'jpg' && fileExt !== 'jpeg'){
                    res.status(400).send({message: 'La extensión de la imagen no es válida. (Extensiones permitidas: .png, .jpg, .jpeg)'});
                } else {
                    user.avatar = fileName;
                    
                    const userResult = await User.findByIdAndUpdate({_id: params.id}, user);
                    if(!userResult){
                        res.status(404).send({message: 'No se ha encontrado ningún usuario'});
                    } else {
                        res.status(200).send({message: 'Avatar actualizado correctamente'});
                    }
                }
            }
        }
    } catch(err) {
        console.log(err);
        return res.status(500).send({message: 'Error del servidor'});
    }
}

function getAvatar ( req, res){
    const { avatarName } = req.params;
    const filePath = `./uploads/${avatarName}`;

    fs.stat(filePath, (err, stats) => {
        if(err){
            res.status(404).send({message: 'El avatar no existe'});
        } else {
            res.sendFile(path.resolve(filePath));
        }
    });
}

module.exports = {
    registerUser,
    loginUser,
    protected,
    uploadAvatar,
    getAvatar
}