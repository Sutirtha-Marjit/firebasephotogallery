import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CreatedesignComponent } from './comps/createdesign/createdesign.component';
import { PageNotFoundComponent } from './comps/page-not-found/page-not-found.component';
import { TableViewComponent } from './comps/table-view/table-view.component';
import { GridViewComponent } from './comps/grid-view/grid-view.component';
import { DetailViewComponent } from './comps/detail-view/detail-view.component';
import {FireBasePropertiesService} from './services/fire-base-properties.service';
import { DesignUploadComponent } from './comps/design-upload/design-upload.component';

const appRoutes: Routes =[
  {path:'create-new-design',component:CreatedesignComponent},
  {path:'grid-view',component:GridViewComponent},
  {path:'table-view',component:TableViewComponent},
  {path:'detail-view/:id',component:DetailViewComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    CreatedesignComponent,
    PageNotFoundComponent,
    TableViewComponent,
    GridViewComponent,
    DetailViewComponent,
    DesignUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,{useHash:true})
  ],
  providers: [
    FireBasePropertiesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
