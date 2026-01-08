import { bootstrapApplication } from '@angular/platform-browser';
import { ReminderComponent } from './app/components/reminder/reminder.component';

bootstrapApplication(ReminderComponent)
  .catch(err => console.error(err));
