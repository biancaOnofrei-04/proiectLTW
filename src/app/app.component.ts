import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet ,RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { MainLibraryBookDataService } from './services/main-library-data-service.service';
import { PersonalBooksServiceService } from './services/personal-books-service.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, 
    RouterOutlet,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
  MatSidenavModule],
  providers: [MainLibraryBookDataService,PersonalBooksServiceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-library';
  showFiller=false;
}
