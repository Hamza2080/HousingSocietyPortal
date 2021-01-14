import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-get-town',
  templateUrl: './get-town.component.html',
  styleUrls: ['./get-town.component.css']
})
export class GetTownComponent implements OnInit {



  public payload =  {
    name :  null ,
    description :  null ,
    owned_by :  null ,
    adminId :  null,
    developed_on: new Date()
 }
 town_name = null;
 phase_name;
 showPhase: boolean = false
 phaseData;


 isLoading: boolean = false


  data = []

  constructor(private relatedModal:NgbActiveModal, private toastr: ToastrService, private dataservice: DataService) { }

  ngOnInit() {
    console.log(this.data)
  }




  getTownData(){
    let obj = this.data.find(o => o.id === this.town_name);
    console.log(obj)
    if(typeof obj.phases != 'undefined' && obj.phases.length > 0){
      this.phaseData = obj.phases
    } else {
      this.toastr.error('Error!', "No Phasse Under Selected Town");
    }
    this.showPhase = true;
  }


  onSubmit(){
    if(typeof this.town_name == 'undefined'){
      this.town_name = null
    }
    if(typeof this.phase_name == 'undefined'){
      this.phase_name = null
    }
    this.dataservice.saveTwonId(this.town_name)
    this.dataservice.savePhaseName(this.phase_name)
    this.relatedModal.close(true);
  }

}
