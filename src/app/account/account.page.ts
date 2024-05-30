import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { StorageService } from '../services/storage.service';
import { Order } from '../models/order.model';
import { HelpModalComponent } from './help-modal/help-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  customer: any = {
    name: '',
    email: '',
    phone: ''
  };
  pastOrders: Order[] = [];

  constructor(
    private cartService: CartService,
    private storageService: StorageService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCustomerDetails();
    this.loadPastOrders();
  }

  loadCustomerDetails() {
    const customer = this.storageService.get('customer');
    if (customer) {
      this.customer = customer;
    }
  }

  saveCustomerDetails() {
    this.storageService.set('customer', this.customer);
  }

  loadPastOrders() {
    const orders = this.storageService.get('orders');
    if (orders) {
      this.pastOrders = orders;
    }
  }

  async reorder(order: Order) {
    this.cartService.addOrderToCart(order.restaurant, order.products[0]);
    this.router.navigate(['tabs/cart']);
  }

  async openHelpModal() {
    const modal = await this.modalCtrl.create({
      component: HelpModalComponent,
      cssClass: 'help-modal'
    });
    await modal.present();
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
