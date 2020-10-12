import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { timer } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss', 'transition.min.css']
})
export class AppComponent {

  showSplash = true;
  divImg = "ld ld-vortex-in"
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(1000).subscribe(() => this.divImg = "ld ld-vortex-out")
      timer(2000).subscribe(() => this.divImg = "ld ld-vortex-in")
      timer(3000).subscribe(() => this.divImg = "ld ld-vortex-out")
      timer(4000).subscribe(() => this.divImg = "ld ld-vortex-in")
      timer(5000).subscribe(() => this.divImg = "ld ld-vortex-out")
      
      timer(6000).subscribe(() => this.showSplash = false)
      
    });
  }
}
