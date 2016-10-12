import { Routes } from '@angular/router';

import { CartListComponent } from './cart-list/cart-list.component';
import { ThankYouComponent } from './thank-you.component';

export const SHOPPING_CART_ROUTES:Routes = [
    { path: '', component: CartListComponent },
    { path: 'thank-you', component: ThankYouComponent }
];