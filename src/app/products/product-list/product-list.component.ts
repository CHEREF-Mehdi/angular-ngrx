import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Product } from '../product';
import { productActions, IProductState } from './../state/product.reducer';
import {
  getCurrentProduct,
  getShowProductCode,
  getProducts,
  getError,
} from './../state/product.selector';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<IProductState>) {}

  ngOnInit(): void {
    //retrieve products from the api
    this.store.dispatch(productActions.PRODUCTS_GET_PRODUCTS());

    //get message error
    this.errorMessage$= this.store.select(getError);
    //get current product form the store
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    //get producs from the store
    this.products$ = this.store.select(getProducts);
    // get displayed code boolean value
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(productActions.PRODUCTS_TOOGLE_PRODUCT_CODE());
  }

  newProduct(): void {
    this.store.dispatch(
      productActions.PRODUCTS_SET_CURRENT_PRODUCT_ID({ idProduct: 0 })
    );
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      productActions.PRODUCTS_SET_CURRENT_PRODUCT_ID({ idProduct: product.id })
    );
  }
}
