import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { MapEditorComponent } from './components/map-editor/map-editor.component';

const routes: Routes = [
  { path: 'line-chart', component: LineChartComponent },
  { path: 'pie-chart', component: LineChartComponent },
  { path: 'map', component: LineChartComponent },
  { path: 'chart1', component: LineChartComponent },
  { path: 'chart2', component: LineChartComponent },
  { path: 'map-editor', component: MapEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  routes = routes;

}
