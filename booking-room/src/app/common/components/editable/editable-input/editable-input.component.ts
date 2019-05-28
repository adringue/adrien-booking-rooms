import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditableComponent } from '../editable-component';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-editable-input',
  templateUrl: './editable-input.component.html',
  styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent extends EditableComponent {
  @Input() type = 'text';
  @Input() transformView = value => value;
}
