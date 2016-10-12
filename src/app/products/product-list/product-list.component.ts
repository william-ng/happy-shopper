import { Component, OnInit } from '@angular/core';

import { Product } from '../product';
import { ProductsService } from '../products.service';

@Component({
  selector: 'hs-product-list',
  templateUrl: './product-list.component.html',
  styles: []
})
export class ProductListComponent implements OnInit {
  private intervalRef = null;
  products:Product[] = [];

  constructor(private productsService:ProductsService) { 
    //this.products = productsService.getProducts();
  }

  ngOnInit() {
    this.intervalRef = setInterval(()=>{
      if(this.productsService.isReady) {
        this.products = this.productsService.getProducts();
        clearInterval(this.intervalRef);
      }
    }, 500);
  }

  onChangedFilter() {
    this.products = this.productsService.getProducts();
  }
}
