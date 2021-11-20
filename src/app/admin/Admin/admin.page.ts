import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

    id: number ;
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

    slider1 =
    {
   vertical : true ,
    centredSlides: true
    };
    constructor(
      private db: ProductService ,
      private router: Router ,
      // private loadingController: LoadingController ,
      // public toastController: ToastController ,
      private token: TokenService ,

    ) { }


    ngOnInit() {

    }
    addu() {this.router.navigate(['user/add']); }

    addp() {this.router.navigate(['product/add']); }

  settings() { this.router.navigate(['/feed/settings']) ; }

    // upu() { this.router.navigate(['user/edit']) ; }

    p() { this.router.navigate(['product/list']) ; }

    u() { this.router.navigate(['user/list']) ; }

    logout() {
      this.token.signOut();
      // this.router.navigate(['/login']);
      window.location.reload();
    }



    delete()
    {

      this.db.deleteAll().subscribe( 
      response => {
        console.log(response);
        this.router.navigate(['/product/list'])
    
      },
      error => {
        console.log(error);
    
      });  }
    }
  


