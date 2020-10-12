import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { StorageService } from '../../servicios/storage.service';
import { ScannerService } from '../../servicios/scanner.service';
import { ToastService } from '../../servicios/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string;
  urlsFoto: Array<any>;
  fotosCargadas: boolean = false;
  saldo: any;
  idUser: string;
  cont10:number = 0;
  cont50:number = 0;
  cont100:number = 0;

  constructor(
    private toast: ToastService,
    private scanner: ScannerService,
    private dataServ: StorageService,
    private router: Router,
    private Afauth: AuthService) {
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.idUser = this.Afauth.getCurrentUserId();
    this.email = this.Afauth.getCurrentUserMail();
    this.dataServ.getUsuarioByUid(this.idUser).subscribe(res => {
      console.log("res", res);
      this.saldo = res[0].saldo
    });
  }

  logOut() {
    this.Afauth.logOut();
  }

  scan() {
    console.log(this.email);
    this.scanner.scan()
      .then(barcodeData => {
        console.log('Barcode data', barcodeData);
        console.log('Barcode data text', barcodeData.text);
        console.log("this.saldo", this.saldo)

        // 8c95def646b6127282ed50454b73240300dccabc = 10
        // ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 = 50
        // 2786f4877b9091dcad7f35751bfcf5d5ea712b2f = 100

        switch (barcodeData.text) {

          case "8c95def646b6127282ed50454b73240300dccabc":
            if(this.email == "admin@admin.com")
            { 
              this.cont10 += 1;
              if(this.cont10 < 3 && this.saldo < 311)
              {
                this.acreditar(10)
              }
              else
              {
                this.toast.errorToast("Superaste tu límite de carga")
              }
                 
            }
            else
            {
              console.log("a acreditar 10")
              if (this.saldo == 0 || this.saldo == 50 || this.saldo == 100 || this.saldo == 150)
                this.acreditar(10)
              else
                this.toast.errorToast("Ya cargaste este código")
            }
            break;

          case "ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172 ":
            if(this.email == "admin@admin.com")
            { 

              this.cont50 += 1;
              if(this.cont50 < 3 && this.saldo < 271)
              {
                this.acreditar(50)
              }
              else
              {
                this.toast.errorToast("Superaste tu límite de carga ")
              }
 
            }
            else
            {
              console.log("a acreditar 50")
              if (this.saldo == 0 || this.saldo == 10 || this.saldo == 100 || this.saldo == 110)
                this.acreditar(50)
              else
                this.toast.errorToast("Ya cargaste este código")
            }
            break;

          case "2786f4877b9091dcad7f35751bfcf5d5ea712b2f":
            if(this.email == "admin@admin.com")
            {
              this.cont100 += 1;
              if(this.cont100 < 3 && this.saldo < 221)
              {
                this.acreditar(100)
              }
              else
              {
                this.toast.errorToast("Superaste tu límite de carga ")
              }
            }
            else
            {
              console.log("a acreditar 100")
              if (this.saldo == 0 || this.saldo == 10 || this.saldo == 50 || this.saldo == 60)
                this.acreditar(100)
              else
                this.toast.errorToast("Ya cargaste este código")
            }
            break;

          default:
            break;
        }


        // var split = barcodeData.text.split("@");
        // console.log(split);
      }).catch(err => {
        console.log('Error', err);
      });
  }

  acreditar(monto: number) {
    console.log('monto', monto);
    var montoFinal = this.saldo + monto;
    this.dataServ.updateDatabase(this.idUser, montoFinal)
      .then(res => { this.toast.confirmationToast(`Acreditaste $${monto} a tu cuenta`) })
      .catch(err => {
        console.log("err", err)
        this.toast.errorToast("Error al acreditar")
      })
  }

  limpiar() {
    this.cont10 = 0;
    this.cont50 = 0;
    this.cont100 = 0;
    this.dataServ.updateDatabase(this.idUser, 0)
      .then(res => { this.toast.confirmationToast("Saldo reiniciado") })
      .catch(err => {
        console.log("err", err)
        this.toast.errorToast("Error al limpiar")
      })
  }

}
