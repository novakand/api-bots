import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectItemGroup } from 'primeng/api';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete/autocomplete.interface';
import { filterValuesDefault } from '../../constants/filter-values-default.constant';
import { BehaviorSubject, Subject, combineLatest, debounceTime, distinctUntilChanged, filter, map, pairwise, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs';
import { CatalogService } from '../../services/catalog.service';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { IFilterRequest } from '../../interfaces/filter-request.interfaces';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit, OnDestroy {

  constructor(
    public cd: ChangeDetectorRef,
    private _fb: FormBuilder,
    private router: Router,
    private _service: CatalogService,
    private _activatedRoute: ActivatedRoute,
  ) {
  }

  public filterValue = filterValuesDefault;
  public filterForm: FormGroup;
  public transitionOptions = '225ms cubic-bezier(0.86, 0, 0.07, 1)'
  public marginP = '0px';
  public isOpen = false;
  public filteredGroups: any[] | undefined;
  public selectedValue: string;
  public selectedItems!: any[];
  public selectAll = false;
  public groupedCities: SelectItemGroup[] | undefined;

  public itemsTaxon$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public indexsCountry$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public formSubmit$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public queryParams: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private _destroy$ = new Subject<boolean>();

  public ngOnInit(): void {
    this.getCountryFields();
    this._buildForm();
    this._watchForSubmitFormChanges();
    this._watchForRouteParamsChanges();
    this._watchForFormChanges();
    this._watchForPageChanges();
    this.onSubmitForm();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  public _watchForFormChanges() {
    this.filterForm.valueChanges.pipe(
      startWith(this.filterForm.value),
      pairwise(),
      map(([oldValues, newValues]) => {
        return Object.keys(newValues).find(k => newValues[k] != oldValues[k]);
      }),
    ).subscribe(key => {
      key === 'pagination' && this.router.navigate(['/catalog'], { queryParams: { page: this.filterForm.get('pagination').get('pageIndex').value, limit: this.filterForm.get('pagination').get('pageSize').value } });
    });
  }

  public onSubmitForm(): void {
    this.formSubmit$.next({});
    this._service.formSubmit$.next(true);
  }

  private _watchForPageChanges(): void {
    this._service.pageState$
      .pipe(
        filter(Boolean)
      )
      .subscribe((queryParams: any) => {
        const { limit, page } = queryParams;
        this.filterForm.get('pagination').get('pageIndex').setValue(page || 1, { emitEvent: true });
        this.filterForm.get('pagination').get('pageSize').setValue(limit || 10, { emitEvent: true });
        this.formSubmit$.next({});
      });
  }

  private _watchForRouteParamsChanges(): void {
    this._activatedRoute.queryParamMap
      .pipe(
    )
      .subscribe((queryParams: Params) => {
        this.queryParams.next(queryParams);
      });
  }

  private _watchForSubmitFormChanges(): void {
    const formValue$ = this.formSubmit$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(() => this._service.filterUpdateAsync2(this._createTakeFilter())),
        shareReplay(1),
        takeUntil(this._destroy$),
      );

    formValue$.subscribe(() => { });
  }

  private _createTakeFilter(): IFilterRequest {
    return {
      ...this.filterForm.value,
      ...this._createFilterParam(),
    };
  }

  private _createFilterParam(): IFilterRequest {
    return {
      squadIds: this.filterForm.get('squadIds').value?.map((data) => data?.id) || [],
      countryIds: this.filterForm.get('countryIds').value?.map((data) => data?.id) || [],
      taxonName: this.filterForm.get('taxonName').value?.caption || '',
      colorIds: this.filterForm.get('colorIds').value?.map((data) => data?.id) || [],
    };
  }

  public getCountryFields() {
    this._service.getCountriesFilds()
      .pipe(
        filter(Boolean),
      ).subscribe((data) => {
        this.indexsCountry$.next(data);
      });
  }

  private _buildForm(): void {
    this.filterForm = this._fb.group({
      squadIds: new FormControl({ value: [], disabled: false }),
      countryIds: new FormControl({ value: [], disabled: false }),
      taxonName: new FormControl({ value: null, disabled: false }),
      frontFenderLength: this._fb.group({
        min: new FormControl(filterValuesDefault.frontFenderLength.values.from),
        max: new FormControl(filterValuesDefault.frontFenderLength.values.to),
      }),
      colorIds: new FormControl({ value: [], disabled: false }),
      summerTime: this._fb.group({
        min: new FormControl(filterValuesDefault.summerTime.values.from),
        max: new FormControl(filterValuesDefault.summerTime.values.to),
      }),
      settingUpIssuance: this._fb.group({
        photo: new FormControl({ value: filterValuesDefault.photo.values[0], disabled: false }),
        imageSize: new FormControl({ value: filterValuesDefault.imageSize.values[0], disabled: false }),
        typeOfIllustrations: new FormControl({ value: filterValuesDefault.typeOfIllustrations.values.options[0], disabled: false }),
        sortBy: new FormControl({ value: filterValuesDefault.typeOfIllustrations.values.options[1], disabled: false }),
      }),
      pagination: this._fb.group({
        pageSize: new FormControl({ value: 10, disabled: false }),
        pageIndex: new FormControl({ value: 1, disabled: false }),
      }),
      sort: new FormControl({ value: null, disabled: false })
    });

  }

  public onReset() {
    this.filterForm.reset({ emitEvent: false, onlySelf: true });
  }

  public onShow(event) {
    if (event) {
      this.isOpen = true;
      this.marginP = `${event.target.querySelector(".p-component").offsetHeight}px`;
      this.cd.detectChanges();
    }
  }

  public onCollapsedChange(event) {
    console.log(event, 'event')
  }

  public onHide(event) {
    this.isOpen = false;
    this.marginP = '0px';
    this.cd.detectChanges();
  }
  public onSearch(event: AutoCompleteCompleteEvent) {
    let query = event.query;
    this._service.autoComplete({ query })
      .pipe(

    ).subscribe((data) => {
      console.log(data, 'data')
      this.itemsTaxon$.next(data.items);
      this.cd.detectChanges();
    });
  }

}
