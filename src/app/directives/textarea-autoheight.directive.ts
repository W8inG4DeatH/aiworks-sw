import { Directive, ElementRef, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
    selector: 'textarea[autoheight]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaAutoheightDirective),
            multi: true,
        },
    ],
})
export class TextareaAutoheightDirective implements ControlValueAccessor {
    onChange: (value: any) => void = () => {};
    onTouched: () => void = () => {};

    constructor(private elementRef: ElementRef) {}

    @HostListener('input', ['$event.target.value'])
    onInput(value: string): void {
        this.adjust();
        if (this.onChange) {
            this.onChange(value);
        }
    }

    writeValue(value: any): void {
        this.elementRef.nativeElement.value = value;
        this.adjust();
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.elementRef.nativeElement.disabled = isDisabled;
    }

    private adjust(): void {
        const textarea = this.elementRef.nativeElement;
        textarea.style.overflow = 'hidden';
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
}

