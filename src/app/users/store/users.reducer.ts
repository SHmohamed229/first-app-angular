import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as UsersAction from './users.actions';
import { state } from '@angular/animations';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const usersReducer = createReducer(
  initialState,

  on(UsersAction.loadUsers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UsersAction.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
    loading: false,
  })),

  on(UsersAction.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(UsersAction.addUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UsersAction.addUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false,
  })),

  on(UsersAction.addUserFailure, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(UsersAction.updateUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UsersAction.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
    loading: false,
  })),

  on(UsersAction.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  on(UsersAction.deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UsersAction.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
    loading: false,
  })),

  on(UsersAction.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);
