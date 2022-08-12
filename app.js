var express = require("express");
var mysql = require("mysql");
var cors = require("cors");

var app = express();
app.use(express.json())
app.use(cors())

var conexion = mysql.createConnection({
    host: "localhost",
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

app.get("/api/fiados", (req, res) => {

    conexion.query("SELECT * FROM fiados", (error, filas) => {

        if (error) {
            throw error;
        }
        else {
            res.send(filas)
        }
    })
})

app.get("/api/fiados/:id", (req, res) => {

    conexion.query("SELECT * FROM fiados WHERE id = ?", [req.params.id], (error, fila) => {

        if (error) {
            throw error;
        }
        else {
            res.json(fila)
        }
    })
})

app.post("/api/fiados/", (req, res) => {

    let { data } = req.body

    let sql = "INSERT INTO fiados SET ?";
    conexion.query(sql, data, function (error, results) {

        if (error) {
            throw error;
        }
        else {
            res.send(results)
        }
    })
})

app.put("/api/fiados/:id", (req, res) => {

    let id = req.params;
    const newElements = req.body;

    let sql = "UPDATE fiados SET ? WHERE id = ?";
    conexion.query(sql, newElements, id, (error, results) => {

        if (error) {
            throw error;
        }
        else {
            res.send(results)
        }
    })
})

app.delete("/api/fiados/:id", (req, res) => {

    conexion.query("DELETE FROM fiados WHERE id = ?", [req.params.id], function (error, filas) {

        if (error) {
            console.log("Error 500");
        }
        else {
            res.send(filas)
        }

    })
})

/* VER TABLA DETALLE_FIADO */

app.get("/api/detalle/", (req,res)=>{
    conexion.query("SELECT d.idDetalleFiado, u.nombre, p.producto FROM detalle_fiado d INNER JOIN usuario u ON d.usuario_idusuario = u.id INNER JOIN producto p ON d.Producto_idProducto = p.idProducto",(err,data) =>{
        if(err){
            console.log(err)
        }
        else{
            res.send(data);
        }
    })
})

const port = process.env.PORT || 3020;

app.listen(port, function () {

    console.log("Servidor Ok" + port);
})