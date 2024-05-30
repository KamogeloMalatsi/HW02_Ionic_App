import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  customers: any[] = [];

  constructor(private router: Router, private storageService: StorageService) {
    const storedCustomers = this.storageService.get('customers');
    if (storedCustomers) {
      this.customers = storedCustomers;
    }
  }

  register() {
    const customer = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      pastOrders: []
    };
    this.customers.push(customer);
    this.storageService.set('customers', this.customers);

    // Automatically log in the user and navigate to the home page
    this.storageService.set('customer', { name: customer.name, email: customer.email, phone: customer.phone });
    this.storageService.set('orders', customer.pastOrders);
    this.router.navigate(['/tabs/home']);
  }
}
