const express = require('express')
const app = express();
const path = require('path');
const router = express.Router();
const middleware = require('../middleware/middleware.js');
const rutasProtegidas = middleware.rutasProtegidas;
const http = require('http').Server(app);
const fs = require('fs');
let ruta = path.join(__dirname, '../src/data.json');
const indexRouter = require('./datos.js');
const port = 14500;

app.use(
    express.urlencoded({
        extended: true,
        parameterLimit: 100000,
        limit: '50mb'
    })
);
app.use(express.json({ limit: '50mb' }));

// app.use('/Datos', indexRouter);

app.post('/Datos', function(req, res, next) {
    if(req.body.pass == "si"){
        res.send({Respuesta: 'Si, aca te devuelvo el resultado'});
    }else{
        res.sendStatus(200);
    }
  });


function getNumber() {
    let array = [1,2,3,4,5,6,7,8,9];
    let rnd = (Math.floor(Math.random()* 9));
    return array[rnd];
}

function dias() {
    let array = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
    let rnd = (Math.floor(Math.random()* 6));
    return array[rnd];
}

app.post("/getToken", rutasProtegidas, (req, res) => {
   
    let pass = req.body.pass;
    if (pass == "n3k0t") {
        generarToken("estoy en get ");
        res.send({ token: token });
    } else {
        res.send({ token: null });
    }
});

function generarToken(msg) {
    var rnd_abc1 = Math.trunc(Math.random() * 26);
    var rnd_abc2 = Math.trunc(Math.random() * 26);
    var rnd_num1 = Math.trunc(Math.random() * 9);
    var rnd_num2 = Math.trunc(Math.random() * 9);
    var abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    token = abc[rnd_abc1].toUpperCase() + abc[rnd_abc2] + num[rnd_num1] + num[rnd_num2];
    console.log(msg, token);
}

app.post('/getData' , function (req, res) {
   console.log("Estoy en getData");
   let data_config = fs.readFileSync(ruta);
   var data = JSON.parse(data_config);
   if(Object.keys(data).length > 0){
       res.send({message: "Consulta de datos exitosa", data: data});
   }else{
       res.send({message:"No hay datos para consultar", data: {}})
   }
});

  
module.exports = app;
module.exports.getNumber = getNumber; 
module.exports.dias = dias;