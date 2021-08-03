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
          catchError((error) => {
            const errorMsg = this.handleError(error);
            return of(productActions.PRODUCTS_SET_ERROR({ error: errorMsg }));
          })
        )
      )
    )
  );

  private handleError(err: any): string {
    console.log({ err });
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      if (err.error.status) {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${err.error.status}: ${err.error.error}`;
      }else{
        errorMessage = `Backend ${err.statusText}`;
      }
    }
    return errorMessage;
  }
}
