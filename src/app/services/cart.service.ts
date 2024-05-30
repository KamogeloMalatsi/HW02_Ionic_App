import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Restaurant } from '../models/restaurant.model';
import { Product } from '../models/product.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _cart = new BehaviorSubject<Cart>(this.initializeCart());

  get cart() {
    return this._cart.asObservable();
  }

  constructor(private storage: StorageService) {
    this.loadCart();
  }

  private initializeCart(): Cart {
    return {
      restaurant: null,
      dishes: [],
      totalItem: 0,
      totalPrice: 0,
      deliveryCharge: 20,
      grandTotal: 20
    };
  }

  loadCart() {
    const data = this.storage.get('cart');
    if (data) {
      const cart = JSON.parse(data);
      this._cart.next(cart);
    }
  }

  saveCart() {
    this.storage.set('cart', JSON.stringify(this._cart.value));
  }

  clearCart() {
    this.storage.remove('cart');
    this._cart.next(this.initializeCart());
  }

  addOrderToCart(restaurant: Restaurant, product: Product) {
    const cart = this.initializeCart();
    cart.restaurant = restaurant;
    cart.dishes.push(product);
    cart.totalItem = 1;
    cart.totalPrice = product.price;
    cart.grandTotal = cart.totalPrice + cart.deliveryCharge;
    this._cart.next(cart);
    this.saveCart();
  }

  updateItemQuantity(productId: string, quantity: number) {
    const cart = this._cart.value;
    const item = cart.dishes.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity;
      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.calculateTotals(cart);
        this._cart.next(cart);
        this.saveCart();
      }
    }
  }

  removeItem(productId: string) {
    const cart = this._cart.value;
    cart.dishes = cart.dishes.filter(item => item.id !== productId);
    this.calculateTotals(cart);
    this._cart.next(cart);
    this.saveCart();
  }

  calculateTotals(cart: Cart) {
    cart.totalPrice = cart.dishes.reduce((total, item) => total + item.price * item.quantity, 0);
    cart.totalItem = cart.dishes.reduce((total, item) => total + item.quantity, 0);
    cart.grandTotal = cart.totalPrice + cart.deliveryCharge;
  }

  makePayment() {
    let orders = this.storage.get('orders') || [];
    orders.push(this._cart.value);
    this.storage.set('orders', orders);
    this.clearCart();
  }
}
