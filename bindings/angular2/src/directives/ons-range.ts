import {
  Component,
  Injector,
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChange
} from '@angular/core';

/**
 * @element ons-range
 * @directive OnsRange
 * @selector ons-range
 * @description
 *   [en]Angular 2 directive for `<ons-range>` component.[/en]
 *   [ja]`<ons-range>`要素のAngular 2ディレクティブです。[/en]
 * @example
 *   <ons-range [(value)]="foo"></ons-range><br>
 *
 *   <!-- Add (input) to change immediately on dragging range component -->
 *   <ons-range [(value)]="bar" (input)="bar = $event.target.value"></ons-range>
 */
@Directive({
  selector: 'ons-range'
})
export class OnsRange implements OnChanges, OnDestroy {
  private _element: any;
  private _boundOnChange: Function;

  /**
   * @input value
   * @type {string}
   * @desc
   *   [en]Input value of the `<ons-range>` element..[/en]
   *   [ja]`ons-range`要素に対する入力値を指定します。[/ja]
   */
  @Input('value') _value: string;

  /**
   * @output valueChange
   * @type {string}
   * @desc
   *   [en]Triggers when the value is changed.[/en]
   *   [ja]値が変更された時に発火します。[/ja]
   */
  @Output('valueChange') _valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _elementRef: ElementRef) {
    this._boundOnChange = this._onChange.bind(this);
    this._element = _elementRef.nativeElement;

    this._element.addEventListener('change', this._boundOnChange);
  }

  _onChange(event) {
    this._valueChange.emit(this._element.value);
  }

  ngOnChanges(changeRecord: {[key: string]: SimpleChange;}) {
    const value = changeRecord['_value'].currentValue;
    this._element.value = value;
  }

  get element(): any {
    return this._element;
  }

  get nativeElement(): any {
    return this._element;
  }

  ngOnDestroy() {
    this._element.removeEventListener('change', this._boundOnChange);

    this._element = null;
  }
}
