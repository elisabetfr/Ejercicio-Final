var express= require("express");
var app = express();

var comidas = require("./comidas.json");
var bebidas = require("./bebidas.json");


app.get("/comidas", function (req, res) {
	res.json(comidas);
});

app.get("/bebidas", function (req, res){

	res.json(bebidas);
});


app.listen(3000);