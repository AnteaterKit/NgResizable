import { Component, HostBinding, Input } from '@angular/core';
import { ResizeData } from './resizable.directive';

export type ResizeDirection = 'vertical' | 'horizontal';

@Component({
  selector: 'span[resizable]',
  templateUrl: './resizable.component.html',
  styleUrls: ['./resizable.component.scss'],
})
export class ResizableComponent {
  @Input()
  resizeDirection: ResizeDirection = 'vertical';

  @HostBinding('style.width.px')
  width: number | null = null;
  @HostBinding('style.height.px')
  height: number | null = null;

  onResize(resizeData: ResizeData) {
    if (this.resizeDirection === 'vertical') {
        this.height = resizeData.height;
    }
    if (this.resizeDirection === 'horizontal') {
        this.width = resizeData.width;
    }
  }
}
