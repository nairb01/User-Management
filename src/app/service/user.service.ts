import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createUser(user: any): Observable<any> {
    // Check if user creation should happen via HTTP or local storage
    if (this.baseUrl) {
      // HTTP request
      return this.http.post(`${this.baseUrl}/users`, user);
    } else {
      // Local storage operation (assuming 'users' holds all users)
      const storedUsers = localStorage.getItem('users');
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  
      if (!storedUsers) {
        throw new Error('No users found in database');
      }
  
      const parsedUsers = JSON.parse(storedUsers);
      const isAdmin = loggedInUser.role === 'Admin';
  
      if (!isAdmin) {
        throw new Error('Only admin users can create new users');
      }
  
      // Generate a unique userId for the new user
      const userId = parsedUsers.users.length + 1;
      const newUser = {
        userId,
        ...user
      };
  
      // Push the new user to the list of users
      parsedUsers.users.push(newUser);
  
      // Update the local storage with the updated users array
      localStorage.setItem('users', JSON.stringify(parsedUsers));
  
      return of(newUser); // Return observable of the newly created user
    }
  }

  updateUserProfilePic(profilePicUpdate: any): Observable<any> {
    // Check if updating profile picture should happen via HTTP or local storage
    if (this.baseUrl) {
      // HTTP request
      const storedUser = localStorage.getItem('userApp');
      if (!storedUser) {
        throw new Error('No logged-in user found');
      }
  
      const parsedUser = JSON.parse(storedUser);
      const userId = parsedUser?.userId;
  
      if (userId == null) {
        throw new Error('Invalid user ID');
      }
  
      return this.http.get<any[]>(`${this.baseUrl}/users`).pipe(
        map((users) => {
          const targetUser = users.find((u) => u.userId === userId);
          if (targetUser) {
            targetUser.profilePicUrl = profilePicUpdate.profilePicUrl;
            return this.http.put(`${this.baseUrl}/users/${targetUser.id}`, targetUser);
          } else {
            throw new Error('User not found');
          }
        })
      );
    } else {
      // Local storage operation (assuming 'userApp' holds logged-in user details)
      const storedUser = localStorage.getItem('userApp');
      if (!storedUser) {
        throw new Error('No logged-in user found');
      }
  
      const parsedUser = JSON.parse(storedUser);
      parsedUser.profilePicUrl = profilePicUpdate.profilePicUrl;
  
      localStorage.setItem('userApp', JSON.stringify(parsedUser));
  
      return of(parsedUser);
    }
  }

  // Other methods for fetching user data

  onLogin(credentials: { EmailId: string; Password: string }): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users`).pipe(
      map((users) => {
        const user = users.find((u) => u.emailId === credentials.EmailId && u.password === credentials.Password);
        if (user) {
          return { result: true, data: user };
        } else {
          return { result: false, message: 'Invalid email or password' };
        }
      })
    );
  }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/users/${id}`);
  }
}
