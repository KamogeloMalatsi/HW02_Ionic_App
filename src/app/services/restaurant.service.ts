import { Injectable } from '@angular/core';
import { Observable, of, throwError  } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private restaurants: Restaurant[] = [
    {
      id: '1',
      name: 'Mexican Fire House',
      type: 'Mexican',
      topDish: 'Burrito',
      ratings: 4.5,
      distance: 1.2,
      price: 15,
      imageUrl: 'assets/Burrito.jpeg',
    },
    {
      id: '2',
      name: 'The Finest Asian Cuisine',
      type: 'Asian',
      topDish: 'Rice Bowl',
      ratings: 4.8,
      distance: 2.5,
      price: 25,
      imageUrl: 'assets/RiceBowl.jpeg'
    },
    {
      id: '3',
      name: 'Dessert Galore',
      type: 'American',
      topDish: 'Churro Bites',
      ratings: 4.2,
      distance: 3.1,
      price: 10,
      imageUrl: 'assets/ChurroBites.jpeg'
    },
    {
      id: '4',
      name: 'Aunt J Classics',
      type: 'African',
      topDish: 'Fat Cakes',
      ratings: 4.7,
      distance: 1.8,
      price: 20,
      imageUrl: 'assets/FatCakes.jpeg'
    }
  ];

  constructor() {}

  getRestaurants(): Observable<Restaurant[]> {
    return of(this.restaurants);
  }

  getRestaurantById(id: string): Observable<Restaurant> {
    const restaurant = this.restaurants.find(r => r.id === id);
    if (restaurant) {
      return of(restaurant);
    } else {
      return throwError(() => new Error(`Restaurant with id ${id} not found`));
    }
  }
}
