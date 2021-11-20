import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environement } from '../../models/environements';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage implements OnInit {
catTitle: string;
products: any ;


  constructor(
      private db: ProductService ,
      private activatedRoute: ActivatedRoute,
      private http: HttpClient,
      private photoViewer: PhotoViewer,
      private navCtrl: NavController,
      private toastCtrl: ToastController) { }

  ngOnInit() {
    this.catTitle = this.activatedRoute.snapshot.paramMap.get('catTitle');
    this.category(this.catTitle) ;
  }

async category(catTitle)
{ 
  await this.db.category(catTitle)
  .subscribe(
    data => {
      this.products = data;
      console.log(data);
      // loading.dismiss();

    },
    error => {
      console.log(error);
      // loading.dismiss();
    }); }




  // Voici la methode pour charger les product
  async P() {

    // const loading = await this.alert.create({
    //   message: 'Loading...'
    // });
    // const toast = await this.toast.create({
    //   message: 'click on Product Name',
    //   duration: 2000
    // });
    // await loading.present();

    await this.db.getAll()
        .subscribe(
          data => {
            this.products = data;
            console.log(data);
            // loading.dismiss();

          },
          error => {
            console.log(error);
            // loading.dismiss();
          });
    }
  // la methode pour implémenter le Pull Refresh
  doRefresh($event) {
   this.category(this.catTitle) ;
  }

  // Voici la methode pour visionner une image avec option de partage
  showImage(imgId: string, imgTitle: string, event) {
    event.stopPropagation();
    this.photoViewer.show(`http://192.168.8.101:3000/api/Containers/photos/download/${imgId}`,
    imgTitle, {share: true});
  }

  // Grace à cette methode, on se déplace sur la page 'product detail'.
  showDetails(id) {
    this.navCtrl.navigateForward('product/detail/' + id );
  }
    //  on affiche un message toast grace à cette methode
  async presentToast(message: string, duration: number) {
    const toast = await this.toastCtrl.create({
       message,
       duration
    });
    toast.present();
  }


}
