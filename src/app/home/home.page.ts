import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides } from '@ionic/angular';
import { RestaurantService } from '../services/restaurant.service';
import { CartService } from '../services/cart.service';
import { Restaurant } from '../models/restaurant.model';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  swiperModules = [IonicSlides];
  restaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
    });
  }

  selectRestaurant(restaurant: Restaurant) {
    const product: Product = { id: '1', name: restaurant.topDish, price: restaurant.price,quantity:1 };
    this.cartService.addOrderToCart(restaurant, product);
    this.router.navigate(['tabs/cart']);
  }
}
