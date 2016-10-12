import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Product } from './product';

@Injectable()
export class ProductsService {
  private products:Product[] = [];
  private availableCategories:string[] = [];
  private activeFilter:any = {};

  public isReady:boolean = false;

  constructor(private http:Http) { 
    // setting up some dummy data
    this.onInit();
  }

  onInit() {
    this.http.get('https://happy-shopper.firebaseio.com/data.json').subscribe((data) => {
      //console.log(data.json());
      data.json().forEach((obj) => {
        this.products.push(
          new Product(obj.id, obj.name, obj.description, obj.imageSrc, obj.categories, obj.unitPrice, obj.inStock)
        );
      });

      let categories = [];
      for(let i=0; i<this.products.length; i++) {
        categories = this.merge(categories, this.products[i].categories);
      }
      this.availableCategories = categories;
      this.availableCategories.sort((a:string, b:string) => {
        if(a.toUpperCase() > b.toUpperCase()) return 1;
        if(a.toUpperCase() < b.toUpperCase()) return -1;
        return 0;
      });
      this.availableCategories.forEach((category) => { this.activeFilter[category] = true });
      this.isReady = true;
    });
  }

  getProductById(id) {
    return this.products.find((p) => p.id == id);
  }

  getProducts() {
    if(this.activeFilter === null) {
      return this.products;
    } else {
      return this.products.filter((product) => {
        for(let i=0; i<product.categories.length; i++) {
          if(this.activeFilter[product.categories[i]]) {
            return true;
          }
        }
        return false;
      });
    }
  }

  reduceProductQuantity(product:Product, quantity:number) {
    for(let i=0; i<this.products.length; i++) {
      if(this.products[i].id == product.id) {
        this.products[i].inStock = this.products[i].inStock - quantity;
        break;
      }
    }
    //this.products[this.products.indexOf(product)].inStock = this.products[this.products.indexOf(product)].inStock - quantity; 
  }

  getCategories() {
    return this.availableCategories;
  }

  setActiveFilter(activeFilter:any) {
    this.activeFilter = activeFilter;
  }

  getActiveFilter() {
    return this.activeFilter;
  }
  
  private merge(a, b) {
    let hash = {};
    return a.concat(b).filter(function (val) {
      return hash[val] ? 0 : hash[val] = 1;
    });
  }

}
