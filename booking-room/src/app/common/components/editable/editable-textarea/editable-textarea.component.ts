import { EditableComponent } from './../editable-component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-editable-textarea',
  templateUrl: './editable-textarea.component.html',
  styleUrls: ['./editable-textarea.component.css']
})
export class EditableTextareaComponent extends EditableComponent {
@Input() rows: string;
@Input() cols: string;
}
