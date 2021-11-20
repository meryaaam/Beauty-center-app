import { Product, CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { ProductOrder } from 'src/app/models/ProductOrder.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(
  
    public toastController: ToastController ,
    private token: TokenService ,
    private router: Router ,
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
     ) { }
  cart: Product[] = [];
  isLoggedIn = true ;
  total: number ;
  isenabled = true ;
  order :ProductOrder []

  ngOnInit() {
    this.isLoggedIn = !!this.token.getToken();
    this.cart = this.cartService.getCart(); 
    this.order = this.cartService.order() ;
  }


  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }

  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
  getTotal() {
    return this.cart.reduce((i, j) => i + (j.price * j.amount), 0);
  }
  close() {
    
    this.modalCtrl.dismiss();
  }
  async checkout() {

    const toast = await this.toastController.create({
      message: ' Add product firt',
      duration: 2000
    });

    this.total =  this.getTotal() ;
    // Perfom PayPal or Stripe checkout process
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: '<strong>Congratulation!</strong> You successfully made the order.',
      buttons: ['OK']
    });
    if (this.total > 0 ) {
    this.cartService.saveOrder(this.order).subscribe();
    this.isenabled = true;
    alert.present().then(() => {
   this.modalCtrl.dismiss(); }
    );
  } else { 
    this.isenabled = false;
    toast.present();
   }
}

 pay() {
      
        this.cartService.saveOrder(this.cart).subscribe();
    }

  SingIn() {

   this.router.navigateByUrl('login');
   this.modalCtrl.dismiss();

  }
}


 // ngOnInit() {
  //   let items = this.cartService.getCart();
  //   let selected = {};
  //   for (let obj of items) {
  //     if (selected[obj.id]) {
  //       selected[obj.id].count++;
  //     } else {
  //       selected[obj.id] = {...obj, count: 1};
  //     }
  //   }
  //   this.selectedItems = Object.keys(selected).map(key => selected[key])
  //   this.total = this.selectedItems.reduce((a, b) => a + (b.count * b.price), 0);
  // }
