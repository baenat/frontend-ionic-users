import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';
import { ToastService } from 'app/services/toast.service';
import { User } from 'app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email = '';
  password = '';
  repeatPassword = '';

  constructor(
    private toastService: ToastService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    if (!this.email) return this.toastService.presentToast({ message: 'Email requerido', type: 'danger' });
    if (!this.password) return this.toastService.presentToast({ message: 'Password requerido', type: 'danger' });

    if (this.password !== this.repeatPassword) {
      return this.toastService.presentToast({ message: 'Las contraseñas no coinciden', type: 'danger' });
    }

    const user: User = {
      email: this.email,
      password: this.password
    }

    this.loginService.register(user);
  }

}
