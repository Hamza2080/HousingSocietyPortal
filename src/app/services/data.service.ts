import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private landLordId: string;
  private townId: string;
  private phase: string;
  private isTownSelected = new ReplaySubject<boolean>(1);
  public isTown = this.isTownSelected.asObservable();
  constructor(public http: HttpClient) {
    this.isTownSelected.next(false);
  }




  public saveTwonId(town_id) {
    this.townId = town_id;
    this.isTownSelected.next(true)
  }
  public savePhaseName(phase_name) {
    this.phase = phase_name;
  }


  public getTwonId() {
    return (this.townId)
  }
  public getPhaseName() {
    return (this.phase)
  }


  public saveLandLordId(landLordId): string {

    this.landLordId = landLordId;
    return(this.landLordId);
  }
  public getLandLordId(): string {
        return(this.landLordId);
  }



}
