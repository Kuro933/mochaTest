const express = require('express');
const rutasProtegidas = express.Router();
const weblogin = require('../config/weblogin');


rutasProtegidas.use(async (req, res, next) => {
    //middleware para utilizar las API
    let token = req.headers['access-token'];
    if (token) {
        let usuario = await weblogin.validarToken(token);
        // console.log(token);
        // console.log("usuario", usuario);
        if (usuario.perfil) {
            if (usuario.perfil == 3) {
                // var wl = usuario.datosPersonales.referenciaID;
                // var name = usuario.datosPersonales.razonSocial;
                // let buscar = await db.Usuarios.findAll({ attributes: ["weblogin", "nombre"], where: { webLogin: usuario.datosPersonales.referenciaID } });
                // var contenido = JSON.stringify(buscar, null, 2);
                // var user = JSON.parse(contenido);
                // if (Object.keys(user).length == 0) {
                //     await db.Usuarios.create({ webLogin: wl, nombre: name });
                // }
                req.usuario = usuario; //TODO:  considerar si es necesario, para mi no
                next();
            } else {
                res.send({ response: false, message: "Usuario no es admin" });
            }
        } else {
            res.send({ response: false, message: "No existe usuario o no tiene permisos para usar la aplicacion" });
        }
    } else {
        res.send({ response: false, message: "No provee un token valido" })
    }
});

module.exports.rutasProtegidas = rutasProtegidas;