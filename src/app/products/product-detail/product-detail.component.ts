import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ProductsService } from '../products.service';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { Product } from '../product';
import { CartItem } from '../../shopping-cart/cart-item';

@Component({
  selector: 'hs-product-detail',
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnDestroy {
  private subscription:Subscription;
  product:Product = null;
  availableStock:number;
  cartItem: CartItem;

  constructor(
    private productsService:ProductsService,
    private shoppingCartService:ShoppingCartService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { 
    this.subscription = this.activatedRoute.params.subscribe(
      (params) => {
        if(params['id']) {
          this.product = this.productsService.getProductById(params['id']);
          this.cartItem = this.shoppingCartService.findCartItemByProductId(this.product.id);
          this.availableStock = this.product.inStock - (this.cartItem ? this.cartItem.quantity : 0);
        }
      }
    )
  }

  onAddToCart(quantity:number) {
    this.shoppingCartService.addItem(this.product, +quantity);
    this.router.navigate(['/', 'products']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
