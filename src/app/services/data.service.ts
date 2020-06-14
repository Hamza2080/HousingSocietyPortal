import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private landLordId: string;
  constructor(public http: HttpClient) { }

  public saveLandLordId(landLordId): string {
    
    this.landLordId = landLordId;
    return(this.landLordId);
  }
  public getLandLordId(): string {
        return(this.landLordId);
  }
}
