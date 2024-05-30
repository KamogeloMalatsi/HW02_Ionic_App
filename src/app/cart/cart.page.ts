import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cart: Cart = {
    restaurant: null,
    dishes: [],
    totalItem: 0,
    totalPrice: 0,
    deliveryCharge: 20,
    grandTotal: 20
  };
  deliveryInstructions: string = '';

  constructor(
    private cartService: CartService,
    private modalCtrl : ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.cartService.cart.subscribe(data => {
      this.cart = data;
    });
  }

  updateTotal() {
    this.cartService.calculateTotals(this.cart);
  }

  updateQuantity(productId: string, quantity: number) {
    this.cartService.updateItemQuantity(productId, quantity);
  }

  async makePayment() {
    const toast = await this.toastCtrl.create({
      message: 'Payment successful!',
      duration: 2000,
      position: 'top'
    });
    toast.present();

    this.cartService.makePayment();
  }

}
