import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/services/admin.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-land-detail-view',
  templateUrl: './land-detail-view.component.html',
  styleUrls: ['./land-detail-view.component.css']
})
export class LandDetailViewComponent implements OnInit {

  @Input() private landInstance;

  constructor(public relatedModal: NgbActiveModal, private adminService: AdminService, private toastr: ToastrService) {
  }

  ngOnInit() {
    console.log(this.landInstance)
  }
}
