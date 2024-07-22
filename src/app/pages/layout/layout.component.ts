import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, IonicModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  router = inject(Router);
  
  onLogoff(){
    localStorage.removeItem("userApp");
    this.router.navigateByUrl('/login');
  }
}
