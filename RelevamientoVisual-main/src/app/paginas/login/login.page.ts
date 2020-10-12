import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  mail: string;
  pass: string;
  msjError: string;
  logeando=true;
  ocultarVerificar: boolean;

  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router, public alertController: AlertController) { }

  ngOnInit() {
    this.form = this.fb.group({
      mail: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  Entrar(){
    const { mail, clave } = this.form.value;

    this.authService.login(mail, clave).then( res => {
      this.router.navigate(['/home']);
    }).catch(err => this.presentAlert(err));
  }

  Limpiar(){
    this.form.setValue({
      mail: "",
      clave: ""
    });
  }

  async presentAlert(errores) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: errores,
      buttons: ['OK']
    });

    await alert.present();
  }

  Invitado() {
    this.form.setValue({
      mail: "admin@mail.com",
      clave: "adminmail"
    });
  }

  AutoLog(usuario) {
    switch (usuario) {
      case "admin" :
        this.form.setValue({
          mail: "admin@admin.com",
          clave: "111111"
        });
        break;
      case "invitado" :
        this.form.setValue({
          mail: "invitado@invitado.com",
          clave: "222222"
        });
        break;
      case "usuario" :
        this.form.setValue({
          mail: "usuario@usuario.com",
          clave: "333333"
        });
        break;
      case "anonimo" :
        this.form.setValue({
          mail: "anonimo@anonimo.com",
          clave: "444444"
        });
        break;
      case "tester" :
        this.form.setValue({
          mail: "tester@tester.com",
          clave: "555555"
        });
        break;
      
    }
  }
}
