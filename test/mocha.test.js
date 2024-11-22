const asserte = require('assert').strict;
const assert = require('chai').assert;
const delay = require("delay");
const path = require('path');
const should = require('chai').should();
const axios = require('axios');
const request = require('supertest');
const fs = require('fs');
const app = require('../src/server.js');
let ruta = path.join(__dirname, '../config/config.json');
let data_config = fs.readFileSync(ruta);
var config = JSON.parse(data_config);
const url_mail = config.url_mail;



describe('Testeando delay', () => {
  it('mi test', () => {
    // al aumentar el delay, se nota que el programa no termina la ejecucion hasta pasado los segundos ingresados en delay, ahora solo espera 1 seg y no se nota
    delay(1000);
    assert.ok(true);
  });
})

describe('Array', function () {
  describe('#indexOf()', function () {
    //Devuelve -1 al no encontrar el elemento, puede usarse para saber si hay que agregar o no un elemento a una cola por ejemplo
    it('deberia devolver -1 si no esta presente el elemento', function () {
      assert.strictEqual([1, 2, 3].indexOf(4), -1);
    });
  });
});

describe('double', () => {
  it('double done', function (done) {
    // Llamar 2 veces a la funcion `done()` produce un error
    setImmediate(done);
    // setImmediate(done);
  });
});

describe('get', () => {
  it('on post', function (done) {
    // Llamado a una API, si se necesita pasar un dato, como por ejemplo el pass en este caso, se lo hace con el .send()
    // El expect sirve para decirnos que es lo que se espera que nos devuelva la API, en este caso un json y que sea un 200
    // ademas necesita en el json si o si tener la propiedad Respuesta para que sea valido
    request(app)
      .post('/Datos')
      .send({ pass: "si" })
      .expect(200)
      .expect('Content-Type', "application/json; charset=utf-8")

      .end(function (err, res) {
        if (err) {
          done(err);
        } else {
          assert.property(JSON.parse(res.text), 'Respuesta', "El objeto de respuesta no contiene la propiedad Respuesta")
          console.log(res.text);
          done()
        }

      });
  });
});

describe('Numero Random', () => {
  it("Solo acepto numeros impares!!", function (done) {
    // Test de esperar un resultado especifico, en este caso solo acepta numeros impares, el numero viene de la funcion getNumber()
    // La cual esta en el archivo server.js, puede utilizarse para probar entradas diferentes a una funcion y esperar un tipo determinado de salida
    let num = app.getNumber();
    console.log(num);
    let result = ((num % 2) == 0);
    let esperado = true;
    assert.notStrictEqual(result, esperado, "El numero ingresado es par");
    done();
  });
});

describe('Dias de la semana', () => {
  it("Solo quiero los dias Pares", function (done) {
    // Test de tener un conjunto de salidas esperadas, la funcion dias() trae un dia random de la semana
    // Pero solo los esperados son validos 
    var gotExpectedError = false;
    try {
      let esperados = ["Martes", "Jueves", "Sabado"];
      let dia = app.dias();
      console.log(dia);
      let result = esperados.indexOf(dia);
      assert.notStrictEqual(result, -1);
      done();

    } catch (err) {
      gotExpectedError = true
      done(err)
    }

    if (!gotExpectedError) {
      throw new Error(`Expected an error and didn't get one!`)
    }

  });
});

describe('Token', () => {
  it("Devolvere el token si sos valido", function (done) {
    // Test que utiliza el middleware de WL, para verificar que sea un usuario valido el que intenta utilizar la API /getToken
    // El cual debe pasarse por parametro del headers, con la funcion .set("nombre_Atributo", "Valor_Atributo")
    request(app)
      .post('/getToken')
      .send({pass:"n3k0t"})
      .set('access-token', 'DBDCBGDICECKFKGHKBJBBBFFCIB')
      .end(function (err, res) {
        if (err) {
          done(err)
        } else {
          console.log(res.text)
          done()
        }
      })
  });
});

describe('Email', () => {
  it('Envie el mail de forma correcta', async function () {
    //*Utilizar un mail para probar que funcione la API en este ejemplo utilizo uno propio
    let email = 'f3d3x93@gmail.com';
    let mensaje = "Probando el funcionamiento de la API de EMAILS";
    let asunto = "Prueba de API";

    //*Contrato de la API especifica que debe contener las propiedades address (direccion emai), subject (asunto) y htmlBody(el cuerpo del mail)
    //*Puede contener attachments pero deben estar subidos en storage2, en este test no utilizaremos ningun attachment
    json = JSON.stringify({
      address: email,
      subject: asunto,
      htmlBody: mensaje,
    });

    await axios.post(url_mail, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (result) {
      console.log("Enviado ", result.data);
      if (result.data.error == null) {
        assert.ok(result.data);
      } else {
        assert.notOk(result.data.error);
      }
    });

  });
});

describe('Consultar data Json', () => {
  it("Le traje los datos", function () {
    //Test de utilizar una API para conseguir datos en un JSON 
     request(app)
     .post("/getData")
     .expect(200)
     .expect('Content-Type', "application/json; charset=utf-8")
     .end(function (err, res) {
       if(err){
         assert.notOk(err);
       }else{
         let datito = JSON.parse(res.text);
         assert.ok(res.text);
         console.log(datito);
         console.log(datito.data);
       }
     })
  });
});