import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ViewMode } from '../../enums/view-mode.enums';

import { Subject, filter, shareReplay, takeUntil } from 'rxjs';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogComponent implements OnInit, OnDestroy {

  public viewMode = ViewMode;
  public selectedViewMode = ViewMode.list;
  public selectedTotal = 0;

  private _destroy$ = new Subject<boolean>();

  constructor(
    public _cd: ChangeDetectorRef,
    private _service: CatalogService
  ) { }

  public ngOnInit(): void {
    this.selectedTotal = 0;
    this._cd.detectChanges();
    this._watchForFilterUpdateChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this._cd.detectChanges();
  }

  public onChangeViewMode(viewMode: ViewMode): void {
    this.selectedViewMode = viewMode;
  }

  private _watchForFilterUpdateChanges(): void {
    this._service.query$
      .pipe(
        filter(Boolean),
        shareReplay(1),
        takeUntil(this._destroy$),
      ).
      subscribe((data: any) => {
        this.selectedTotal = data?.meta?.total || 0;
      });
  }

}
