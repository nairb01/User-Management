import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  userService = inject(UserService);
  userList: any[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUser().subscribe((res: any) => {
      console.log(res);
      this.userList = res;
    });
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.loadUsers(); // Reload the list of users after deletion
      });
    }
  }
}


