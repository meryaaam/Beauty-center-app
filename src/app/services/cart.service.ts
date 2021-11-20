import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductOrders } from '../models/ProductOrders.model';
import { ProductOrder } from '../models/ProductOrder.model';
// import { Product } from '../models/product';
 
export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
  img: string ;
}
@Injectable({
  providedIn: 'root'
})

export class CartService {
  private ordersUrl = 'http://localhost:8034/api/orders';
  // data: Product[] = [
  //   { id: 1, name: 'Conceal & Define Concealer', price: 4.99, amount: 0 , img : '../../assets/mk/1.jpg'},
  //   { id: 2, name: 'No.7 Fantasy - Wispy Lashes', price: 3.99, amount: 0 , img : '../../assets/mk/2jpg'},
  //   { id: 3, name: 'Forever Flawless Allure', price: 11.99, amount: 0 , img : '../../assets/mk/3.jpg'},
  //   { id: 4, name: 'Colour Book Shadow Palette CB04', price: 16, amount: 0 , img : '../../assets/mk/4.jpg' }
  // ];
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
  private productOrder: ProductOrder;
  private orders: ProductOrders = new ProductOrders();
  private o :ProductOrder [] = [] ;
  private p : Product ;
  productOrders: ProductOrder[] = [];

  constructor(private http: HttpClient) {
  }

  saveOrder(data) {
    return this.http.post(this.ordersUrl, data);
}


  // getProducts() {
  //   return this.data;
  // }
 
  getCart() {
    return this.cart;
  }

  order()
  { let x= 0;
    for (let p of this.cart) {
      x = x +p.amount ;
      // tslint:disable-next-line: no-unused-expression
      // new Product() ;
      this.productOrders.push((new ProductOrder(p, x)) );
    
    }
    return this.productOrders;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
  

 
    let added = false;
    for (let p of this.cart) {

      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
  
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}
