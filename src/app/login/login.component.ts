import { Component, OnInit } from '@angular/core';
import { LoginImp } from 'src/app/models/login';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public payLoad = new LoginImp();
  public username = null;
  public userPassword = null;
  public errorMessage = null;
  public isLoading = false;
  public loadingPromise: Promise<any>;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
  }
  onSubmit() {
    this.isLoading = true;
    this.adminService.login(this.payLoad).then(res => {
      console.log(res);
      this.isLoading = false;
    }).catch(err => {
      console.log(err);
      this.isLoading = false;
    })
  }
}
