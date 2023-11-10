import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener, Renderer2,
} from '@angular/core';

@Directive({
  selector: '[dropdownSidebar]',
})
export class DropdownSidebarDirective {
  private isMenuVisible = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  // }

  @HostListener('click', ['$event'])
  onClick(event: Event) {


    // Lấy ra các phần tử cần ẩn
    if (event.target === this.el.nativeElement) {

      const ulElement = this.el.nativeElement.nextElementSibling;

      if (this.isMenuVisible) {
        this.renderer.setStyle(ulElement, 'display', 'none');
      } else {
        this.renderer.setStyle(ulElement, 'display', 'block');
      }

      this.isMenuVisible = !this.isMenuVisible;
    }

  }
}
