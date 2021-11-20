import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { category } from 'src/app/models/category';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8034/api/image/product';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  currentP = null;
  message = '';
  category ;
  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;

  imageName: any;

    PID : number ;
    constructor(
    private db: ProductService,
    private route: ActivatedRoute,
    private router: Router ,
    public loadingController: LoadingController ,
    public toastController: ToastController ,
    private nav: NavController ,
    private httpClient: HttpClient , 
    private alert : AlertController
     ) {}



  ngOnInit() {
    this.message = '';
    this.getproduct(this.route.snapshot.paramMap.get('id'));
    
 

    this.category = category;
  }


 async getP(id) {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    await loading.present();

    await this.db.findProducts(id)
      .subscribe(
        data => {
          this.currentP = data;
          console.log(data);
          loading.dismiss();
        },
        error => {
          console.log(error);
          loading.dismiss();
        });
  }

 async updateProduct() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    const toast = await this.toastController.create({
      message: 'The product was updated successfully!',
      duration: 2000
    });
    await loading.present();

    await this.db.update(this.currentP.id, this.currentP)
      .subscribe(
        response => {
          console.log(response);
          loading.dismiss();
          toast.present();
        },
        error => {
          console.log(error);
          loading.dismiss();
        });
  }

 async deleteP() {
    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    const toast = await this.toastController.create({
      message: 'The product was deleted successfully!',
      duration: 2000
    });
    await loading.present();

    await this.db.delete(this.currentP.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['Products']);
          loading.dismiss();
          toast.present();
        },
        error => {
          console.log(error);
          loading.dismiss();
        });
  }


  getproduct(id){

    this.getImage(id);
    this.getP(id) ;
  
  }

  getImage(id) {
    // Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8034/api/image/' + id)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

 async onUpload() {
    console.log(this.selectedFile);

    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    const loading = await this.loadingController.create({
      message: 'Loading...'
    });
    const alert = await this.alert.create({
      message: 'Image uploaded successfully'
    });
    const alert2 = await this.alert.create({
      message: 'Image not uploaded successfully'
    });
 
     loading.present() ;
    this.httpClient.post(`${baseUrl}/`+ this.currentP.id , uploadImageData, { observe: 'response' } )
      .subscribe(
        response => {
        loading.dismiss() ;
        // alert.present() ;
       

        }, 
        error => {
          loading.dismiss();
          // alert2.present() ;
         
        });
  }




  public onFileChanged(event) {
    // Select File
    this.selectedFile = event.target.files[0];
  }



















}
