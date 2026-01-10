import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { usersFeature } from './store/users.feature';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users.effects';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(usersFeature),
    EffectsModule.forFeature([UsersEffects]),
    CommonModule,
  ],
})
export class UsersModule {}
