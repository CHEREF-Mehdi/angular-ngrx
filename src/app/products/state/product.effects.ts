import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductService } from './../product.service';
import { productActions } from './product.reducer';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private ProductService: ProductService
  ) {}

  loadProductEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.PRODUCTS_GET_PRODUCTS),
      mergeMap(() =>
        this.ProductService.getProducts().pipe(
          map((products) => productActions.PRODUCTS_SET_PRODUCTS({ products })),
          catchError((error) =>
            of(productActions.PRODUCTS_SET_ERROR({ error }))
          )
        )
      )
    )
  );
}
