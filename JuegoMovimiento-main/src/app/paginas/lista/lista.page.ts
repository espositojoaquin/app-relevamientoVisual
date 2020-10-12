import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AuthService } from '../../servicios/auth.service';
import { StorageService } from '../../servicios/storage.service';
import { Usuario } from '../../clases/usuario'

@Component({
  selector: 'app-list',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
})
export class ListaPage implements OnInit {
  listado: Usuario[];

  constructor(public router: Router,
    public dataServ: StorageService,
    public Afauth: AuthService,
    public actionSheetController: ActionSheetController) { }

  ngOnInit() {
    this.dataServ.getUsuarios().subscribe(res => {
      console.log("res", res)
      this.listado = res.slice(0, 5);
    })
  }

  OnLogOut() {
    this.Afauth.logOut();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [{
        text: 'Desconectarse',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
          this.OnLogOut();
        },
      },
      {
        text: 'Inicio',
        role: 'destructive',
        icon: 'home',
        handler: () => {
          this.router.navigate(['home']);
        },
      }]
    });
    await actionSheet.present();
  }

}
