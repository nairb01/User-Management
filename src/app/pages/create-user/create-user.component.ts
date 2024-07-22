import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userForm: FormGroup;
  isReadOnly: boolean = false;
  isProfilePicEditable: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  this.userForm = this.fb.group({
      userId: [{ value: '', disabled: true }, Validators.required],
      fullName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      profilePicUrl: ['', Validators.required],
      role: ['User'], // Default role is 'User' for new user creation
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.checkLoggedInUser();
  }

  
  checkLoggedInUser() {
    const loggedInUser = JSON.parse(localStorage.getItem('userApp') || '{}');
    if (loggedInUser && loggedInUser.role) {
      this.isAdmin = loggedInUser.role === 'Admin';
      if (!this.isAdmin) {
        this.disableFormForNonAdmin();
        this.userForm.patchValue(loggedInUser);
        this.isProfilePicEditable = true;
      }
    } else {
      this.router.navigateByUrl('login');
    }
  }

  createUser() {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(
        (newUser) => {
          alert('User created successfully!');
          this.resetForm();
        },
        (err) => {
          alert('Error creating user: ' + err.message);
        }
      );
    } else {
      alert('Please fill out all required fields correctly.');
    }
  }
  



  disableFormForNonAdmin() {
    this.userForm.get('fullName')?.disable();
    this.userForm.get('emailId')?.disable();
    this.userForm.get('mobileNo')?.disable();
    this.userForm.get('addressLine1')?.disable();
    this.userForm.get('addressLine2')?.disable();
    this.userForm.get('city')?.disable();
    this.userForm.get('password')?.disable();
  }

  

  // createUser() {
  //   console.log(this.userForm.value);
    
  //   if (this.userForm.valid) {
  //     this.userService.createUser(this.userForm.value).subscribe(
  //       res => {
  //         console.log(res);
          
  //         alert('User created successfully!');
  //         this.resetForm();
  //       },
  //       err => {
  //         alert('Error creating user.');
  //       }
  //     );
  //   }
  // }

  updateProfilePic() {
    if (this.isProfilePicEditable && this.userForm.get('profilePicUrl')?.valid) {
      const profilePicUpdate = { profilePicUrl: this.userForm.get('profilePicUrl')?.value };
      this.userService.updateUserProfilePic(profilePicUpdate).subscribe(
        res => {
          alert('Profile picture updated successfully!');
        },
        err => {
          alert('Error updating profile picture.');
        }
      );
    }
  }
  
  resetForm() {
    this.userForm.reset({
      userId: '',
      fullName: '',
      emailId: '',
      mobileNo: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      profilePicUrl: '',
      role: 'User', // Reset role to 'User'
      password: ''
    });
  }
}
