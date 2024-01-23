import { Directive, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[bindQueryParam]',
})
export class BindQueryParamDirective implements OnInit {
  @Input('bindQueryParam') paramKey: string;

  constructor(private ngControl: NgControl) {}
  

  public ngOnInit() {
    if (location.search) {
        const queryParams = new URLSearchParams(location.search);
        const value = Object.fromEntries(queryParams.entries());
        this.ngControl.control.patchValue(value);
      }
  }
}