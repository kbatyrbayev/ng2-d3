import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { MapEditorComponent } from './components/map-editor/map-editor.component';
import { ComingSoonComponent } from './components/coming-soon/coming-soon.component';

const routes: Routes = [
  { path: 'line-chart', component: LineChartComponent },
  { path: 'pie-chart', component: ComingSoonComponent },
  { path: 'map', component: ComingSoonComponent },
  { path: 'chart1', component: ComingSoonComponent },
  { path: 'chart2', component: ComingSoonComponent },
  { path: 'map-editor', component: MapEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  routes = routes;

}
