import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './components/catalog/components/catalog/catalog.component';
import { GalleryComponent } from './components/gallery/gallery/gallery.component';
import { ClassificationComponent } from './components/classification/classification/classification.component';
import { LiteratureComponent } from './components/literature/literature/literature.component';
import { MapsComponent } from './components/maps/maps/maps.component';
import { ForumComponent } from './components/forum/forum/forum.component';
import { ProjectsComponent } from './components/projects/projects/projects.component';
import { CollectionsComponent } from './components/collections/collections/collections.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: CatalogComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'classification',
    component: ClassificationComponent
  },
  {
    path: 'literature',
    component: LiteratureComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'collections',
    component: CollectionsComponent
  },
  {
    path: 'maps',
    component: MapsComponent
  },
  {
    path: 'forum',
    component: ForumComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
