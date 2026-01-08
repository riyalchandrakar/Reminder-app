import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  interval,
  map,
  Observable,
  BehaviorSubject,
  switchMap
} from 'rxjs';

interface Reminder {
  text: string;
  time: Date;
}

@Component({
  selector: 'app-reminder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent {

  // fast / normal toggle
  private fastMode$ = new BehaviorSubject<boolean>(false);

  private currentTime!: Date;

  // ⏰ CLOCK STREAM
  time$: Observable<Date> = this.fastMode$.pipe(
    switchMap(isFast => {

      // balanced fast speed
      const tickMs = isFast ? 80 : 1000;
      const addMs  = isFast ? 4000 : 1000;

      return interval(tickMs).pipe(
        map(() => {
          if (!this.currentTime) {
            this.currentTime = new Date();
          }

          this.currentTime = new Date(
            this.currentTime.getTime() + addMs
          );

          return this.currentTime;
        })
      );
    })
  );

  reminders: Reminder[] = [];
  reminderText = '';
  reminderTime = '';

  // 🔴 red clock click
  toggleFastMode(): void {
    this.fastMode$.next(!this.fastMode$.value);
  }

  // ➕ add reminder
  addReminder(): void {
    if (!this.reminderText.trim()) {
      alert('Please enter reminder text');
      return;
    }

    if (!this.reminderTime) {
      alert('Please set reminder time');
      return;
    }

    this.reminders.push({
      text: this.reminderText,
      time: new Date(this.reminderTime)
    });

    this.reminderText = '';
    this.reminderTime = '';
  }

  // ✔ strike-out logic
  isCompleted(reminder: Reminder, now: Date): boolean {
    return now >= reminder.time;
  }
}
