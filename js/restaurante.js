$(document).ready(function(){

	//Menu.html
	//Captura todos los elementos y creacion de variables para capturar los botones(this) por su atributo
	var menuButtons= $("#menuButtons button");
	menuButtons.on("click", function(){
		var categoria= $(this).attr("id");
		var tipo= $(this).attr("data-type");
		pintarTarjetas(categoria, tipo);
	})


	var menuTarjetas=$("#menuTarjetas");
	var listaPedido = $("#listaPedido");
	var totalPrice = $("#precioTotal");


	//Creacion de funcion con parametros categoria y tipo
	function pintarTarjetas(categoria, tipo) {
		//Peticion web que muestra el json
		$.ajax({
   
		    url : 'http://localhost:3000/'+tipo,
		    type : 'GET',
		    dataType : 'json',
		    success : function(json) {
		        console.log(json);

		        //Limpia las tarjetas de platos de comida
		        $("#menuTarjetas").empty();

		        //Bucle que coge la longitud del json, 
		        //haciendo un if para comprobar si los datos de las categorias del json son iguales a los nombres que estan en las categorias
		        for(var i=0; i<json.length; i++){
		        	if(json[i].category.toLowerCase() == categoria) {
		        		
		        		//Crear variable y capturamos la tarjeta por su id (#hiddenCard),
		        		//y despues ponemos .clone para hacer un clone de esa tarjeta y almacenar en la variable tarjeta el contenido de la tarjeta 
		        		var tarjeta =$("#hiddenCard").clone();
		        		//Luego hacemos un removeAttr("hidden") para eliminar el atributo hidden, para así mostrar la tarjeta
		        		tarjeta.removeAttr("hidden");
		        		//Por ultimo, ponemos .find para buscar dentro del contenido de la tarjeta un elemento por la clase title 
		        		//y dentro de él, se le añade un texto que seria el nombre del plato
		        		tarjeta.find(".title").text(json[i].name);
		        		tarjeta.find(".precio").text(json[i].price +'€');
		        		tarjeta.find(".img-tarjeta").attr("src", json[i].image);
		        		tarjeta.find(".seleccionar").attr("data-name", json[i].name);
		        		tarjeta.find(".seleccionar").attr("data-price", json[i].price);
		        		//Añade la tarjeta al menu
		        		menuTarjetas.append(tarjeta);
		        	}
		        }

		        $(".seleccionar").on("click", function(){
					seleccionar($(this));
				});

		    },
		    error : function(xhr, status) {
		        alert('Disculpe, existió un problema');
		    },
		    complete : function(xhr, status) {
		        //alert('Petición realizada');
		    }
		});
	}

	function seleccionar(self){
		var button = self;
		var name = button.attr("data-name");
		var price = parseFloat(button.attr("data-price"));
		var input = button.parent().parent().find(".select-numero");
		var multiplicador = input.val();
		//Creo variable li con nombre del plato
		//Añado el elemento li a la lista (listaPedido)
		var li = $("<li class=\"list\" data-price='"+price+"' data-name='"+name+"'>"+name+" "+price+"€ * "+multiplicador+"</li>");
		//Capturamos la lista listaPedido y cogemos los li cuyo data-name se repitan
		var found = $("#listaPedido > li[data-name='"+name+"']");

		//If para comprobar si ya existe un li con el mismo nombre; si no existe lo añade en caso contrario, 
		//coger el multiplicador y el precio del texto del li. Luego calcula el nuevo precio haciendo la multiplicacion
		//Y por ultimo cambia tanto el texto y el atributo data-price de ese li con el valor obtenido
		if(found.length == 0){
			listaPedido.append(li);
		}else{

			var multi = parseInt(found.text().split("*")[1].trim());
			multi += parseInt(multiplicador);
			var precioAntiguo = found.text().split(name)[1].split("€")[0].trim()
			var nuevoPrecio = parseFloat((precioAntiguo*multi))
			found.attr("data-price", nuevoPrecio);
			found.text(name+" "+price+"€ * "+multi+"");
		}	
		

		//Capturar el precio y muestra la suma total en la listaPedido
		var total= parseFloat(totalPrice.text());
		total+=(multiplicador*price);
		totalPrice.text(total);

		input.val("1");
		//Capturar li y borrar el elemento li de la lista
        $(".list").on("click", function() {
			$(this).remove();

			//Calculo de la resta de quitar algun plato
			total-=$(this).attr("data-price");
			totalPrice.text(total);
		});
	}



});

