import { Product } from '../products/product';

export class CartItem {
    constructor(
        public product:Product,
        public quantity:number
    ){ }
}
