import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { UserComponent } from "./user/user.component";
import { DUMMY_USERS } from './dummy-users';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule,RouterOutlet, HeaderComponent, UserComponent]
})
export class AppComponent {
  title = 'first-app-angular';
  users=DUMMY_USERS
  name: string | null = null;
  // onSelectedUserId(id:string){
  //   console.log('id'+ id)
  //   console.log(name);
  // }
  onSelectedUserId(name: string) {
    this.name = name;
  }

}
