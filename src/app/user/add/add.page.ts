import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/Role';
import { LoadingController, ToastController, NavController, AlertController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';
import { formatDate } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  role ;
  
  form: any = {} ;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  msg = '' ;


  personne: any ;
  constructor(
    private auth: AuthService ,
    private alertCtrl: AlertController ,
    private toast: ToastController , 
    private router: Router ,
    private loading : LoadingController ,
   
  ) {   }



  ngOnInit() {
    this.role = Role ;
  }



  async onSubmit() {

    const alert2 =  await this.alertCtrl.create({
      
      message: 'User added',
      buttons: ['ok']
    });


    const loading = await this.loading.create({
   message: 'Loading...'
 });

    const toast = await this.toast.create({
     message: 'Your registration is successful!',
     duration: 2000
   });

   //  if (this.form.email.error.required) { this.msg = 'Email is required' ; }
   //  else {if (z) {}
   // }

    this.form.roles = ['ROLE_USER'] ;

    this.auth.register(this.form).subscribe(
     data => {
       console.log(data);
       this.isSuccessful = true;
       this.isSignUpFailed = false;
      //  toast.present();
      alert2.present() ;
   
     },
     async err => {
       this.msg = err.error.message;

       const alert =  await this.alertCtrl.create({
         header: 'Error',
         message: 'Error',
         buttons: ['ok']
       });

    
       alert.present() ;

       this.isSignUpFailed = true;








     }
   );
 }

}
