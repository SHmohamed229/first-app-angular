import { Routes } from '@angular/router';
import { UsersListComponent } from './users/users-list/users-list.component';
import { SignalUnderstandComponent } from './signals/signal-undrstand/signal-understand.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersListComponent,
  },
  {
    path: 'signal',
    component: SignalUnderstandComponent,
  },
];
