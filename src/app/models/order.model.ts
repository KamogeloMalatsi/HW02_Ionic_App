import { Product } from "./product.model";
import { Restaurant } from "./restaurant.model";

export interface Order {
        restaurant: Restaurant,
        products: Product[],
        grandTotal: number,
        totalItem: number,
        totalPrice: number,
        deliveryCharge: number,
        instruction?: string,
}