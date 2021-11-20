import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
// import { ImagesService } from 'src/app/services/images.service';
// import { HttpClient } from '@angular/common/http';
// import { ProductService } from 'src/app/services/product.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { CartService } from 'src/app/services/cart.service';
// import { LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

// Image: any ;


// ListImage: any [] = [];


// sliderConfig =
// {
// slidesPreview: 1.6 ,
// spaceBetween: 4 ,
// centredSlides: true
// };

P: any ;
// pro : any ;

constructor(  
  // // tslint:disable-next-line: align
  // private httpClient: HttpClient ,
  private db: ProductService,
  private route: ActivatedRoute,
  private router: Router ,
  // private cartService: CartService,
  public loadingController: LoadingController ,
  // public toastController: ToastController ,
  // private nav: NavController
   ) { }

ngOnInit() {
this.getP(this.route.snapshot.paramMap.get('id'));

}


openCart() {
// this.nav.navigateForward('/cart');
}

// methode pour ajouter un article au panier
// async addToCart(product) {  this.cartService.addProduct(product); }
// decreaseCartItem(product) {
// this.cartService.decreaseProduct(product);
// }


// onModelChange($event) {
// console.log('event', $event);
// }


// getproduct(id) {

// this.getP(id) ;


// }
// async getPro(id) {
//   const loading = await this.loadingController.create({
//     message: 'Loading...'
//   });
//   await loading.present();

//   await this.db.findProducts(id)
//     .subscribe(
//       data => {
//         this.pro = data;
//         console.log(data);
//         loading.dismiss();
//       },
//       error => {
//         console.log(error);
//         loading.dismiss();
//       });
// }
//------------------------ getPImages(id) {

// this.imageS.getPImages(id)
// .subscribe(
// (data: any[]) => {
// this.ListImage = data;
// },
// (error) => console.log(error)
// );
// }




// getImage(id) {


// this.imageS.getImage(id).subscribe(
// data=> {this.Image = data ; } ,
// error => {
// console.log(error); 
// });

// }




async getP(id) {
const loading = await this.loadingController.create({
message: 'Loading...'
});
await loading.present();

await this.db.findProducts(id)
.subscribe(
data => {
this.P = data;
console.log(data);
loading.dismiss();
},
error => {
console.log(error);
loading.dismiss();
});
}



// buy(){  this.nav.navigateForward('/cart');}


}
