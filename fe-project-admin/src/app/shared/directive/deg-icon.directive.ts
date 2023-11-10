import {Directive, HostListener, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[DegIconDirective]'
})
export class DegIconDirective {

  private isMenuVisible = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    // Nếu phần tử được bấm là nút menu, ẩn hoặc hiện các phần tử
    if (event.target === this.el.nativeElement) {
      const menuItems = this.el.nativeElement.querySelectorAll('.toggle-icon');

      menuItems.forEach((item: any) => {
        const displayStyle = this.isMenuVisible ? 'rotate(90deg)' : 'rotate(0deg)';
        this.renderer.setStyle(item, 'transform', displayStyle);
      });

      this.isMenuVisible = !this.isMenuVisible;
    }
  }
}
