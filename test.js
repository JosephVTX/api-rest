var express = require("express");
var mysql = require("mysql");
var cors = require("cors");

var app = express();
app.use(express.json())
app.use(cors())

var conexion = mysql.createConnection({
    host: "129.151.102.69",
    port: "3000",
    user: "root",
    password: "",
    database: "susy_petshop"
});


conexion.connect(function (error) {
    if (error) {
        throw error;
    }
    else {
        console.log("Conexion Existosa.");
    }
})
app.get("/", function (req, res) {

    res.send("Ruta INICIO")
})

app.get("/api/cliente", (req, res) => {

    conexion.query("SELECT * FROM cliente", (error, filas) => {

        if (error) {
            throw error;
        }
        else {
            res.send(filas)
        }
    })
})

app.get("/api/producto", (req, res) => {

    conexion.query("SELECT * FROM producto", (error, filas) => {

        if (error) {
            throw error;
        }
        else {
            res.send(filas)
        }
    })
})

app.get("/api/producto", (req, res) => {

    conexion.query("SELECT * FROM producto", (error, filas) => {

        if (error) {
            throw error;
        }
        else {
            res.send(filas)
        }
    })
})

app.get("/api/detalle/:letter", (req, res) => {

    const letter = req.params.letter
    conexion.query(`SELECT * FROM detalle INNER JOIN cliente ON cliente.id = detalle.cliente_id INNER JOIN producto ON producto.id = detalle.producto_id WHERE cliente.nombre LIKE '${letter}%'`, (error, filas) => {

        if (error) {
            throw error;
        }
        else {
            res.send(filas)
        }
    })
})


const port = process.env.PORT || 3000;

app.listen(port, function () {

    console.log("Servidor Ok " + port);
})