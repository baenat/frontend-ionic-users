import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  API = environment.userUrls;

constructor(
  private httpClient: HttpClient
) { }

getUsers(){
  return this.httpClient.get(this.API.getUsers);
}

}
