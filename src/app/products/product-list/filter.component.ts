import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { ProductsService } from '../products.service';

@Component({
  selector: 'hs-filter',
  templateUrl: './filter.component.html',
  styles: []
})
export class FilterComponent implements OnInit {
  categories:string[] = [];
  activeFilter:any = {};
  private intervalRef;

  @Output() changedFilter:EventEmitter<any> = new EventEmitter();

  constructor(private productsService:ProductsService) { }

  ngOnInit() {
    this.intervalRef = setInterval(()=>{
      if(this.productsService.isReady) {
        this.categories = this.productsService.getCategories();
        //this.categories.forEach((category) => this.activeFilter[category] = true);
        this.activeFilter = this.productsService.getActiveFilter();
        clearInterval(this.intervalRef);
      }
    }, 500);
  }

  onToggle(index) {
    this.activeFilter[this.categories[index]] = !this.activeFilter[this.categories[index]];
    this.productsService.setActiveFilter(this.activeFilter);
    this.changedFilter.emit(null);
  }
}
