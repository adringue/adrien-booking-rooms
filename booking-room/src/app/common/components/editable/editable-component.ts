import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';



export class EditableComponent implements OnChanges {
  @Input() entity: any;
  @Input() set field(entityField: string) {
    this.entityField = entityField;
    this.setOriginValue();
  }
  isActiveInput = false;
  @Input() className: string;
  // @Input() type: string;
  @Input() style: any;
  @Output() entityUpdated = new EventEmitter();
  public entityField: string;
  public originEntityValue: any;
  constructor() { }
  ngOnChanges() {
    this.setOriginValue();
    this.isActiveInput = false;
  }
  updateEntity() {
    const entityValue = this.entity[this.entityField];
    if (entityValue !== this.originEntityValue) {  // only update when actuel different of origin
      this.entityUpdated.emit({ [this.entityField]: this.entity[this.entityField] });
      this.setOriginValue();
    }
    this.isActiveInput = false;  // we want to close Input all the time
  }
  cancelUpdate() {
    this.isActiveInput = false;
    this.entity[this.entityField] = this.originEntityValue;
  }
  setOriginValue() {
    this.originEntityValue = this.entity[this.entityField];
  }
}
