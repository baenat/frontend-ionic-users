import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions } from '@ionic/angular';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listUsers: any[] = [];
  isModalOpen = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loginService: LoginService
  ) { }

  goToUsersPage() {
    this.router.navigate(['/users']);
  }

  logout() {
    const optionsAlert: AlertOptions = {
      header: 'Cerrar Sesion',
      message: '¿Estas seguro?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.loginService.logout();
          }
        }
      ]
    }
    this.alertController.create(optionsAlert).then( data => data.present() );
  }

}
