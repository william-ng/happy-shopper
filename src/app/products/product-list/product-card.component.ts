import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../product';
import { ShoppingCartService } from '../../shopping-cart/shopping-cart.service';
import { CartItem } from '../../shopping-cart/cart-item';

@Component({
  selector: 'hs-product-card',
  templateUrl: './product-card.component.html',
  styles: []
})
export class ProductCardComponent implements OnInit {
  @Input() product:Product;
  availableStock:number;
  cartItem:CartItem;

  constructor(
    private shoppingCartService:ShoppingCartService,
    private router:Router
  ) { }

  ngOnInit() {
    this.cartItem = this.shoppingCartService.findCartItemByProductId(this.product.id);
    this.availableStock = this.product.inStock - (this.cartItem ? this.cartItem.quantity : 0);
  }

  onAddToCart(event:Event) {
    event.stopPropagation();
    this.shoppingCartService.addItem(this.product, 1);
    if(!this.cartItem) {
      this.cartItem = this.shoppingCartService.findCartItemByProductId(this.product.id);
    }
    this.availableStock = this.product.inStock - (this.cartItem ? this.cartItem.quantity : 0);
  }

  onClick() {
    this.router.navigate(['/', 'products', this.product.id]);
  }
}
