import { RouterModule, Routes } from '@angular/router';

import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { PRODUCTS_ROUTES } from './products/products.routes';
import { SHOPPING_CART_ROUTES } from './shopping-cart/shopping-cart.routes';

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: 'products', component: ProductsComponent, children: PRODUCTS_ROUTES },
    { path: 'cart', component: ShoppingCartComponent, children: SHOPPING_CART_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);