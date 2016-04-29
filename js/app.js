var app = angular.module('ABMangularPHP', ['ui.router', 'angularFileUpload']);
app.config(function($stateProvider,$urlRouterProvider) {
   $stateProvider
   .state('menu',
   {
    templateUrl:"templatemenu.html",
    URL:'/menu',
    controller:'controlMenu'
   }
   )
   .state('alta',
   {
    templateUrl:"templateusuario.html",
    URL:'/alta',
    controller:'controlAlta'
   }
   )
   .state('grilla',
   {
    templateUrl:"templategrilla.html",
    URL:'/grilla',
    controller:'controlGrilla'
   }
   )
   .state('modificar',
   {
    templateUrl:"templateusuario.html",
    //url:'/modificar/:id', /* de esta forma el id se visualiza en la barra de direcciones web*/
    url:'/modificar',
    params: { id: null}, /*de esta forma no se visualiza el id en la barra de direcciones web y es mas seguro*/
    controller:'controlModificar'
    /*controller: function($scope, $stateParams) {
                  $scope.DatoTest="**modificar**";

                  console.log($stateParams);
                //inicio las variables
                  $scope.persona={};
                  $scope.persona.nombre= "damian" ;
                  $scope.persona.dni= "666" ;
                  $scope.persona.apellido= "thorp" ;
                  $scope.persona.foto="sinfoto";
                  console.log($scope);
                  //console.log($http);
                }*/
   }
   )
   .state('guardevuelve',
       {
        templateUrl:"templategrilla.html",        
        //url:'/grilla/:id,:nombre,:apellido,:dni,:foto',
        url:'/guardevuelve',
        params: { id: null, nombre: null, apellido: null, dni: null, foto: null},
        controller:'controlGuardeVuelve'
       }
   )
   .state('borrar',
       {
        templateUrl:"templategrilla.html",        
        url:'/borrar/:id',
        controller:'controlBorrar'
       }
   )
   $urlRouterProvider.otherwise('/menu');
});

app.controller('controlBorrar', function($scope, $http, $stateParams) 
  {
    $scope.DatoTest="**borrar**";
    console.log("borrar"+$stateParams.id);
    $http.post("PHP/nexo.php",{datos:{accion :"borrar",persona:$stateParams.id}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
   .then(function(respuesta) {       
           //aca se ejetuca si retorno sin errores        
           console.log(respuesta.data);
           $http.get('PHP/nexo.php', { params: {accion :"traer"}})
          .then(function(respuesta) {       

           $scope.ListadoPersonas = respuesta.data.listado;
           console.log(respuesta.data);

          },function errorCallback(response) {
           $scope.ListadoPersonas= [];
            console.log( response);
          
            });

      },function errorCallback(response) {        
          //aca se ejecuta cuando hay errores
          console.log( response);           
      });  
  });

app.controller('controlGuardeVuelve', function($scope, $http, $stateParams) 
  {
      $scope.DatoTest="**GUARDE Y VUELVE**";
      console.log($scope);
      console.log($stateParams);
      console.log($http);
      
      function guardar(unapersona)
         {
            console.log("persona a guardar:");
            console.log($scope.persona);
            $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:unapersona}})
            .then(function(respuesta) {       
                 //aca se ejetuca si retorno sin errores        
                 console.log(respuesta.data);
                 $http.get('PHP/nexo.php', { params: {accion :"traer"}})
                    .then(function(respuesta) {       

                     $scope.ListadoPersonas = respuesta.data.listado;
                     console.log(respuesta.data);

                    },function errorCallback(response) {
                       $scope.ListadoPersonas= [];
                        console.log( response);      
                  });

            },function errorCallback(response) {        
                //aca se ejecuta cuando hay errores
                console.log( response);           
            });
         }

      function modificar(unapersona)
        {
          console.log("persona a modificar:");
          console.log($scope.persona);
          $http.post('PHP/nexo.php', { datos: {accion :"modificar",persona:unapersona}})
          .then(function(respuesta) {       
               //aca se ejetuca si retorno sin errores        
               console.log(respuesta.data);
               $http.get('PHP/nexo.php', { params: {accion :"traer"}})
                .then(function(respuesta) {       

                 $scope.ListadoPersonas = respuesta.data.listado;
                 console.log(respuesta.data);

                },function errorCallback(response) {
                   $scope.ListadoPersonas= [];
                    console.log( response);      
              });        

          },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
              console.log( response);           
          });
        }

      if ($stateParams.nombre == null || $stateParams.apellido == null  || $stateParams.dni == null)
        {
          alert("Nombre,apellido y dni NO DEBEN QUEDAR VACÍOS");
        }
      else if ($stateParams.id == null) 
        {
          var unapersona = $stateParams;
          guardar(unapersona);
        }
      else
        {
          var unapersona = $stateParams;
          modificar(unapersona);
        }

/*      $http.get('PHP/nexo.php', { params: {accion :"traer"}})
      .then(function(respuesta) {       

             $scope.ListadoPersonas = respuesta.data.listado;
             console.log(respuesta.data);

            },function errorCallback(response) {
               $scope.ListadoPersonas= [];
                console.log( response);      
          });        */

  });

