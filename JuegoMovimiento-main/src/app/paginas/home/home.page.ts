import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service'
import { ModalController, ActionSheetController } from '@ionic/angular'
import { TableroComponent } from '../../componentes/tablero/tablero.component'
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public personaje = null;
  btnIniciar: HTMLButtonElement;

  constructor(
    public router: Router,
    public Afauth: AuthService,
    private modal: ModalController,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.btnIniciar = (document.getElementById('inicio-btn') as HTMLButtonElement);
  }

  OnLogOut() {
    this.Afauth.logOut();
  }

  elegir(tipo) {
    this.personaje = tipo;
    this.btnIniciar.disabled = false;
  }

  openGame() {
    this.modal.create({
      component: TableroComponent,
      componentProps: {
        heroe: this.personaje
      }
    }).then((modal) => {
      modal.present();
      this.personaje = null;
      this.btnIniciar.disabled = true;
    });
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        cssClass: 'gold',
        icon: 'log-out',
        handler: () => {
          this.OnLogOut();
        },
      },
      {
        text: 'Listado de  resultados Destacados',
        role: 'destructive',
        icon: 'list',
        handler: () => {
          this.router.navigate(['lista']);
        },
      }]
    });
    await actionSheet.present();
  }
}
