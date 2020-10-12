import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  errorToast(message: string) {
    this.toastController.create({
      message: message,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
      color: 'danger',
      duration: 2000
    })
      .then(res => {
        res.present();
      });
  }

  confirmationToast(message: string) {
    this.toastController.create({
      message: message,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ],
      color: 'success',
      duration: 2000
    })
      .then(res => {
        res.present();
      });
  }
}
