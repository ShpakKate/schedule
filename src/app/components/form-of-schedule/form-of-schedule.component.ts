import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ScheduleService} from "../../services/schedule.service";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {TargetDate} from "../../shared/enums/target-date";
import {Transport} from "../../shared/enums/transport";
import {PlaceObj} from "../../shared/models/place-obj";

@Component({
  selector: 'app-form-of-schedule',
  templateUrl: './form-of-schedule.component.html',
  styleUrls: ['./form-of-schedule.component.scss']
})
export class FormOfScheduleComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  public listFrom: PlaceObj[] = [];
  public listTo: PlaceObj[] = [];

  private objFrom: PlaceObj = {
    full_title: '',
    point_key: ''
  };
  private objTo: PlaceObj = {
    full_title: '',
    point_key: ''
  };

  public transport = Transport;
  public selectedEnumTransport!: string;
  public date = TargetDate;
  public selectedEnumDate!: string;
  private selectedDate?: string

  private destroy$ = new Subject();

  @Output() onResponse = new EventEmitter();

  @ViewChild('datepicker') public datepicker!: ElementRef;

  constructor(
    private readonly fb: FormBuilder,
    private readonly scheduleService: ScheduleService,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      from: [this.objFrom.full_title, Validators.required],
      to: [this.objTo.full_title, Validators.required],
      date: ['', Validators.required],
      transport: ['', Validators.required],
    });

    this.fromInputValue();
    this.toInputValue();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  fromInputValue() {
    this.form.controls['from'].valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$),
      )
      .subscribe(
        inputValue => {

          this.scheduleService.getStation(inputValue).subscribe( (data: any) => {
            this.listFrom = data.suggests;
            console.log('hhh',this.listFrom)
          });

          if (this.listFrom.length != 0) {
            const obj = this.listFrom.filter( (item: PlaceObj) => item.full_title === inputValue);
            if (obj.length != 0){
              this.objFrom.point_key = obj[0].point_key;
            }
          }
        }
      )
  }

  toInputValue() {
    this.form.controls['to'].valueChanges
      .pipe(
        debounceTime(500),
        takeUntil(this.destroy$),
      )
      .subscribe(
        inputValue => {
          this.scheduleService.getStation(inputValue).subscribe( (data: any) => {
            this.listTo = data.suggests;
          })

          if (this.listTo) {
            const obj = this.listTo.filter( (item: PlaceObj) => item.full_title === inputValue);
            if (obj.length != 0) {
              this.objTo.point_key = obj[0].point_key;
            }
          }
        }
      )
  }

  changeValue() {
    const from = this.form.controls['from'].value;

    this.form.controls['from'].setValue(this.form.controls['to'].value);
    this.form.controls['to'].setValue(from);

    const codeFrom = this.objFrom.point_key;

    this.objFrom.point_key = this.objTo.point_key;
    this.objTo.point_key = codeFrom;
  }

  isDate(date: string, event: any) {
    this.selectedEnumDate = date;

    if (date === this.date.customDate) {
      this.datepicker.nativeElement.showPicker();
    } else {
      if (date === this.date.today) {
        this.selectedDate = new Date().toISOString().split('T')[0];
      }

      if (date === this.date.tomorrow) {
        const today = new Date();
        today.setDate(today.getDate() + 1);
        this.selectedDate = today.toISOString().split('T')[0];
      }

      this.form.patchValue({
        date: this.selectedDate,
      });
    }
  }

  setTransport(transport: string) {
    this.selectedEnumTransport = transport;

    this.form.patchValue({
      transport: transport
    });
  }

  onSubmit() {
    this.scheduleService.getSchedule({
      from: this.objFrom.point_key,
      to: this.objTo.point_key,
      transport: this.form.get('transport')?.value,
      date: this.form.get('date')?.value,
    }).subscribe( (data: any) => {
      this.onResponse.emit(data.segments);
    })
  }
}
