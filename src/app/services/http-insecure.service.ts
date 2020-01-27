import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInsecureService {
  constructor(public http: HttpClient) { }
  public get(endpoint): Observable<any> {
    // const params = new HttpParam()
    return this.http.get(environment.API_URL + endpoint);
  }
  public post(endpoint,payLoad): Observable<any> {
    return this.http.post(environment.API_URL + endpoint, payLoad);
  }
  public put(endpoint,payLoad): Observable<any> {
    return this.http.put(environment.API_URL + endpoint, payLoad);
  }
}
