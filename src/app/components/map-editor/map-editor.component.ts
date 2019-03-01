import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent implements OnInit {

  svg;

  constructor() { }

  ngOnInit() {
    this.svg = d3.select('svg');
    console.log(this.svg)

    this.svg.on("click", function () {
      var mouse = d3.mouse(this);
      console.log(this.selectedShape, 'selectedShape')
      d3.select(this).append(this.selectedShape)
        .attr('cx', mouse[0])
        .attr('cy', mouse[1])
        .attr('r', 30)
        .attr('fill', 'red');
      // d3.select(this).append('circle')
      //   .attr('cx', mouse[0])
      //   .attr('cy', mouse[1])
      //   .attr('r', 30)
      //   .attr('fill', 'red');
      console.log(mouse, 'mouse0')
    });

    this.initMenu();
    this.initMap();
    this.drag();

  }


  circle;
  selectedShape;
  initMenu() {
    let menu = this.svg.append('g')
      .attr('class', 'menu');

    menu.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 200 + 'px')
      .attr('height', '100%')
      .attr('fill', 'grey')
      .attr('opacity', 0.3);

    this.circle = menu.append('circle')
      .attr('cx', 50)
      .attr('cy', 75)
      .attr('r', 30)
      .attr('fill', 'red')
      .attr('cursor', 'pointer')
      .classed('draggable', true)
      .on('click', function() {
        d3.select(this)
        .attr('stroke', 'black')
        .attr('stroke-width', 3);
        this.selectedShape = 'circle';
        console.log(this.selectedShape);
        d3.select(this.svg)
        .append(this);
        d3.event.stopPropagation();
      });;
    
    menu.append('rect')
      .attr('x', 100)
      .attr('y', 50)
      .attr('width', 50)
      .attr('height', 50)
      .attr('fill', 'green')
      .attr('cursor', 'pointer')
      .classed('draggable', true);
  }

  initMap() {
    let map = this.svg.append('g')
      .attr('class', 'map')
      .attr('transform', `translate(${200} ,0)`);

    map.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 50)
      .attr('height', 50);

  }

  drag() {
    var dragHandler = d3.drag()
      .on("drag", function () {
        d3.select(this)
          .attr("x", d3.event.x)
          .attr("y", d3.event.y);
      });
    dragHandler(this.svg.selectAll("draggable"));
  }

}
