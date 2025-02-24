<?php 
include('config.php');
header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Credentials:true');
header ('Access-Control-Allow-Methods: PUT,GET,POST,DELETE,OPTIONS');
header ('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token');
header ('ContentType:application/json; charset=utf-8');
$post= json_decode(file_get_contents("php://input"), true);
$respuesta="";

//cargar libros

if($post['accion'] == "insert_registro") {
   
    $verificarCorreo = sprintf("SELECT correo  FROM usuarios WHERE correo  = '%s'", 
                               $post['correo']);
    $resultadoVerificacion = mysqli_query($mysqli, $verificarCorreo);

    if(mysqli_num_rows($resultadoVerificacion) > 0) {
       
        $respuesta = json_encode(array('estado' => false, "mensaje" => "El correo ya esta registrado"));
    } else {
       
        $sentencia = sprintf("INSERT INTO usuarios (nombre, correo, clave) VALUES ('%s', '%s', '%s')",
           
            $post['nombre'], 
            $post['correo'],
            $post['clave'],
            
        );

        $result = mysqli_query($mysqli, $sentencia);

        if($result) {
            $respuesta = json_encode(array('estado' => true, "mensaje" => "Datos insertados correctamente"));
        } else {
            $respuesta = json_encode(array('estado' => false, "mensaje" => "Error al insertar datos"));
        }
    }
    
    echo $respuesta;
}
