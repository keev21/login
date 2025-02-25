import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  serve : string="http://localhost/wslogin/crud.php"
  

  constructor(
    public http: HttpClient,
    public toastCtrl: ToastController,
  ) 
  { 

  }
  postData(body:any){
    let head= new HttpHeaders({'Content-Type':'application/json, charset:utf8'});
    let options= {
      headers:head
    }
    return this.http.post(this.serve,JSON.stringify(body),options);

  }
  async showToast(mensaje:string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
