import { Injectable } from '@angular/core';
// import { HttpInsecureService } from './http-insecure.service';
import { ToastrService } from 'ngx-toastr';
import { HttpInsecureService } from './http-insecure.service';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  toastserviceConfig: object = {
    toastClass: 'ngx-toastr',
    timeOut: 7000,
    progressBar: true,
    positionClass: 'toast-top-right',
    closeButton: true
  };
  constructor(private httpInsecure: HttpInsecureService, private httpSecure: HttpService, private toastr: ToastrService, private router: Router) { }
  login(payload) {
    return new Promise((resolve, reject) => {
      this.httpInsecure.post('/Admins/login', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        console.log(res);
        resolve(res);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        localStorage.setItem('token', res.data.id);
        localStorage.setItem('userId', res.data.userId);
        this.router.navigateByUrl('/admin/manager')
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllManager() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/Admins/getAllUsers').subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        console.log(res);
        resolve(res.data.users);
        // this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllLand() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/lands').subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        console.log(res);
        resolve(res.data);
        // this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addLand(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/lands', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        console.log(res);
        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  updateLand(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.put('/lands', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        console.log(res);
        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addLandMeasurement(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/land_measuring_units', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        console.log(res);
        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllMeasurement() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/land_measuring_units').subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        console.log(res);
        resolve(res.data);
        // this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getLandLord() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/landlords').subscribe(res => {
        console.log(res);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addLandLord(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/landlords', payload).subscribe(res => {
        console.log(res);
        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllTowns() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/towns').subscribe(res => {
        console.log(res);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addTown(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/towns', payload).subscribe(res => {
        console.log(res);
        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllCustomers() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/Customers').subscribe(res => {
        console.log(res);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addCustomer(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/Customers', payload).subscribe(res => {
        console.log(res);
        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllAuthDealers() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/authorized_dealers').subscribe(res => {
        console.log(res);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addAuthDealers(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/authorized_dealers', payload).subscribe(res => {
        console.log(res);
        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllPaymentPlans() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/plot_payment_plans').subscribe(res => {
        console.log(res);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addPaymentPlans(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/plot_payment_plans', payload).subscribe(res => {
        console.log(res);
        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllPlotCategories() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/plotcategories').subscribe(res => {
        console.log(res);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  addPlotCategories(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/plotcategories',payload).subscribe(res => {
        console.log(res);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  addPlots(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/plots',payload).subscribe(res => {
        console.log(res);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  getAllPlots() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/plots').subscribe(res => {
        console.log(res);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  salePlot(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/plots/salePlot',payload).subscribe(res => {
        console.log(res);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  submitPlotInstallment(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/plots/submitInstallment',payload).subscribe(res => {
        console.log(res);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  submitLandInstallment(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/lands/submitInstallment',payload).subscribe(res => {
        console.log(res);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  submitLand(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/plots/salePlot',payload).subscribe(res => {
        console.log(res);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
}
