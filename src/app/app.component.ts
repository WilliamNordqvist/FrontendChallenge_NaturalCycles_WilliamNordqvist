import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { TitleComponent } from './title/title.component';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    TitleComponent,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [provideNativeDateAdapter()]
})
export class AppComponent implements OnInit {
  titleText: string = 'Time to Midsummer Eve';
  date: Date | null = new Date('2024-06-21');

  ngOnInit() {
    const savedTitleText = localStorage.getItem('titleText');
    const savedDate = localStorage.getItem('date');

    if (savedTitleText) {
      this.titleText = savedTitleText;
    }

    if (savedDate) {
      this.date = new Date(savedDate);
    }
  }

  onTitleChange(event: any) {
    this.titleText = event.target.value;
    localStorage.setItem('titleText', this.titleText);
  }

  onDateChange(event: any) {
    this.date = event.value;
    if (this.date) {
      localStorage.setItem('date', this.date.toISOString());
    }
    console.log('Selected date:', this.date);
  }
}
