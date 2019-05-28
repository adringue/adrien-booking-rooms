import { Component, OnInit, Input } from '@angular/core';
import { EditableComponent } from '../editable-component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'booking-editable-select',
  templateUrl: './editable-select.component.html',
  styleUrls: ['./editable-select.component.css']
})
export class EditableSelectComponent extends EditableComponent {

  @Input() public options: any[];

}
