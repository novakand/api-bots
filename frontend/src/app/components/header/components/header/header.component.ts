import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete/autocomplete.interface';
import { BehaviorSubject } from 'rxjs';
import { CatalogService } from 'src/app/components/catalog/services/catalog.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  constructor(
    public cd: ChangeDetectorRef,
    private _service: CatalogService
  ) { }

  public options: any[] | undefined;
  public itemsTaxon$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public placeholder = 'Select Options';
  public optionGroupLabel = 'name';
  public optionLabel = 'name';
  public searchText = '';
  public selected: any;

  public ngOnInit(): void {

    this.options = [
      {
        name: 'Все отряды',
        value: 'AU',
      },
      {
        name: 'Coleoptera',
        value: 'AU',
      },
      {
        name: 'Hemiptera',
        value: 'AU',
      },
      {
        name: 'Lepidoptera',
        value: 'AU',
      },
      {
        name: 'Hymenoptera',
        value: 'AU',
      },
      {
        name: 'Odonata',
        value: 'AU',
      },
    ];

    this.selected = this.options[0];
  }

  public goToLink(id: string): void {
    window.open(`https://insecta.pro/ru/taxonomy/${id}`, "_blank");
  }

  public onSearch(event: AutoCompleteCompleteEvent) {
    let query = event.query;
    this.searchText = event.query;
    this._service.autoComplete({ query })
      .pipe(

    ).subscribe((data) => {
      const dataItems = [{ label: 'Полное соответствие', value: 'us', items: data.items }, { label: 'Не полное соответствие', value: 'us', items: data.items }];
      this.itemsTaxon$.next(Array.isArray(data?.items) && !data?.items?.length ? [] : dataItems);
      this.cd.detectChanges();
    });
  }
}
