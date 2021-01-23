mport { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ResizableModule } from './resizable.module';

describe('resizable', () => {
    @Component({
        template: `
            <div style='width: 300px; height: 300px;'>
                <span resizable resizeDirection='vertical' >
                    resizable
                </span>
            </div>
        `,
    })
    class TestComponent {
    }

    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => TestBed.configureTestingModule({
        imports: [
            ResizableModule
        ],
        declarations: [TestComponent],
    }));

    it('Проверяет растягивание элемента вниз', () => {
        // создаем компонент
        fixture =  TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        // проверяем, что высота не задана
        let span = fixture.debugElement.query(By.css('span'));
        expect(
            span.nativeElement.style.height
          ).toEqual('');

        // создаем события мыши
        const bar = fixture.debugElement.query(By.css('#bar-vertical'));
        const mousedown = new MouseEvent('mousedown');
        bar.nativeElement.dispatchEvent(mousedown);

        const mousemove = new MouseEvent('mousemove', {
            clientX: 150,
            clientY: 500,
            bubbles: true,
            cancelable: true,
            view: window
          });
        bar.nativeElement.dispatchEvent(mousemove);
        fixture.detectChanges();

        // проверяем, что высота поменялась
        span = fixture.debugElement.query(By.css('span'));
        const heightStyle = span.nativeElement.style.height;
        const height = heightStyle.replace('px','');
        expect(
            +height > 400
          ).toBeTruthy();

    });
});