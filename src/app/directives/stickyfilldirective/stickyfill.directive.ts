import { Directive, ElementRef } from '@angular/core';
import * as Stickyfill from 'stickyfilljs';

@Directive({
  selector: '[appStickyfill]'
})
export class StickyfillDirective {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    Stickyfill.addOne(this.elementRef.nativeElement);
  }

}
