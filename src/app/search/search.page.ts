import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { CartService } from '../services/cart.service';
import { Restaurant } from '../models/restaurant.model';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchQuery: string = '';
  restaurants: Restaurant[] = [];
  filteredRestaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.restaurants = data;
      this.filteredRestaurants = data;
    });
  }

  searchRestaurants(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredRestaurants = this.restaurants.filter(restaurant =>
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.type.toLowerCase().includes(query) ||
      restaurant.topDish.toLowerCase().includes(query) ||
      restaurant.ratings.toString().includes(query) ||
      restaurant.distance.toString().includes(query) ||
      restaurant.price.toString().includes(query)
    );
  }

  selectRestaurant(restaurant: Restaurant) {
    const product: Product = { id: '1', name: restaurant.topDish, price: restaurant.price, quantity: 1 }; // Create a dummy dish
    this.cartService.addOrderToCart(restaurant, product);
    this.router.navigate(['tabs/cart']);
  }
}
