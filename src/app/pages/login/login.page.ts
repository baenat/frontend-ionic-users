import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastController, ToastOptions } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
  password = '';


  constructor(
    private loginService: LoginService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {

  }

  login() {

    if (!this.email) return this.toastService.presentToast({ message: 'Email requerido', type: 'danger' });
    if (!this.password) return this.toastService.presentToast({ message: 'Password requerido', type: 'danger' });

    const auth = {
      email: this.email,
      password: this.password,
    }

    this.loginService.login(auth);
  }

}
