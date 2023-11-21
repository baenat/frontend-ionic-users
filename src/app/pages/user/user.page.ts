import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, AlertOptions, IonModal } from '@ionic/angular';
import { UserService } from 'app/services/user.service';
import { User } from '../../services/user.service';
import { ToastService } from 'app/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;

  listUsers: any[] = [];
  title = '';
  isRegister = true;

  id = 0;
  email = '';
  password = '';
  repeatPassword = ''

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      {
        next: (respoonse: any) => {
          this.listUsers = respoonse.users;
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  register() {
    this.isRegister = true;
    this.title = 'Registar';
    this.modal.present();
  }

  registerUser() {
    if (!this.email) return this.toastService.presentToast({ message: 'Email requerido', type: 'danger' });
    if (!this.password) return this.toastService.presentToast({ message: 'Password requerido', type: 'danger' });

    if (this.password !== this.repeatPassword) return this.toastService.presentToast({ message: 'Las contraseñas no coinciden', type: 'danger' });

    const user: User = {
      email: this.email,
      password: this.password
    }

    this.userService.addUser(user).subscribe(
      {
        next: (response: any) => {
          this.getUsers();
          this.toastService.presentToast({ message: response.message, type: 'success' });
        },
        error: (error) => {
          console.log(error);
          this.toastService.presentToast({ message: error.message, type: 'danger' });
        },
        complete: () => this.closeModal()
      }
    );
  }

  delete(user: User) {

    const optionsAlert: AlertOptions = {
      header: 'Eliminar Usuario',
      message: '¿Estas seguro?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar!!');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.confirmDelete(user);
          }
        }
      ]
    }
    this.alertController.create(optionsAlert).then(data => data.present());
  }

  confirmDelete(user: User) {
    this.userService.deleteUser(user).subscribe(
      {
        next: (response: any) => {
          this.getUsers();
          this.toastService.presentToast({ message: response.message, type: 'success' });
        },
        error: (error) => {
          console.log(error);
          this.toastService.presentToast({ message: error.message, type: 'danger' });
        }
      }
    );
  }

  update(user: User) {
    this.modal.present();
    this.title = 'Actualizar';
    this.isRegister = false;
    this.id = Number(user.id);
    this.email = user.email;
    this.password = user.password;
    this.repeatPassword = user.password;
  }

  updateUser() {
    if (this.password !== this.repeatPassword) return this.toastService.presentToast({ message: 'Las contraseñas no coinciden', type: 'danger' });

    const user: User = {
      id: this.id,
      email: this.email,
      password: this.password
    }
    this.userService.updateUser(user).subscribe(
      {
        next: (response: any) => {
          this.getUsers();
          this.toastService.presentToast({ message: response.message, type: 'success' });
        },
        error: (error) => {
          console.log(error);
          this.toastService.presentToast({ message: error.message, type: 'danger' });
        },
        complete: () => this.closeModal()
      }
    );
  }

  closeModal() {
    this.modal.dismiss(null, 'cancel').then(() => {
      this.title = 'Registrar';
      this.id = 0;
      this.email = '';
      this.password = '';
      this.repeatPassword = '';
    });
  }

}
