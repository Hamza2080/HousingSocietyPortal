import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(public http: HttpClient) { }
  header: HttpHeaders = new HttpHeaders({'authorization': localStorage.getItem('token')});
  public get(endpoint): Observable<any> {
    return this.http.get(environment.API_URL + endpoint,{headers: this.header});
  }
  public post(endpoint,payLoad): Observable<any> {
    return this.http.post(environment.API_URL + endpoint, payLoad,{headers: this.header});
  }
  public put(endpoint,payLoad): Observable<any> {
    return this.http.put(environment.API_URL + endpoint, payLoad,{headers: this.header});
  }
}
