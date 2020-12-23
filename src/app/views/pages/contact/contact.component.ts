import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';
import { OpenDataService } from '../../../core/services/open-data.service';
import { StaticDataService } from '../../../core/services/static-data.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  /** 
 * Forms
 */
  submitForm: FormGroup;
  submitted: boolean = false;
  validator: any;

  loading: boolean = false;
  private unsubscribe: Subject<any>;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private translate: TranslateService,
    private openDataService: OpenDataService,
    private staticDataService: StaticDataService,
  ) {
    this.validator = this.staticDataService.getValidators.contact;
    this.unsubscribe = new Subject();
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
    this.loading = false;
  }

  initForm() {
    this.submitForm = this.fb.group({
      sender: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(this.validator.sender.minLength),
        Validators.maxLength(this.validator.sender.maxLength)
      ])
      ],
      content: ['', Validators.compose([
        Validators.required,
        Validators.minLength(this.validator.content.minLength),
        Validators.maxLength(this.validator.content.maxLength)
      ])
      ],
    });
  }

  /**
   * On Submit Form
   */
  onSubmit() {
    if (this.loading) return;

    const controls = this.submitForm.controls;
    /** check form */
    if (this.submitForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.loading = true;

    this.openDataService.communicate(controls.sender.value, controls.content.value)
      .pipe(
        tap(
          data => {
            Swal.fire({
              title: this.translate.instant('CONTACT.SUCCESS.TITLE'),
              html: this.translate.instant('CONTACT.SUCCESS.MESSAGE'),
              icon: 'success'
            })
            setTimeout(() => {
              this.router.navigateByUrl('/');
            }, 2500);
          }, error => {
          }),
        takeUntil(this.unsubscribe),
        finalize(() => {
          this.loading = false;
          this.cdRef.markForCheck();
        })
      ).subscribe();
  }

  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.submitForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }
}