app.controller('controlMenu', function($scope, $http) 
  {
      $scope.DatoTest="**Menu**";
  });

app.controller('controlAlta', function($scope, $http, FileUploader) 
 {
      $scope.DatoTest="**alta**";
      
      $scope.uploader = new FileUploader({url: 'PHP/nexo.php'});
      $scope.uploader.queueLimit = 10; // indico cuantos archivos permito cargar

    //inicio las variables
      $scope.persona={};
      /*$scope.persona.nombre= "natalia" ;
      $scope.persona.dni= "12312312" ;
      $scope.persona.apellido= "natalia" ;*/
      $scope.persona.foto="pordefecto.png";


      $scope.Guardar=function(){

        $scope.uploader.uploadAll();

      	console.log("persona a guardar:");
        console.log($scope.persona);
        $http.post('PHP/nexo.php', { datos: {accion :"insertar",persona:$scope.persona}})
     	  .then(function(respuesta) {     	
     		     //aca se ejetuca si retorno sin errores      	
          	 console.log(respuesta.data);

        },function errorCallback(response) {     		
         		//aca se ejecuta cuando hay errores
         		console.log( response);     			
     	  });

      }
 });

app.controller('controlModificar', function($scope, $http, $stateParams) 
 {
      $scope.DatoTest="**modificar**";

      /*console.log($scope);
      console.log($stateParams);
      console.log($http);*/

      $http.get('PHP/nexo.php', { params: {accion :"traerUnaPersona",id:$stateParams.id}})
            .then(function(respuesta) {       
             //$scope.ListadoPersonas = respuesta.data.listado;
             console.log(respuesta.data);
             //inicio las variables
             $scope.persona={};
             $scope.persona.nombre= respuesta.data.persona.nombre ;
             $scope.persona.dni= respuesta.data.persona.dni;
             $scope.persona.apellido= respuesta.data.persona.apellido ;
             $scope.persona.foto= respuesta.data.persona.foto;
             $scope.persona.id= respuesta.data.persona.id;
             console.log($scope); 

            },function errorCallback(response) {
             $scope.persona= [];
              console.log( response);
            
              });

      $scope.Guardar=function()
        {
          console.log("persona a modificar:");
          console.log($scope.persona);
          $http.post('PHP/nexo.php', { datos: {accion :"modificar",persona:$scope.persona}})
          .then(function(respuesta) {       
               //aca se ejetuca si retorno sin errores        
               console.log(respuesta.data);

          },function errorCallback(response) {        
              //aca se ejecuta cuando hay errores
              console.log( response);           
          });
        }
  
 });

app.controller('controlGrilla', function($scope, $http) 
  {
    	$scope.DatoTest="**grilla**";
   	
   	  $http.get('PHP/nexo.php', { params: {accion :"traer"}})
   	  .then(function(respuesta) 
       {     	

            	 $scope.ListadoPersonas = respuesta.data.listado;
            	 console.log(respuesta.data);

          },function errorCallback(response) {
           		 $scope.ListadoPersonas= [];
           		console.log( response);
           			/*

      					https://docs.angularjs.org/api/ng/service/$http

           			the response object has these properties:

      				data – {string|Object} – The response body transformed with the transform functions.
      				status – {number} – HTTP status code of the response.
      				headers – {function([headerName])} – Header getter function.
      				config – {Object} – The configuration object that was used to generate the request.
      				statusText – {string} – HTTP status text of the response.
      						A response status code between 200 and 299 is considered a success
      						 status and will result in the success callback being called. 
      						 Note that if the response is a redirect, XMLHttpRequest will 
      						 transparently follow it, meaning that 
      						 the error callback will not be called for such responses.
       	 */
   	  });

     	$scope.Borrar=function(persona)
       {
        		console.log("borrar"+persona);
            $http.post("PHP/nexo.php",{datos:{accion :"borrar",persona:persona}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then(function(respuesta) {       
                 //aca se ejetuca si retorno sin errores        
                 console.log(respuesta.data);
                 $http.get('PHP/nexo.php', { params: {accion :"traer"}})
                .then(function(respuesta) {       

                 $scope.ListadoPersonas = respuesta.data.listado;
                 console.log(respuesta.data);

                },function errorCallback(response) {
                 $scope.ListadoPersonas= [];
                  console.log( response);
                
                  });

            },function errorCallback(response) {        
                //aca se ejecuta cuando hay errores
                console.log( response);           
            });

        /*
             $http.post('PHP/nexo.php', 
              headers: 'Content-Type': 'application/x-www-form-urlencoded',
              params: {accion :"borrar",persona:persona})
            .then(function(respuesta) {       
                 //aca se ejetuca si retorno sin errores        
                 console.log(respuesta.data);

            },function errorCallback(response) {        
                //aca se ejecuta cuando hay errores
                console.log( response);           
            });

        */
     	}

   	/*$scope.Modificar=function(id){
   		
   		console.log("Modificar"+id);
   	}*/

  });
