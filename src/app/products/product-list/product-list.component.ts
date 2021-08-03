import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Product } from './../product';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  pageTitle = 'Products';

  @Input() errorMessage: string;
  @Input() products: Product[];
  @Input() displayCode: boolean;
  @Input() selectedProduct: Product;

  @Output() checkChanged = new EventEmitter<boolean>();
  @Output() newProduct = new EventEmitter<void>();
  @Output() productSelected = new EventEmitter<Product>();

  displayCodeChange(): void {
    this.checkChanged.emit();
  }

  initNewProduct(): void {
    this.newProduct.emit();
  }

  productWasSelected(product: Product): void {
    this.productSelected.emit(product);
  }
}
