import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HelpModalComponent } from './account/help-modal/help-modal.component';
import { StorageService } from './services/storage.service';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en-ZA';

registerLocaleData(localeEn, 'en-ZA');

@NgModule({
  declarations: [AppComponent, HelpModalComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'en-ZA' }, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
