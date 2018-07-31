// Imports
import {
    Component,
    Input,
    Output,
    ViewChild,
    EventEmitter,
    NgZone,
    forwardRef,
    QueryList,
    AfterViewInit,
    ContentChildren,
    SimpleChanges,
    OnChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CKButtonDirective } from './ckbutton.directive';
import { CKGroupDirective } from './ckgroup.directive';
import { OnDestroy, AfterViewChecked } from '@angular/core';

declare var CKEDITOR: any;

/**
 * CKEditor component
 * Usage :
 *  <ckeditor [(ngModel)]="data" [config]="{...}" debounce="500"></ckeditor>
 */
@Component({
    selector: 'ckeditor, cui-ckeditor',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CKEditorComponent),
            multi: true,
        },
    ],
    template: `<textarea #host></textarea>`,
})
export class CKEditorComponent implements OnChanges, AfterViewInit, OnDestroy, AfterViewChecked {
    // @Input() config: any;
    @Input() readonly: boolean;
    @Input() debounce: string;
    @Input() toolbarMode: string = "basic"; // for ueditor alias
    @Input() urlWithBasePath: boolean = false;

    @Output() change = new EventEmitter();
    @Output() editorChange = new EventEmitter();
    @Output() ready = new EventEmitter();
    @Output() blur = new EventEmitter();
    @Output() focus = new EventEmitter();
    @Output() contentDom = new EventEmitter();
    @Output() fileUploadRequest = new EventEmitter();

    @ViewChild('host') host: any;

    @ContentChildren(CKButtonDirective) toolbarButtons: QueryList<CKButtonDirective>;
    @ContentChildren(CKGroupDirective) toolbarGroups: QueryList<CKGroupDirective>;

    _value = '';
    instance: any;
    debounceTimeout: any;

    defaultConfig = {
        toolbar_full: [
            ['Source', '-', 'Save', 'NewPage', 'Preview', '-', 'Templates'],
            ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Print', 'SpellChecker', 'Scayt'],
            ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'],
            ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],
            '/',
            ['Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
            ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink', 'Anchor'],
            ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak'],
            '/',
            ['Styles', 'Format', 'Font', 'FontSize'],
            ['TextColor', 'BGColor']
        ],
        toolbar_basic: [
            ['NewPage', 'Preview', '-', 'Undo', 'Redo'],
            ['Format', '-', 'Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript', 'Superscript'],
            ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink'],
            ['TextColor', 'BGColor'],
            ['Image']
        ],
        toolbar_simple: [
            ['Undo', 'Redo'],
            ['Format', '-', 'Bold', 'Italic', 'Underline', 'Strike'],
            ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
            ['Link', 'Unlink'],
            ['TextColor', 'BGColor'],
            ['Image']
        ],
        toolbar: 'basic',
        removePlugins: 'elementspath',
        // filebrowserBrowseUrl: '/api/upload/file',
        filebrowserImageUploadUrl: '/api/ckeditor/upload/image?responseType=json',
        linkShowAdvancedTab: false,
        linkShowTargetTab: false,
    };
    _config: any;
    @Input() set config(val) {
        this._config = Object.assign(this.defaultConfig, val);
    }
    get config() {
        if (this.urlWithBasePath) {
            if (this._config) {
                const separator = this._config.filebrowserImageUploadUrl && this._config.filebrowserImageUploadUrl.includes("?")
                        ? '&' : "?";
                this._config.filebrowserImageUploadUrl = this._config.filebrowserImageUploadUrl ?
                    this._config.filebrowserImageUploadUrl + `${separator}withBasePath=1` : null;
            } else {
                const separator = this.defaultConfig.filebrowserImageUploadUrl && this.defaultConfig.filebrowserImageUploadUrl.includes("?")
                        ? '&' : "?";
                this.defaultConfig.filebrowserImageUploadUrl = this.defaultConfig.filebrowserImageUploadUrl ?
                    this.defaultConfig.filebrowserImageUploadUrl + `${separator}withBasePath=1` : null;
            }
        }
        return this._config || this.defaultConfig;
    }

    /**
     * Constructor
     */
    constructor(private zone: NgZone) { }

