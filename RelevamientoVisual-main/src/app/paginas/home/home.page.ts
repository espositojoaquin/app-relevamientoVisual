import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { FotoService } from '../../servicios/foto.service'
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fotoService: FotoService,
    public actionSheetController: ActionSheetController) {
  }

  ngOnInit(){
    
  }

  ionViewWillEnter() {
    this.email = this.authService.getCurrentUserMail();
  }

  OnLogOut() {
    this.authService.logOut();
  }

  elegirFoto(tipo: number) {
    this.fotoService.choosePhoto()
      .then(imageData => {
        if (imageData !== '' || imageData !== 'OK') {
          for (let i = 0; i < imageData.length; i++) {
            this.subirFoto(imageData[i], tipo);
          }
        } else {
          // this.toastService.errorToast('No eligió una foto.');
        }
      })
      .catch(error => {
        // this.toastService.errorToast('Error: No se han podido cargar las fotos. ' + error.message);
      });
  }

  tomarFoto(tipo: number) {
    this.fotoService.takePhoto()
      .then(imageData => {
        if (imageData !== 'No Image Selected') {
          this.subirFoto(imageData, tipo);
        } else {
          // this.toastService.errorToast('No tomó la foto.');
        }
      })
      .catch(error => {
        // this.toastService.errorToast('Error: No se ha podido cargar la foto. ' + error.message);
      });
  }

  subirFoto(imageData, tipo) {
    this.fotoService.uploadPhoto(imageData, tipo)
      .then(() => {
        // this.toastService.confirmationToast("Foto guardada")
      })
      .catch(err => {
        // this.toastService.errorToast('Error: No se ha podido guardar la foto. ' + err.message);
      })
    // const image: imagen = {

    //   image.esLinda = this.tipoLista == TipoLista.CosasLindas;
    //   image.uid = this.currentUserId;
    //   image.umail = this.authService.getCurrentUserMail();
    //   image.image = 'data:image/jpg;base64,' + imageData;
    //   image.votos = new Array();
    //   image.fecha = new Date().toLocaleString();
    // }

  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Galería',
          role: 'destructive',
          icon: 'aperture-outline',
          handler: () => {
            this.router.navigate(['/galeria']);
          }
        },
        {
          text: 'Desconectarse',
          role: 'destructive',
          icon: 'log-out',
          handler: () => {
            this.OnLogOut();
          },
        }
      ]
    });
    await actionSheet.present();
  }

}