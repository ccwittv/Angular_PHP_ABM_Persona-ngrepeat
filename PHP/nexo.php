<?php 

include "clases/Personas.php";

if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    // $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $uploadPath = "../". DIRECTORY_SEPARATOR . 'fotos' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'answer' => 'Archivo Cargado!' );
    $json = json_encode( $answer );
    echo $json;
}

// $_GET['accion'];
if(isset($_GET['accion']))
{
	$accion=$_GET['accion'];	
	switch ($accion) {
		case 'traer':
			$respuesta= array();
			//$respuesta['listado']=Persona::TraerPersonasTest();
			$respuesta['listado']=Persona::TraerTodasLasPersonas();
			//var_dump(Persona::TraerTodasLasPersonas());
			$arrayJson = json_encode($respuesta);
			echo  $arrayJson;
			break;
		case 'traerUnaPersona':
			$respuesta= array();
			//$respuesta['listado']=Persona::TraerPersonasTest();
			$respuesta['persona']=Persona::TraerUnaPersona($_GET['id']);
			//var_dump(Persona::TraerTodasLasPersonas());
			$arrayJson = json_encode($respuesta);
			echo  $arrayJson;
		    break;
		default:
			# code...
			break;
	}	
}
else{
//var_dump($_REQUEST);


	/*esto es para cuando se configura el headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	POR EJEMPLO 
	$http.post("PHP/nexo.php",{accion :"borrar",persona:persona},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
 .then(function(respuesta) {       
         //aca se ejetuca si retorno sin errores        
         console.log(respuesta.data);

    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });
	*/
//Datos pasados por post
//	echo "<br>";
//	var_dump($_POST);





	
	/*
	esto es para cuando se pasan los datos por json
	por ejemplo
	$http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
 	  .then(function(respuesta) {     	
 		     //aca se ejetuca si retorno sin errores      	
      	 console.log(respuesta.data);

    },function errorCallback(response) {     		
     		//aca se ejecuta cuando hay errores
     		console.log( response);     			
 	  });*/

//
	$DatosPorPost = file_get_contents("php://input");
	$respuesta = json_decode($DatosPorPost);
	var_dump($respuesta);
    switch ($respuesta->datos->accion) {
    	case 'borrar': 		
    	    echo "voy a borrar";
    	    Persona::BorrarPersona($respuesta->datos->persona); 
    		break;
    	case 'insertar':
    	    echo "voy a guardar";
    	    Persona::InsertarPersona($respuesta->datos->persona);
    	    break;
    	case 'modificar':
    	    echo "voy a modificar";
    	    Persona::ModificarPersona($respuesta->datos->persona);
    	    break;    
    	default:
    		# code...
    		break;
    }

	//echo $respuesta->datos->persona->nombre;

	//Persona::InsertarPersona($respuesta->datos->persona);


}



 ?>