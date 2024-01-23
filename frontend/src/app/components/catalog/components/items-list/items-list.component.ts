import { Component, Inject, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ViewMode } from '../../enums/view-mode.enums';
import { BehaviorSubject, Subject, filter, shareReplay, takeUntil } from 'rxjs';

import { Router } from '@angular/router';
import { WINDOW } from 'src/app/window-token';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit, OnDestroy {

  @Input() public viewMode: ViewMode = ViewMode.list;

  public first: number = 0;
  public page = 0;
  public totalRecords = 120;
  public rows = 10;

  public items$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private _destroy$ = new Subject<boolean>();

  public onPageChange(event) {
    this._service.pageState$.next({ page: event.page + 1, limit: event.rows });
    this.items$.next([]);
  }

  constructor(
    private _service: CatalogService,
    private router: Router,
    @Inject(WINDOW) private window: Window
  ) {
    this.router.navigate(['/catalog'], { queryParams: { page: 1, limit: this.rows } });
  }

  public ngOnInit(): void {
    this._watchForFilterUpdateChanges();
    this._watchForFormSubmit();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.viewMode && changes.viewMode.currentValue) {

    }
  }

  public ngOnDestroy(): void { }

  public trackByFn(index, item): string {
    return item.id;
  }

  public trackByFnParant(index, item) {
    return item.id;
  }

  private _watchForFormSubmit(): void {
    this._service.formSubmit$
      .pipe(
        filter(Boolean),
        shareReplay(1),
        takeUntil(this._destroy$),
      ).
      subscribe(() => {
        this.items$.next([]);
      });
  }

  private _watchForFilterUpdateChanges(): void {
    this._service.query$
      .pipe(
        filter(Boolean),
        shareReplay(1),
        takeUntil(this._destroy$),
      ).
      subscribe((data: any) => {
        this.items$.next(data.items);
        this.totalRecords = data?.meta?.total;
      });
  }
}
