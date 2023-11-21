import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    public toastController: ToastController
  ) { }

  presentToast(options: any) {

    const toastOptions: ToastOptions = {
      message: options?.message,
      color: options?.type,
      duration: 5000,
    }

    this.toastController.create(toastOptions).then(
      (data) => {
        data.present();
      }
    );
  }

}
