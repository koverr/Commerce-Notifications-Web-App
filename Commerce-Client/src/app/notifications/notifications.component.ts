import { Component, OnInit, NgModuleRef } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateParserFormatter, NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { TransactionsComponent } from '../transactions/transactions.component';
import { RuleComponent } from '../rule/rule.component';
import { Trigger } from '../models/trigger';
import { NotificationService } from '../services/notification.service';
import { GlobalVariables } from '../common/global-variables';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  triggers: Trigger[];
  public isCollapsed = false;
  model = {
    new: true,
    amount: true,
    time: true,
    location: true,
    duplicates: true,
    notTriggered: true
  };

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private notificationService: NotificationService,
              private calendar: NgbCalendar,
              public formatter: NgbDateParserFormatter,
              private modalService: NgbModal) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
   }

  ngOnInit(): void {
  }

  getRules() {
    this.notificationService.getRules(GlobalVariables.loggedInUserId).subscribe(trigger => {
      this.triggers = trigger;
    });
  }

  openRule(triggerId: number, triggerName: string) {
    const modalRef = this.modalService.open(RuleComponent);
    modalRef.componentInstance.triggerId = triggerId;
    modalRef.componentInstance.triggerName = triggerName;
    modalRef.result.then(() => { this.getRules(); }, () => { console.log('Backdrop click'); });
  }

  deleteRule(triggerId: number, triggerName: string) {
    this.notificationService.deleteRule(triggerId, triggerName).subscribe(response => {
      console.log(response);
      this.getRules();
    });
  }

  // TODO Make new Modal for showing notifications
  openNotifications(triggerID: number) {
    this.modalService.open(TransactionsComponent, { windowClass: 'transactions-modal' });
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

}
