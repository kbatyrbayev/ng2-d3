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
  public imagePath;
  imgURL: any;
  public message: string;

  constructor() { }

  ngOnInit() {
    this.svg = d3.select('svg');
    this.width = this.svg.node().getBoundingClientRect().width;
    this.height = this.svg.node().getBoundingClientRect().height;

    this.initMenu();
    // this.initMap();
    // this.initMap2();
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Поддерживаются только изображения.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


  circle;
  selectedShape;
  initMenu() {
    let deltaX, deltaY;
    let leftSideWidth = (d3.select('#left-side').node() as HTMLElement).getBoundingClientRect().width;

    let divScrollTop = 0, divScrollLeft = 0;
    d3.select('.right-side')
      .on('scroll', function() {
        let elem = d3.select(this).node() as HTMLElement;
        divScrollLeft = elem.scrollLeft;
        divScrollTop = elem.scrollTop;
      });

    let dragHandler = d3.drag()
      .on("start", function() {
        let current = d3.select(this);
        deltaX = (current.node().getBoundingClientRect().left as any) - d3.event.x;
        deltaY = (current.node().getBoundingClientRect().top as any) - d3.event.y;
      })
      .on("drag", function() {
        let div = d3.select(this);
        div.style('top', d3.event.y + 'px')
        div.style('left', d3.event.x + 'px');
      })
      .on('end', function() {
        let div = d3.select(this);
        div.style("top", div.attr('init-y')+'px');
        div.style("left", div.attr('init-x')+'px');
        let iclass = div.attr('iclass');
        let mouseCoordinates = d3.mouse(this as any);

        if (mouseCoordinates[0] > leftSideWidth) {
          if (iclass === 'iwifi') {
            let id = d3.selectAll('.iwifi').size();
            d3.select('#map').append('use')
              .attr('id', `iwifi-${id}`)
              .attr('href', '#wifi')
              .attr('x', mouseCoordinates[0] - leftSideWidth + divScrollLeft)
              .attr('y', mouseCoordinates[1] + divScrollTop)
              .style('cursor', 'pointer')
              .classed('iwifi', true)
              .call(
                d3.drag()
                  .on('drag', move).subject(function () {
                    let t = d3.select(this);
                    return { x: t.attr("x"), y: t.attr("y") };
                  })
                  .on('end', endDrag)
              );
          }
          if (iclass === 'ipoint') {
            let id = d3.selectAll('.ipoint').size();
            d3.select('#map').append('use')
              .attr('id', `ipoint-${id}`)
              .attr('href', '#point')
              .attr('x', mouseCoordinates[0] - leftSideWidth + divScrollLeft + 75)
              .attr('y', mouseCoordinates[1] + divScrollTop + 25)
              .style('cursor', 'pointer')
              .classed('ipoint', true)
              .call(
                d3.drag()
                  .on('drag', move).subject(function () {
                    let t = d3.select(this);
                    return { x: t.attr("x"), y: t.attr("y") };
                  })
                  .on('end', endDrag)
              );
          }
          
        }
      });

    dragHandler(d3.selectAll('.draggable'));
    // dragHandler(this.svg.selectAll('.draggable'))

    let $width = this.width;
    let $height = this.height;
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
    let mapSvg = d3.select('#map');
    

    let width = (mapSvg.node() as HTMLElement).getBoundingClientRect().width;
    let height = (mapSvg.node() as HTMLElement).getBoundingClientRect().height;

    mapSvg.append('use')
      .attr('id', 'trash')
      .attr('href', '#trash')
      .attr('fill', '#3E3E3E')
      .attr('x', width-50)
      .attr('y', height-50);

  }


  lineSelected = false;
  selectLine() {
    this.lineSelected = true;
    d3.select('#map')
      .style('cursor', 'crosshair');

    

  }

}
