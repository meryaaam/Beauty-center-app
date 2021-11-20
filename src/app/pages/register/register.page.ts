import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController , ToastController , LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  form: any = {} ;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  msg = '' ;

  constructor(
    private auth: AuthService ,
    private alertCtrl: AlertController ,
    private toast: ToastController , 
    private router: Router ,
    private loading : LoadingController ,
    ) { }

  ngOnInit() {
  }

  async onSubmit() {


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

  
    this.form.roles = ['ROLE_MODERATOR'] ;
     this.auth.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        toast.present();
        this.router.navigateByUrl('/login');
      },
      async err => {
        this.msg = err.error.message;

        const alert =  await this.alertCtrl.create({
          header: 'Error',
          message: this.msg,
          buttons: ['ok']
        });

        alert.present() ;

        this.isSignUpFailed = true;








      }
    );
  }
}


