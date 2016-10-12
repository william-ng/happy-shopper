import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'hs-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit() {
  }

}
