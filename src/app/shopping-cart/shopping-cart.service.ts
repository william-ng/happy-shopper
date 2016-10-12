import { Injectable } from '@angular/core';

import { CartItem } from './cart-item';
import { Product } from '../products/product';
import { ProductsService } from '../products/products.service';

@Injectable()
export class ShoppingCartService {
  private cart:CartItem[] = [];

  constructor(private productsService:ProductsService) {
    if(localStorage) {
      if(localStorage.hasOwnProperty('cart')) {
        this.loadCart();
      }
    }
   }

  addItem(product:Product, quantity:number) {
    // check if product already in cart, if so update quantity
    let index = this.cart.findIndex((item) => item.product.id == product.id);
    if(index == -1) {
      this.cart.push(new CartItem(product, quantity));
    } else {
      this.updateCartItem(index, this.cart[index].quantity + quantity);
    }
    
    this.saveCart();
  }
  
  removeCartItem(index:number) {
    this.cart.splice(index, 1);

    this.saveCart();
  }

  updateCartItem(index:number, quantity:number) {
    this.cart[index].quantity = quantity;

    this.saveCart();
  }

  getCartItems() {
    return this.cart;
  }

  findCartItemByProductId(id:number) {
    let index = this.cart.findIndex((item) => item.product.id == id);
    if(index != -1) {
      return this.cart[index];
    } else {
      return null;
    }
  }

  getSubTotal() {
    return this.cart.reduce(function(total:number, item:CartItem) {
      return total + (item.product.unitPrice * item.quantity);
    }, 0);
  }

  clearCart() {
    this.cart = [];

    if(localStorage) {
      localStorage.removeItem('cart');
    }
  }

  saveCart() {
    if(localStorage) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  loadCart() {
    if(localStorage) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
  }

  submitOrder() {
    for(let i=0; i<this.cart.length; i++) {
      this.productsService.reduceProductQuantity(this.cart[i].product, this.cart[i].quantity);
    }
    this.clearCart();
  }
}
