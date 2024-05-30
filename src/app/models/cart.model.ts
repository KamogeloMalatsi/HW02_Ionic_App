import { Restaurant } from './restaurant.model';
import { Product } from './product.model';

export interface Cart {
  restaurant: Restaurant | null;
  dishes: Product[];
  totalItem: number;
  totalPrice: number;
  deliveryCharge: number;
  grandTotal: number;
}
