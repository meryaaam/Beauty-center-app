import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ProductService } from '../../services/product.service';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  id : number ;
  products: any ;
  currentP = null ;
  i = -1 ;
  name = '' ;
  sliderConfig =
  {
  slidesPreview: 1.6 ,
  spaceBetween: 4 ,
  centredSlides: true
  };

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;


  slider1 =
  {
 vertical : true ,
  centredSlides: true
  };
  constructor(
    private httpClient: HttpClient ,
    private db: ProductService ,
    private router: Router   ,
    private alertCtrl: AlertController,
    public toastController: ToastController,
    private tokenStorage: TokenService ,

  ) { }


  ngOnInit() {

    // this. refreshList() ;
    // this.retrieveP();
    this.id = this.tokenStorage.getUser().id ;
    this.P() ;
    // this.findP() ;

  }


//  async retrieveP() {

//   const loading = await this.loadingController.create({
//     message: 'Loading...'
//   });
//   const toast = await this.toastController.create({
//     message: 'click on Product Name',
//     duration: 2000
//   });
//   await loading.present();

//   await this.db.getAll()
//       .subscribe(
//         data => {
//           this.products = data;
//           console.log(data);
//           loading.dismiss();
//           toast.present();
//         },
//         error => {
//           console.log(error);
//           loading.dismiss();
//         });
//   }

  // refreshList() {
  //   this.findP();
  //   this.currentP = null;
  //   this.i = -1;
  // }

  // setActiveTProduct(product, index) {
  //   this.currentP = product;
  //   this.i = index;
  // }


  // async removeAllProducts() {

  //   const toast = await this.toastController.create({
  //     message: 'All the products have been removed.',
  //     duration: 2000
  //   });
  //   const loading = await this.loadingController.create({
  //     message: 'Loading...'
  //   });
  //   await loading.present();
  //   await this.db.deleteAll()
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         loading.dismiss();
  //         toast.present();
  //         this.retrieveP();
  //       },
  //       error => {
  //         console.log(error);
  //         loading.dismiss();
  //       });
  // }


  // navigateToAdd() {
  //   this.router.navigate(['product/add']);
  // }


  // findP()
  // {  this.db.findProduct(this.id)
  //   .subscribe(
  //     data => {
  //       this.products = data;
  //       console.log(data);
  //     },
  //     error => {
  //       console.log(error);
  //     });
  //   }






add() { this.router.navigate(['/product/add']); }
edit(id) { this.router.navigate(['/product/edit/', id]); }

detail(id) { this.router.navigate(['/detail/', id]); }


async delete(id) {

  const toast = await this.toastController.create({
        message: 'This product has been removed.',
        duration: 2000
      });
  const alert = await this.alertCtrl.create({
    cssClass: 'my-custom-class',
    header: 'Confirm',
    message: 'Are you sure to delete this <strong>product</strong>!!!',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          alert.dismiss() ;

        }
      }, {
        text: 'Okay',
        handler: () => {
          console.log('Confirm Okay');
          this.DeleteP(id) ;
          toast.present();

        }
      }
    ]
  });

  await alert.present();
}

 async P() {

  const loading = await this.alertCtrl.create({
    message: 'Loading...'
  });
  const toast = await this.toastController.create({
    message: 'click on Product Name',
    duration: 2000
  });
  await loading.present();

  await this.db.getAll()
      .subscribe(
        data => {
          this.products = data;
          console.log(data);
          loading.dismiss();

        },
        error => {
          console.log(error);
          loading.dismiss();
        });
  }





  async DeleteP(id)
{
  const toast = await this.toastController.create({
    message: 'delte',
    duration: 2000
  });
  const loading = await this.alertCtrl.create({
    message: 'Loading...'
  });
  await loading.present();

  this.db.delete(id)
  .subscribe(
          response => {
            console.log(response);
            loading.dismiss();
            toast.present();
            this.P();
          },
          error => {
            console.log(error);
            loading.dismiss();
          });  }




          getImage(id) {
            // Make a call to Sprinf Boot to get the Image Bytes.

            this.httpClient.get('http://localhost:8034/image/' + id)
              .subscribe(
                res => {
                  this.retrieveResonse = res;
                  this.base64Data = this.retrieveResonse.picByte;
                  this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
                }
              );
          }

// image() {

//   for (let i = 0; i < this.products.length; i++) {
//     this.upload(i, this.selectedFiles[i]);
//   }


}
