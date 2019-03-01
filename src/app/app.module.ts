import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { MapEditorComponent } from './components/map-editor/map-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    LineChartComponent,
    MapEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
