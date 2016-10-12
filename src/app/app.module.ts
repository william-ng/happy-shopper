import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

import { ProductsService } from './products/products.service';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ProductListComponent } from './products/product-list/product-list.component';
import { FilterComponent } from './products/product-list/filter.component';
import { ProductCardComponent } from './products/product-list/product-card.component';

import { routing } from './app.routing';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ThankYouComponent } from './shopping-cart/thank-you.component';
import { CartListComponent } from './shopping-cart/cart-list/cart-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ProductListComponent,
    FilterComponent,
    ProductCardComponent,
    ProductDetailComponent,
    ThankYouComponent,
    CartListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ProductsService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
