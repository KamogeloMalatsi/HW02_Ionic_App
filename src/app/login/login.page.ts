import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  customers = [
    {
      email: 'user1@gmail.com',
      password: 'password1',
      name: 'John Nolan',
      phone: '083 456 7890',
      pastOrders: [
        {
          restaurant: { id: '1', name: 'Mexican Fire House', type: 'Mexican', topDish: 'Burrito', ratings: 4.5, distance: 1.2, price: 15, imageUrl: 'assets/Burrito.jpeg' },
          products: [{ id: '1', name: 'Burrito', price: 15, quantity: 2 }],
          totalItem: 1,
          totalPrice: 30,
          deliveryCharge: 20,
          grandTotal: 50
        }
      ]
    },
    {
      email: 'user2@gmail.com',
      password: 'password2',
      name: 'Lucy Chen',
      phone: '073 374 4321',
      pastOrders: []
    },
    {
      email: 'user3@gmail.com',
      password: 'password3',
      name: 'Jessica Botha',
      phone: '083 473 9890',
      pastOrders: [
        {
          restaurant: { id: '1', name: 'Mexican Fire House', type: 'Mexican', topDish: 'Burrito', ratings: 4.5, distance: 1.2, price: 15, imageUrl: 'assets/Burrito.jpeg' },
          products: [{ id: '1', name: 'Burrito', price: 15, quantity: 3 }],
          totalItem: 1,
          totalPrice: 25,
          deliveryCharge: 20,
          grandTotal: 65
        }
      ]
    },
  ];

  constructor(private router: Router, private storageService: StorageService) {}

  login() {
    const customer = this.customers.find(c => c.email === this.email && c.password === this.password);
    if (customer) {
      this.storageService.set('customer', { name: customer.name, email: customer.email, phone: customer.phone });
      this.storageService.set('orders', customer.pastOrders);
      this.router.navigate(['/tabs/home']);
    } else {
      alert('Invalid credentials');
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
