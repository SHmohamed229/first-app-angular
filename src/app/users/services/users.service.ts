import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // private api = 'https://jsonplaceholder.typicode.com/users';
  private api = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.api);
  }

  add(user: any) {
    return this.http.post<any>(this.api, user);
  }

  update(user: any) {
    return this.http.put<any>(`${this.api}/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
