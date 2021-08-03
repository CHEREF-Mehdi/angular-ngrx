import { createAction, createReducer, on, props } from '@ngrx/store';
import { Product } from './../product';
import { IAppState } from './../../state/app.state';

export const productFeatureName = 'products';

export const productActions = {
  PRODUCTS_TOOGLE_PRODUCT_CODE: createAction('PRODUCTS_TOOGLE_PRODUCT_CODE'),
  PRODUCTS_SET_CURRENT_PRODUCT_ID: createAction(
    'PRODUCTS_SET_CURRENT_PRODUCT_ID',
    props<{ idProduct: number }>()
  ),
  PRODUCTS_CLEAR_CURRENT_PRODUCT: createAction(
    'PRODUCTS_CLEAR_CURRENT_PRODUCT'
  ),
  PRODUCTS_GET_PRODUCTS: createAction('PRODUCTS_GET_PRODUCTS'),
  PRODUCTS_SET_PRODUCTS: createAction(
    'PRODUCTS_SET_PRODUCTS',
    props<{ products: Product[] }>()
  ),
  PRODUCTS_DELETE_PRODUCT: createAction(
    'PRODUCT_DELETE_PRODUCT',
    props<{ productId: number }>()
  ),
  PRODUCTS_ADD_PRODUCT: createAction(
    'PRODUCTS_ADD_PRODUCT',
    props<{ product: Product }>()
  ),
  PRODUCTS_SET_PRODUCT: createAction(
    'PRODUCTS_SET_PRODUCT',
    props<{ product: Product }>()
  ),
  PRODUCTS_SET_ERROR: createAction(
    'PRODUCTS_SET_PRODUCT',
    props<{ error: string }>()
  ),
};

export interface IState extends IAppState {
  products: IProductState;
}

export interface IProductState {
  showProductCode: boolean;
  currentProductId: number;
  products: Product[];
  error: string;
}

const initState: IProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: null,
};

export const productReducer = createReducer(
  initState,
  on(productActions.PRODUCTS_TOOGLE_PRODUCT_CODE, (state) => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(productActions.PRODUCTS_SET_CURRENT_PRODUCT_ID, (state, { idProduct }) => {
    return {
      ...state,
      currentProductId: idProduct,
    };
  }),
  on(productActions.PRODUCTS_CLEAR_CURRENT_PRODUCT, (state) => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(productActions.PRODUCTS_SET_PRODUCTS, (state, { products }) => {
    return {
      ...state,
      products: products,
    };
  }),
  on(productActions.PRODUCTS_DELETE_PRODUCT, (state, { productId }) => {
    const foundIndex = state.products.findIndex(
      (item) => item.id === productId
    );
    if (foundIndex > -1) {
      const newProducts = [...state.products];
      newProducts.splice(foundIndex, 1);
      return {
        ...state,
        products: newProducts,
        currentProductId: null,
      };
    }
    return state;
  }),
  on(productActions.PRODUCTS_ADD_PRODUCT, (state, { product }) => {
    const newProducts = [...state.products, { ...product }];
    return {
      ...state,
      products: [...newProducts],
      currentProductId: product.id,
    };
  }),
  on(productActions.PRODUCTS_SET_PRODUCT, (state, { product }) => {
    const foundIndex = state.products.findIndex(
      (item) => item.id === product.id
    );
    if (foundIndex > -1) {
      const newProducts = [...state.products];
      newProducts[foundIndex] = { ...product };

      return {
        ...state,
        products: [...newProducts],
        error: null,
      };
    }
  }),
  on(productActions.PRODUCTS_SET_ERROR, (state, { error }) => {
    return {
      ...state,
      error,
    };
  })
);
