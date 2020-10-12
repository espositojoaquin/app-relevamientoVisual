import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mail: string;
  pass: string;
  spiner:boolean = false;

  constructor(private authService: AuthService, public router: Router, public alertController: AlertController) { }

  usuarios: Array<any> = [
    { id: 0, nombre: "admin", correo: "admin@admin.com", clave: 111111 },
    { id: 1, nombre: "invitado", correo: "invitado@invitado.com", clave: 222222 },
    { id: 2, nombre: "usuario", correo: "usuario@usuario.com", clave: 333333 },
    { id: 3, nombre: "anonimo", correo: "anonimo@anonimo.com", clave: 444444 },
    { id: 4, nombre: "tester", correo: "tester@tester.com", clave: 555555 },
    { id: 5, nombre: "joaquin", correo: "espositojoaquin1998@gmail.com", clave:"rojorojo"}

  ]
  onChange(id) {
    console.log("llega");
    console.info(this.usuarios[id].correo);
    this.mail = this.usuarios[id].correo;
    this.pass = this.usuarios[id].clave;
  }

  ngOnInit() {
  }


  Entrar(){
    this.spiner = true;
    this.authService.login(this.mail, this.pass).then( res => {
      this.router.navigate(['/home']);
      this.spiner = false;
    }).catch(err => {this.presentAlert()
      this.spiner = false;
    } );
  }

  Limpiar(){
    this.pass = '';
    this.mail = '';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: 'Campos vacios o erroneos.',
      buttons: ['OK']
    });

    await alert.present();
  }

}