    get value(): any {
        return this._value;
    }
    @Input()
    set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.readonly && this.instance) {
            this.instance.setReadOnly(changes.readonly.currentValue);
        }
    }

    /**
     * On component destroy
     */
    ngOnDestroy() {
        if (this.instance) {
            setTimeout(() => {
                this.instance.removeAllListeners();
                CKEDITOR.instances[this.instance.name].destroy();
                this.instance.destroy();
                this.instance = null;
            });
        }
    }

    /**
     * On component view init
     */
    ngAfterViewInit() {
        this.ckeditorInit(this.config || {});
    }

    /**
     * On component view checked
     */
    ngAfterViewChecked() {
        this.ckeditorInit(this.config || {});
    }

    /**
     * Value update process
     */
    updateValue(value: any) {
        this.zone.run(() => {
            this.value = value;

            this.onChange(value);

            this.onTouched();
            this.change.emit(value);
        });
    }

    /**
     * CKEditor init
     */
    ckeditorInit(config: any) {
        if (typeof CKEDITOR === 'undefined') {
            console.warn('CKEditor 4.x is missing (http://ckeditor.com/)');
        } else {
            // Check textarea exists
            if (this.instance || !this.documentContains(this.host.nativeElement)) {
                return;
            }

            if (this.readonly) {
                config.readOnly = this.readonly;
            }
            // CKEditor replace textarea
            this.instance = CKEDITOR.replace(this.host.nativeElement, config);

            // Set initial value
            this.instance.setData(this.value);

            // listen for instanceReady event
            this.instance.on('instanceReady', (evt: any) => {
                // if value has changed while instance loading
                // update instance with current component value
                if (this.instance.getData() !== this.value) {
                    this.instance.setData(this.value);
                }

                // send the evt to the EventEmitter
                this.ready.emit(evt);
            });

            // CKEditor change event
            this.instance.on('change', (evt: any) => {
                // console.log(evt);
                this.onTouched();
                let value = this.instance.getData();

                if (this.value !== value) {
                    // Debounce update
                    if (this.debounce) {
                        if (this.debounceTimeout) {
                            clearTimeout(this.debounceTimeout);
                        }
                        this.debounceTimeout = setTimeout(() => {
                            this.updateValue(value);
                            this.debounceTimeout = null;
                        }, parseInt(this.debounce));

                        // Live update
                    } else {
                        this.updateValue(value);
                    }
                }

                // Original ckeditor event dispatch
                this.editorChange.emit(evt);
            });

            this.instance.on( 'contentDom', () => {
                let editable = this.instance.editable();
                editable.attachListener( this.instance.document, 'compositionend', (evt) => {
                    this.onTouched();
                    let value = this.instance.getData();

                    if (this.value !== value) {
                        // Debounce update
                        if (this.debounce) {
                            if (this.debounceTimeout) {
                                clearTimeout(this.debounceTimeout);
                            }
                            this.debounceTimeout = setTimeout(() => {
                                this.updateValue(value);
                                this.debounceTimeout = null;
                            }, parseInt(this.debounce));

                            // Live update
                        } else {
                            this.updateValue(value);
                        }
                    }

                    // Original ckeditor event dispatch
                    this.editorChange.emit(evt);
                });
            });

            // CKEditor blur event
            this.instance.on('blur', (evt: any) => {
                this.blur.emit(evt);
            });

            // CKEditor focus event
            this.instance.on('focus', (evt: any) => {
                this.focus.emit(evt);
            });

            // CKEditor contentDom event
            this.instance.on('contentDom', (evt: any) => {
                this.contentDom.emit(evt);
            });

            // CKEditor fileUploadRequest event
            this.instance.on('fileUploadRequest', (evt: any) => {
                this.fileUploadRequest.emit(evt);
            });

            // Add Toolbar Groups to Editor. This will also add Buttons within groups.
            this.toolbarGroups.forEach(group => {
                group.initialize(this);
            });
            // Add Toolbar Buttons to Editor.
            this.toolbarButtons.forEach(button => {
                button.initialize(this);
            });
        }
    }

    /**
     * Implements ControlValueAccessor
     */
    writeValue(value: any) {
        this._value = value;
        if (this.instance) {
            this.instance.setData(value);
        }
    }
    onChange(_: any) { }
    onTouched() { }
    registerOnChange(fn: any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    private documentContains(node: Node) {
        return document.contains ? document.contains(node) : document.body.contains(node);
    }
}
