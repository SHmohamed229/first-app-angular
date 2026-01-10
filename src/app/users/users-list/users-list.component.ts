import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectUsers,
  selectLoading,
  selectError,
} from '../store/users.selectors';
import * as UsersAction from '../store/users.actions';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  users$ = this.store.select(selectUsers);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);
  userForm!: FormGroup;
  isEditMode = false;
  editingUserId: number | null = null;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('here user list');
    this.userForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  reloadUsers() {
    this.store.dispatch(UsersAction.loadUsers());
  }

  deleteUser(id: number) {
    this.store.dispatch(UsersAction.deleteUser({ id }));
  }

  // AddUsers() {
  //   const user = {
  //     id: Math.floor(Math.random() * 1000),
  //     name: 'Mohamed Shabaan',
  //     username: 'MShabaan',
  //     email: 'newuser@egabi.com',
  //   };
  //   this.store.dispatch(
  //     UsersAction.addUser({
  //       user,
  //     })
  //   );
  // }

  onAddUser() {
    if (this.userForm.invalid) return;

    const user = {
      ...this.userForm.getRawValue(),
      id: this.editingUserId,
    };

    if (this.isEditMode) {
      this.store.dispatch(
        UsersAction.updateUser({ user: this.userForm.value })
      );
    } else {
      this.store.dispatch(UsersAction.addUser({ user }));
    }

    this.resetForm();

    // if (this.userForm.valid) {
    //   const user = this.userForm.value;
    //   this.store.dispatch(UsersAction.addUser({ user }));
    //   this.userForm.reset();
    // }
  }

  editUser(user: User) {
    this.isEditMode = true;
    this.editingUserId = user.id;

    this.userForm.patchValue(user);
  }

  resetForm() {
    this.userForm.reset();
    this.isEditMode = false;
    this.editingUserId = null;
  }
}
