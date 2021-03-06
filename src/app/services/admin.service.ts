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

        resolve(res);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        localStorage.setItem('token', res.data.id);
        localStorage.setItem('userId', res.data.userId);
        this.router.navigateByUrl('/admin/Town')
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
        resolve(res.data);
        // this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        console.log(err);
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllExpenses() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/expenses').subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        resolve(res.data);
        // this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        console.log(err);
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllStreet() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/streets').subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        resolve(res.data);
        // this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        console.log(err);
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getStreetsByTownId(townId) {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/towns/' + townId + '/streets').subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        resolve(res.data);
        // this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        console.log(err);
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllParks() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/parks').subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        resolve(res.data);
        // this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        console.log(err);
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  checkPlotNumber(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/plots/isExist', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        resolve(res.data);
        if (!res.data.isExist) {
          this.toastr.success('Success!', 'Plot Number is Valid', this.toastserviceConfig);
        } else {
          // this.toastr.error('Error!', res.messagee);
        }
        console.log(res);
        // this.toastr.success('Success!', res.message, this.toastserviceConfig);
        // localStorage.setItem('token', res.data.id);
        // localStorage.setItem('userId', res.data.userId);
        // this.router.navigateByUrl('/admin/manager')
      }, err => {
        console.log(err);
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addLand(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/lands', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  // updateLand(payload) {
  //   return new Promise((resolve, reject) => {
  //     this.httpSecure.post('/lands', payload).subscribe(res => {
  //       // if (res.status.result === 'SUCCESS') {

  //       resolve(res.data);
  //       this.toastr.success('Success!', res.message, this.toastserviceConfig);
  //       // localStorage.setItem('token', res.data.id);
  //       // localStorage.setItem('userId', res.data.userId);
  //       // this.router.navigateByUrl('/admin/manager')
  //     }, err => {
  //       this.toastr.error('Error!', err.error.error.message);
  //       reject(err);

  //     });
  //   });
  // }
  addExpense(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/expenses', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  updateExpenseStatus(payload, expenseId) {
    return new Promise((resolve, reject) => {
      this.httpSecure.patch('/expenses/' + expenseId, payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  updatePhaseInTown(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.put('/towns', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  updateExpense(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.put('/expenses', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  addExpenseType(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/expense_types', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  getAllExpenseTypes() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/expense_types').subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        //
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
  getAllMeasurement() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/land_measuring_units').subscribe(res => {
        // if (res.status.result === 'SUCCESS') {
        //
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
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getLandLordById(landlordId) {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/landlords/' + landlordId).subscribe(res => {
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

        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  updateLandLord(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.put('/landlords', payload).subscribe(res => {
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
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  getAllPublicBuildings() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/public_buildings').subscribe(res => {
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addPark(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/parks', payload).subscribe(res => {

        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addPublicBuilding(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/public_buildings', payload).subscribe(res => {

        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addStreet(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/towns/' + payload.townId + '/streets', payload).subscribe(res => {

        resolve(res.data);
        this.toastr.success('Success!', res.message, this.toastserviceConfig);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);

      });
    });
  }
  addTown(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/towns', payload).subscribe(res => {

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
      this.httpSecure.get('/plot_categories').subscribe(res => {

        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  addPlotCategories(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/plot_categories', payload).subscribe(res => {

        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  deletePlotCategory(plotId) {
    return new Promise((resolve, reject) => {
      this.httpSecure.delete('/plot_categories/' + plotId).subscribe(res => {

        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      })
    });
  }
  addPlots(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/plots', payload).subscribe(res => {

        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  updatePlots(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.put('/plots', payload).subscribe(res => {

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

        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  getAllEmployees() {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/employees').subscribe(res => {

        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  getAllEmployeesByTownId(townId) {
    return new Promise((resolve, reject) => {
      this.httpSecure.get('/town/' + townId + '/employees').subscribe(res => {
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
  addEmployee(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/towns/' + payload.townId + '/employees', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  updateEmployee(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.put('/towns/' + payload.townId + '/employees', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  deleteEmployee(townId, employeeId) {
    return new Promise((resolve, reject) => {
      this.httpSecure.delete('/towns/' + townId + '/employees/' + employeeId).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  salePlot(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.put('/plots', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  resalePlot(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/plots/resale', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  updatePark(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.put('/parks', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  updatePublicBuilding(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.put('/public_buildings', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  updateStreet(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.put('/streets', payload).subscribe(res => {
        // if (res.status.result === 'SUCCESS') {

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
  submitPlotInstallment(payload) {
    return new Promise((resolve, reject) => {
      this.httpSecure.post('/plots/submitInstallment', payload).subscribe(res => {

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
      this.httpSecure.post('/lands/submitInstallment', payload).subscribe(res => {

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
      this.httpSecure.post('/plots/salePlot', payload).subscribe(res => {

        this.toastr.success('Success!', res.message, this.toastserviceConfig);
        resolve(res.data);
      }, err => {
        this.toastr.error('Error!', err.error.error.message);
        reject(err);
      });
    });
  }
}
