import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { ANIMALES } from '../../data/animales'
import { COLORES } from '../../data/colores'
import { NUMEROS } from '../../data/numeros'
import { Animal } from '../../modelos/animal';
import { Color } from '../../modelos/color';
import { Numero } from '../../modelos/numero';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  list: any[] = [];
  audio = new Audio();
  audioTiempo: any;
  idioma: number; // 0 : esp / 1 : ing / 2 : port

  animales: Animal[] = [];
  colores: Color[] = [];
  numeros: Numero[] = [];

  constructor(private Afauth: AuthService) { }

  ngOnInit() {
    this.animales = ANIMALES;
    this.colores = COLORES;
    this.numeros = NUMEROS;
    this.list = ANIMALES;
    this.idioma = 0;
  }

  logOut() {
     this.Afauth.logout();
  }

  reproducir(item: any) {

    console.info("item", item)

    this.pausarAudio(item);

    if (item.reproduciendo) {
      item.reproduciendo = false;
      return;
    }

    switch (this.idioma) {
      case 0:
        this.audio.src = item.es;
        break;
      case 1:
        this.audio.src = item.en;
        break;
      case 2:
        this.audio.src = item.pr;
        break;
    }

    this.audio.load();
    this.audio.play();

    item.reproduciendo = true;

    this.audioTiempo = setTimeout(() => item.reproduciendo = false, item.duracion * 1000);

  }

  private pausarAudio(item: any) {
    clearTimeout(this.audioTiempo);

    this.audio.pause();
    this.audio.currentTime = 0;

    for (let i of this.list) {
      if (i.nombre != item.nombre) {
        i.reproduciendo = false;
      }
    }
  }

  cambiarIdioma(idioma: number) {
    console.log("Entra con idioma: " + idioma);
    switch (idioma) {
      case 0:
        this.idioma = 0;
        console.log("Entró al idioma: " + idioma);
        break;
      case 1:
        this.idioma = 1;
        console.log("Entró al idioma: " + idioma);
        break;
      case 2:
        this.idioma = 2;
        console.log("Entró al idioma: " + idioma);
        break;
    }
  }

  cambiarTipo(tipo: number) {
    this.list = [];
    this.list.length = 0;
    switch (tipo) {
      case 0:
        this.list = this.colores;
        break;
      case 1:
        console.log("Entró a animales");
        this.list = this.animales;
        break;
      case 2:
        this.list = this.numeros;
        break;
    }

  }

}
