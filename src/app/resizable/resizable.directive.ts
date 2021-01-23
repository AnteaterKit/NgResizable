import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Output } from '@angular/core';
import { fromEvent } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil, tap } from 'rxjs/operators';

export interface ResizeData {
  width: number;
  height: number;
}

@Directive({
  selector: '[resizable]'
})
export class ResizableDirective {
  @Output()
  readonly resizable = fromEvent<MouseEvent>(
    this.elementRef.nativeElement,
    'mousedown'
  ).pipe(
    tap(e => e.preventDefault()),
    switchMap(() => {
      const element =  this.elementRef.nativeElement.closest('span') as HTMLSpanElement;
      const { width, right, height, bottom } = element.getBoundingClientRect();

      return fromEvent<MouseEvent>(this.documentRef, 'mousemove').pipe(
        map(
            ({ clientX,  clientY }) => {
              return { width: width + clientX - right, height: height + clientY - bottom };
            }
        ),
        distinctUntilChanged(),
        takeUntil(fromEvent(this.documentRef, 'mouseup'))
      );
    })
  );

  constructor(
    @Inject(DOCUMENT) private readonly documentRef: Document,
    @Inject(ElementRef)
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}
}
