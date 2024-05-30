import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    const customer = this.storageService.get('customer');
    if (customer) {
      this.router.navigate(['tabs']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
