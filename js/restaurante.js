$(document).ready(function(){
	var menuTarjetas=$("#menuTarjetas");
	var entrantes= $("#entrantes");
	var platos= $("#platos");
	var carnes= $("#carnes");
	var pescados= $("#pescados");
	var postres= $("#postres");
	var bebidas= $("#bebidas");


	entrantes.on("click", function(){
		pintarTarjetas("Entrantes", "comidas");
	});

	pescados.on("click", function(){
		pintarTarjetas("Pescados", "comidas");
	});



	function pintarTarjetas(categoria, tipo) {
		$.ajax({
   
		    url : 'http://localhost:3000/'+tipo,
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		        console.log(json);

		        for(var i=0; i<json.length; i++){
		        	if(json[i].category == categoria) {
		        		var tarjeta = '<div class="tarjeta"> <div class="row full-width"> <div class="col-md-6 full-width"> <img class="img-tarjeta" src="images/bebida.jpg"> </div> <div class="col-md-6"> <div class="row full-width"> <span class="title">'+json[i].name+'</span> </div> <div class="row full-width price"> <div class="col-md-8"> <span class="precio">Precio '+json[i].price+'</span> </div> <div class="col-md-4"> <input type="number" class="select-numero" value="1"> </div> </div> </div> </div> </div>';
		        		menuTarjetas.append(tarjeta);
		        	}
		        }
		    },
		    error : function(xhr, status) {
		        alert('Disculpe, existió un problema');
		    },
		    complete : function(xhr, status) {
		        alert('Petición realizada');
		    }
		});
	}





});

