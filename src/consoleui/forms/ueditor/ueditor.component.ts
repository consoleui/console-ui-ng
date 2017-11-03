
import {
    Component, forwardRef, ElementRef, NgZone, Input, Output,
    EventEmitter, ViewChild, AfterViewInit, OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var UE: any;

const UEDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => UeditorComponent),
    multi: true
};

@Component({
    selector: 'cui-ueditor',
    template: '<textarea #host></textarea>',
    providers: [UEDITOR_VALUE_ACCESSOR]
})

export class UeditorComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
    private ueditor: any;
    private value: string;
    private umToolbar = [
        ['source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'emotion', '|', 'underline',
            'strikethrough', '|', 'superscript', 'subscript', '|', 'forecolor',
            'backcolor', '|', 'removeformat', '|',
            'insertorderedlist', 'insertunorderedlist', '|', 'selectall', 'cleardoc', 'paragraph', '|', 'fontfamily', 'fontsize',
            '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
            'link', 'unlink', '|', 'simpleupload', 'insertvideo', 'attachment']
    ];
    @Input() setting: any;
    @Input() autoHeight: boolean = false;
    @Input() initialFrameHeight: number = 450;
    @Input() topOffset: number = 0;
    @Input() fontsize: number = 14;
    @Input() toolbarMode: string = "default";

    @Output() onReady = new EventEmitter();
    @Output() onValueChange = new EventEmitter();
    @Output() onFocus = new EventEmitter();

    @ViewChild('host') host;

    onChange: Function = () => { };
    onTouched: Function = () => { };

    constructor(
        private el: ElementRef,
        private ngZone: NgZone
    ) {

    }

    private ueditorSettings() {
        let defaultConfig = {
            autoHeightEnabled: this.autoHeight,
            initialFrameHeight: this.initialFrameHeight,
            topOffset: this.topOffset,
        };
        if (this.toolbarMode === 'um') {
            // debugger;
            defaultConfig['toolbars'] = this.umToolbar;
            defaultConfig['wordCount'] = false;
            defaultConfig['elementPathEnabled'] = false;
        }
        let cf = Object.assign(defaultConfig, this.setting);
        return cf;
    }
    ngAfterViewInit() {
        this.init();
    }

    ngOnDestroy() {
        this.destroy();
    }

    writeValue(value: string) {
        this.value = value;
        if (this.ueditor) {
            this.ueditor.setContent(this.value);
        }
    }

    registerOnChange(fn: Function) {
        this.onChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled) {
            this.ueditor.setDisabled();
        } else {
            this.ueditor.setEnabled();
        }
    }

    init() {
        if (typeof UE === 'undefined') {
            console.error('UEditor is missing');
            return;
        }
        let ueditor = new UE.ui.Editor(this.ueditorSettings() || {});
        ueditor.render(this.host.nativeElement);
        ueditor.addListener('ready', () => {
            this.ueditor = ueditor;
            this.ueditor.execCommand( 'fontsize', this.fontsize + 'px' );
            this.ueditor.execCommand( 'fontfamily', '微软雅黑' );
            if (this.value) {
                this.ueditor.setContent(this.value);
            }
            this.onReady.emit();
        });
        ueditor.addListener('contentChange', () => {
            this.updateValue(ueditor.getContent());
        });
        ueditor.addListener('focus', () => {
            this.onFocus.emit();
        });
    }

    destroy() {
        if (this.ueditor) {
            this.ueditor.removeListener('ready');
            this.ueditor.removeListener('contentChange');
            this.ueditor.destroy();
            this.ueditor = null;
        }

    }

    updateValue(value: string) {
        this.ngZone.run(() => {
            this.value = value;

            this.onChange(this.value);
            this.onTouched();

            this.onValueChange.emit(this.value);
        });
    }

    getContent(): string {
        return this.ueditor.getContent();
    }
    getPlainTxt(): string {
        return this.ueditor.getPlainTxt();
    }
    getContentTxt(): string {
        return this.ueditor.getContentTxt();
    }
    hasContents(): boolean {
        return this.ueditor.hasContents();
    }

}
