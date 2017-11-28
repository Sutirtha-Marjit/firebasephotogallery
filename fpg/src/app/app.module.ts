import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CreatedesignComponent } from './comps/createdesign/createdesign.component';
import { PageNotFoundComponent } from './comps/page-not-found/page-not-found.component';
import { TableViewComponent } from './comps/table-view/table-view.component';
import { GridViewComponent } from './comps/grid-view/grid-view.component';
import { DetailViewComponent } from './comps/detail-view/detail-view.component';
import {FireBasePropertiesService} from './services/fire-base-properties.service';

const appRoutes: Routes =[
  {path:'create-new-design',component:CreatedesignComponent},
  {path:'grid-view',component:GridViewComponent},
  {path:'table-view',component:TableViewComponent},
  {path:'detail-view',component:DetailViewComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    CreatedesignComponent,
    PageNotFoundComponent,
    TableViewComponent,
    GridViewComponent,
    DetailViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    FireBasePropertiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
