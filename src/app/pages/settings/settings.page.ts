import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { PswordPage } from '../psword/psword.page';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit  {
  @ViewChild('psword', {static: false, read: ElementRef})fab: ElementRef;

  user: any;
  role: any ;
  id : any ;

   constructor(
    public loadingController: LoadingController ,
    private modalCtrl: ModalController ,
    private token: TokenService ,
    private router: Router   ,
    private alertCtrl: AlertController , 
    private db: UserService ,) {}




  ngOnInit() {
    this.user = this.token.getUser();
    this.role = this.token.getUser().roles;
    this.id = this.token.getUser().id;
   

  }

  roles()
  { if  (this.role.includes('ROLE_ADMIN') ) { return true ; }}

   openCart() {

    this.router.navigate(['../ps'] ) ;
  }

  rolesMo()
  { if  (this.role.includes('ROLE_MODERATOR') ) { return true ; }}

  


async delete(id) {
  const loading = await this.loadingController.create({
    message: 'Loading...'
  });
  await loading.present();

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
          this.Delete(id) ;
      

        }
      }
    ]
  });
}

logout() {
this.token.signOut();


  }

  edite() { this.router.navigate(['/feed/profile']) ; } 

  managment() {this.router.navigate(['/admin']) ; }

  product() {this.router.navigate(['/product/list']) ; }

  async Delete(id)
  {
    id = this.user.id ;

    const loading = await this.alertCtrl.create({
      message: 'Loading...'
    });
    await loading.present();
  
    this.db.delete(id)
    .subscribe(
            response => {
              console.log(response);
              loading.dismiss();
           
              this.router.navigate[('/login')] ;
            },
            error => {
              console.log(error);
              loading.dismiss();
            });  }
  

}