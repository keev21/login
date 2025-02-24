import { Component, OnInit } from '@angular/core';
import { AccesoService } from '../servicio/acceso.service';


@Component({
  selector: 'app-registro',
  standalone: false, 
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  txt_cedula: string = '';
  txt_nombre: string = '';
  txt_apellido: string = '';
  txt_correo: string = '';
  txt_clave: string = '';
  txt_cclave: string = '';
  mensaje: string = "";

  constructor(
    public servicio: AccesoService
    

  ) { }

  ngOnInit() {
  }
  vclave(){
    if(this.txt_clave == this.txt_cclave){
      this.mensaje = "";
    }else{
      this.mensaje = "Las claves no coinciden";
    }

  }
  cancelar(){
    
  }
  registrar(){
    if(this.mensaje!=""){
      this.servicio.showToast("Las claves no coinciden");
    }
    else if(
    this.txt_nombre=="" ||
    this.txt_correo=="" ||
    this.txt_clave=="" ||
    this.txt_cclave=="" 

    ){
      this.servicio.showToast("Faltan datos");
    }
    else{
      let datos= 
      {
        "accion": "insert_registro",
        "nombre": this.txt_nombre,
        "correo": this.txt_correo,
        "clave": this.txt_clave
        
       
       
      }
      this.servicio.postData(datos).subscribe((res:any)=>{
        if(res.estado==true){
          
          this.servicio.showToast(res.mensaje);
         
        }
        else{
          this.servicio.showToast(res.mensaje);
        }
      });
      
    }
  }

}
