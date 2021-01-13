import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private relatedModal:NgbActiveModal, private toastr: ToastrService) { }

  ngOnInit() {
    console.log(this.data)
  }




  getTownData(){
    console.log('town_name',this.town_name)
    let obj = this.data.find(o => o.id === this.town_name);
    console.log(obj)
    if(obj.phases.length > 0){
      this.phaseData = obj.phases
      console.log('Working')
    } else {
      console.log('Else Condition Working')
      this.toastr.error('Error!', "No Phasse Under Selected Town");
    }
    this.showPhase = true;
  }


  onSubmit(){
    this.relatedModal.close(true);
  }

}
