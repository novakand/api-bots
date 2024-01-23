import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule, MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { JwtHelperService, JWT_OPTIONS } from "@auth0/angular-jwt";
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownModule } from 'ngx-markdown';
import { WINDOW_PROVIDERS } from './window-token';
import { FilterComponent } from './components/catalog/components/filter/filter.component';
import { CatalogComponent } from './components/catalog/components/catalog/catalog.component';
import { ItemsListComponent } from './components/catalog/components/items-list/items-list.component';
import { GalleryComponent } from './components/gallery/gallery/gallery.component';
import { ClassificationComponent } from './components/classification/classification/classification.component';
import { LiteratureComponent } from './components/literature/literature/literature.component';
import { MapsComponent } from './components/maps/maps/maps.component';
import { ForumComponent } from './components/forum/forum/forum.component';
import { ProjectsComponent } from './components/projects/projects/projects.component';
import { CollectionsComponent } from './components/collections/collections/collections.component';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ScrollTopModule } from 'primeng/scrolltop';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FooterComponent } from './components/footer/components/footer/footer.component';
import { HeaderComponent } from './components/header/components/header/header.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ListboxModule } from 'primeng/listbox';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';
import { ItemsListPreloaderComponent } from './components/catalog/components/catalog/items-list-preloader/items-list-preloader.component';
import { BindQueryParamDirective } from './directives/bind-query-param.directive';
import { HttpClientService } from './services/http-client.service';
import { SettingsService } from './services/settings.service';
import { CatalogService } from './components/catalog/services/catalog.service';
import { HighlightPipe } from './pipes/highlight.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    CatalogComponent,
    ItemsListComponent,
    GalleryComponent,
    ClassificationComponent,
    LiteratureComponent,
    MapsComponent,
    ForumComponent,
    ProjectsComponent,
    CollectionsComponent,
    FooterComponent,
    HeaderComponent,
    ItemsListPreloaderComponent,
    BindQueryParamDirective,
    HighlightPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressBarModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MarkdownModule.forRoot(),
    ScrollTopModule,
    PaginatorModule,
    CheckboxModule,
    RadioButtonModule,
    CascadeSelectModule,
    InputGroupModule,
    InputTextModule,
    ButtonModule,
    InputGroupAddonModule,
    AutoCompleteModule,
    ListboxModule,
    KeyFilterModule,
    PanelModule,
    SkeletonModule,


  ],
  providers: [
    WINDOW_PROVIDERS,
    HttpClientService,
    CatalogService,
    SettingsService
  ],
  bootstrap: [AppComponent]
})



// const EXPANSION_PANEL_ANIMATION_TIMING = '3000ms cubic-bezier(0.4,0.0,0.2,1)';
// MatExpansionPanel['decorators'][0].args[0].animations = [
//   trigger('bodyExpansion', [
//     state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
//     state('expanded', style({ height: '*', visibility: 'visible' })),
//     transition('expanded <=> collapsed, void => collapsed',
//       animate(EXPANSION_PANEL_ANIMATION_TIMING)),
//   ])];
export class AppModule { }

