import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  profile: any = null;
  loading = true;
  error = '';
  editMode = false;
  updatedProfile: any = {};

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.profileService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.updatedProfile = { ...data };
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load profile.';
        this.loading = false;
      }
    });
  }

  enableEdit(): void {
    this.editMode = true;
    this.updatedProfile = { ...this.profile };
  }

  cancelEdit(): void {
    this.editMode = false;
    this.updatedProfile = { ...this.profile };
  }

  saveProfile(): void {
    this.profileService.updateProfile(this.updatedProfile).subscribe({
      next: (data) => {
        this.profile = data;
        this.editMode = false;
      },
      error: (err) => {
        this.error = 'Failed to update profile.';
      }
    });
  }
}
