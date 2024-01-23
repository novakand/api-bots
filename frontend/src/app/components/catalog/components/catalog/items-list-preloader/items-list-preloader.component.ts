import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ViewMode } from '../../../enums/view-mode.enums';

@Component({
  selector: 'app-items-list-preloader',
  templateUrl: './items-list-preloader.component.html',
  styleUrl: './items-list-preloader.component.scss'
})
export class ItemsListPreloaderComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public viewMode: ViewMode = ViewMode.list;
  @Input() public count = 10;

  public skeletonHeightImage = '9.5vmin';

  public ngOnInit(): void { }

  public ngOnChanges(changes: SimpleChanges): void {
    changes.viewMode && this.setViewMode(this.viewMode);
  }

  public ngOnDestroy(): void { }

  public setViewMode(viewMode: ViewMode): void {
    this.setHeightImage(viewMode);
  }

  public setHeightImage(viewMode): void {
    this.skeletonHeightImage = viewMode === ViewMode.list ? '9.5vmin' : '18.5vmin';
  }
}
