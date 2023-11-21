import { ToastService } from './toast.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  API = environment.authUrls;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private toastService: ToastService,
    private storageService: StorageService
  ) { }

  login(auth: any) {

    const isAuthenticated = this.checkIfUserIsAuthenticated();

    if (!isAuthenticated) {
      this.httpClient.post(`${this.API.login}`, auth).subscribe(
        {
          next: (response: any) => {
            console.log(response);
            this.setToken(response.token);
            this.router.navigate(['/home']).then(() => {
              this.toastService.presentToast({ message: 'Has iniciado session!', type: 'success' });
            });
          },
          error: (err) => {
            console.log(err.error.message);
            this.toastService.presentToast({ message: err.error.message, type: 'danger' })
          },
        }
      );
    } else {
      this.router.navigate(['/home']);
    }

  }

  register(user: Partial<User>) {
    this.httpClient.post<User>(`${this.API.register}`, user).subscribe(
      {
        next: (response: any) => {
          this.toastService.presentToast({ message: response.message, type: 'success' });
          this.router.navigate(['/'])
        },
        error: (error) => {
          console.log(error);
          this.toastService.presentToast({ message: error.message, type: 'danger' });
        }
      }
    );
  }

  logout() {
    this.httpClient.post(`${this.API.logout}`, {}).subscribe(
      {
        next: (response: any) => {
          this.storageService.removeToken();
          this.router.navigate(['/']).then(() => {
            this.toastService.presentToast({ message: 'Sesion cerrada!', type: 'success' });
          });
        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  setToken(token: string) {
    this.storageService.setToken(token);
  }

  private checkIfUserIsAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    console.log(token)
    return !!token;
  }

}
