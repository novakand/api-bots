import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsListPreloaderComponent } from './items-list-preloader.component';

describe('ItemsListPreloaderComponent', () => {
  let component: ItemsListPreloaderComponent;
  let fixture: ComponentFixture<ItemsListPreloaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsListPreloaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemsListPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
