import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastService } from 'app/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard {

  constructor(
    private router: Router,
    private toastService: ToastService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isAuthenticated = this.checkIfUserIsAuthenticated();

    if (isAuthenticated) {
      return true;
    } else {
      this.toastService.presentToast({ message: 'Usuario no autenticado', type: 'danger' });
      return this.router.createUrlTree(['/login']);
    }

  }

  private checkIfUserIsAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    console.log(token)
    return !!token;
  }

}
