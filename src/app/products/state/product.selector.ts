import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProductState, productFeatureName } from './product.reducer';
import { Product } from './../product';

const getProductFeatureState =
  createFeatureSelector<IProductState>(productFeatureName);

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId): Product =>
    currentProductId === 0
      ? {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0,
        }
      : state.products?.find((p) => p.id === currentProductId)
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);
