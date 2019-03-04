import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-map-editor',
  templateUrl: './map-editor.component.html',
  styleUrls: ['./map-editor.component.scss']
})
export class MapEditorComponent implements OnInit {

  svg;
  width: number = 0;
  height: number = 0;

  constructor() { }

  ngOnInit() {
    this.svg = d3.select('svg');
    this.width = this.svg.node().getBoundingClientRect().width;
    this.height = this.svg.node().getBoundingClientRect().height;

    this.initMenu();
    this.initMap();
  }


  circle;
  selectedShape;
  initMenu() {
    let menu = this.svg.select('.menu');

    menu.append('use')
      .attr('id', 'iwifi')
      .attr('href', '#wifi')
      .attr('x', 20)
      .attr('y', 50)
      .attr('init-x', 20)
      .attr('init-y', 50)
      .style('cursor', 'pointer')
      .attr('iclass', 'iwifi')
      .attr('class', 'iwifi draggable');
    
    menu.append('rect')
      .attr('id', 'irect')
      .attr('iclass', 'irect')
      .attr('x', 100)
      .attr('y', 50)
      .attr('init-x', 100)
      .attr('init-y', 50)
      .attr('width', 50)
      .attr('height', 50)
      .attr('fill', 'green')
      .attr('cursor', 'pointer')
      .attr('class', 'irect draggable');

    var deltaX, deltaY;
    var dragHandler = d3.drag()
      .on("start", function() {
        var current = d3.select(this);
        deltaX = (current.attr("x") as any) - d3.event.x;
        deltaY = (current.attr("y") as any) - d3.event.y;
      })
      .on("drag", function() {
        d3.select(this)
          .attr("x", d3.event.x + deltaX)
          .attr("y", d3.event.y + deltaY);
      })
      .on('end', function() {
        var elem = d3.select(this);
        elem.attr("x", elem.attr('init-x'));
        elem.attr("y", elem.attr('init-y'));
        var elemId = elem.attr('iclass');
        var mouseCoordinates = d3.mouse(this as any);
        if (mouseCoordinates[0] > 200) {
          if (elemId === 'irect') {
            var id = d3.selectAll('.irect').size();
            d3.select('svg').append('rect')
              .attr('id', `irect-${id}`)
              .attr('x', mouseCoordinates[0])
              .attr('y', mouseCoordinates[1])
              .attr('width', 50)
              .attr('height', 50)
              .attr('fill', 'green')
              .style('cursor', 'pointer')
              .classed('irect', true)
              .call(
                d3.drag()
                  .on('drag', move).subject(function() {
                    var t = d3.select(this);
                    return { x: t.attr("x"), y: t.attr("y") };
                  })
                  .on('end', endDrag)
              );
          }
          if (elemId === 'iwifi') {
            var id = d3.selectAll('.iwifi').size();
            d3.select('svg').append('use')
              .attr('id', `iwifi-${id}`)
              .attr('href', '#wifi')
              .attr('x', mouseCoordinates[0])
              .attr('y', mouseCoordinates[1])
              .style('cursor', 'pointer')
              .classed('iwifi', true)
              .call(
                d3.drag()
                  .on('drag', move).subject(function () {
                    var t = d3.select(this);
                    return { x: t.attr("x"), y: t.attr("y") };
                  })
                  .on('end', endDrag)
              );;
          }
          
        }
      });

    dragHandler(this.svg.selectAll('.draggable'))

    var $width = this.width;
    var $height = this.height;
    function move() {
      let shapeWidth = d3.select(this).node().getBoundingClientRect().width as any;
      let shapeHeight = d3.select(this).node().getBoundingClientRect().width as any;
      let mouseCoordinates = d3.mouse(this as any);
      //200 width of menu
      // if ( (mouseCoordinates[0] > 200 && mouseCoordinates[0] < ($width - shapeWidth))
      //   && (mouseCoordinates[1] < ($height - shapeHeight) && mouseCoordinates[1] > (shapeHeight)) ) {
        d3.select(this)
          .attr('x', d3.event.x)
          .attr('y', d3.event.y);
        this.parentNode.appendChild(this);
      // }
    };

    function endDrag() {
      let mouseCoordinates = d3.mouse(this as any);
      let _width = $width-200-50;
      let _height = $height-50;
      if (mouseCoordinates[0] > _width || mouseCoordinates[1] > _height) {
        d3.select(this).remove()
      }
    }

  }

  initMap() {
    let map = this.svg.append('g')
      .attr('class', 'map')
      .attr('transform', `translate(${200} ,0)`);

    map.append('use')
      .attr('id', 'trash')
      .attr('href', '#trash')
      .attr('x', this.width-200-50)
      .attr('y', this.height-50);

  }

}
