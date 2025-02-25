import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { AccesoService } from '../servicio/acceso.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  txt_email: string = '';
  txt_clave: string = '';

  constructor(
    public servicio: AccesoService,

    public navCtrl: NavController

  ) {}
  login() {
    if (this.txt_email == "" || this.txt_clave == "") {
      this.servicio.showToast("Llene todos los datos");
    } else {
      let datos = {
        "accion": "login",
        "email": this.txt_email,
        "clave": this.txt_clave
      }
      this.servicio.postData(datos).subscribe((res: any) => {
        if (res.estado == true) {
          this.servicio.showToast(res.mensaje);
          
          this.navCtrl.navigateRoot('inicio');
        } else {
          this.servicio.showToast(res.mensaje);
        }
      });
    }
    
  }

  registro() {
    this.navCtrl.navigateForward('registro');
   
  }

}

