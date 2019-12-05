import { Component, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { AngularFireDatabase } from '@angular/fire/database';

am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-logarithmic',
  templateUrl: './logarithmic.component.html',
  styles: []
})
export class LogarithmicComponent  {

  private chart: am4charts.XYChart;
  items: any[]=[];
  esPrimeraPasada:boolean=true;

  constructor(private zone: NgZone,private angularFire:AngularFireDatabase)   {
    console.log(1);
    this.angularFire.list('/temperaturas').valueChanges().subscribe(res=>{ 

      if(this.esPrimeraPasada ){
        res.forEach(element=>{
          this.items.push(element);
        }); 
        console.log("Paso la primera pasada");
        this.esPrimeraPasada=false;
      
      }else{
        console.log("No es la primera pasada");
        let ultimoElemento=res[res.length-1];
        this.items.push(ultimoElemento);
      }
      
      this.crearGrafico();
      
    })
    
  }

  crearGrafico() {
    console.log(2);
    
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      console.log(3);
  
      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < this.items.length; i++) {
        
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: this.items[i-1] });
      }
      console.log("El valor de la data es :",data);

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      this.chart = chart;
    });
}

ngOnDestroy() {
  this.zone.runOutsideAngular(() => {
    if (this.chart) {
      this.chart.dispose();
    }
  });
}


}
