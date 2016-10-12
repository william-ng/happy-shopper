import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShoppingCartService } from '../shopping-cart.service';
import { CartItem } from '../cart-item';
@Component({
  selector: 'hs-cart-list',
  templateUrl: './cart-list.component.html',
  styles: []
})
export class CartListComponent implements OnInit {
  cart:CartItem[] = [];

  constructor(
    private shoppingCartService:ShoppingCartService,
    private router:Router
  ) { 
    this.cart = shoppingCartService.getCartItems();
  }

  onChangeQuantity(index, quantity) {
    this.shoppingCartService.updateCartItem(index, quantity);
  }

  onRemoveItem(index) {
    this.shoppingCartService.removeCartItem(index);
  }

  onSumbitOrder() {
    this.shoppingCartService.submitOrder();
    this.router.navigate(['cart', 'thank-you']);
  }

  ngOnInit() {
  }

}
