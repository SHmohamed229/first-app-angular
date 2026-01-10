import { props } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as UsersAction from './users.actions';
import { UsersService } from '../services/users.service';

@Injectable()
export class UsersEffects {
  loadUsers$ = createEffect(() =>
    // Effect logic will go here
    this.actions$.pipe(
      ofType(UsersAction.loadUsers),
      mergeMap(() =>
        // Logic to load users
        this.usersService.getAll().pipe(
          map((users) => UsersAction.loadUsersSuccess({ users })),
          catchError(() =>
            of(UsersAction.loadUsersFailure({ error: 'Failed to load users' }))
          )
        )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersAction.addUser),
      switchMap(({ user }) =>
        this.usersService.add(user).pipe(
          map((savedUser) => UsersAction.addUserSuccess({ user: savedUser })),
          catchError((error) => of(UsersAction.addUserFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersAction.updateUser),
      switchMap(({ user }) =>
        this.usersService.update(user).pipe(
          map((updatedUser) =>
            UsersAction.updateUserSuccess({ user: updatedUser })
          ),
          catchError((error) => of(UsersAction.updateUserFailure({ error })))
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersAction.deleteUser),
      switchMap(({ id }) =>
        this.usersService.delete(id).pipe(
          map(() => UsersAction.deleteUserSuccess({ id })),
          catchError((error) => of(UsersAction.deleteUserFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private usersService: UsersService
  ) {}
}
