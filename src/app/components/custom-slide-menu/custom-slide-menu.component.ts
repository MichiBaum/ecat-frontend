import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import {SlideMenu, SlideMenuSub} from "primeng";

@Component({
  selector: 'app-custom-slide-menu',
  templateUrl: './custom-slide-menu.component.html',
  styleUrls: ['./custom-slide-menu.component.scss']
})
export class CustomSlideMenuComponent extends SlideMenu implements AfterViewChecked, OnDestroy{

  constructor(renderer2: Renderer2, cd: ChangeDetectorRef, el: ElementRef) {
    super(el, renderer2, cd);
  }

  ngAfterViewChecked() {
    super.ngAfterViewChecked();
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
@Component({
  selector: 'app-custom-slide-menusub',
  templateUrl: './custom-slide-menusub.component.html',
  styleUrls: ['./custom-slide-menu.component.scss']
})
export class CustomSlideMenuSubComponent extends SlideMenuSub implements OnDestroy{

  constructor(@Inject(forwardRef(() => CustomSlideMenuComponent)) slideMenu) {
    super(slideMenu);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
