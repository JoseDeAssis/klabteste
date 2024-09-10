import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpserviceModule} from "./modules/httpservice.module";
import { SharedModule } from "./shared/shared.module";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpserviceModule, SharedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
