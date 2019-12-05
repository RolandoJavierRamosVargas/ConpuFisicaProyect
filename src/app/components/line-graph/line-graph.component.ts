import { Component, OnInit, ViewChild } from '@angular/core';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';

import { AngularFireDatabase } from '@angular/fire/database'


@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styles: []
})
export class LineGraphComponent {


  items: any[]=[];
  esPrimeraPasada:boolean=true;
  constructor(private angularFire:AngularFireDatabase){
      
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
        
      })
      
      
  }

  public lineChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Tamales' },
     { data: this.items, label: 'Humedad' }
    // { data: this.numeros, label: 'Chorizo' }
  ];
  public lineChartLabels: Label[] = this.items;
  
  public lineChartOptions:any={
    responsive:true
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  public randomize(): void {
    let _lineChartData:Array<any>=new Array(this.lineChartData.length);

    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i]={data: new Array(this.lineChartData[i].data.length),label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) +1 );
      }
    }
    this.lineChartData=_lineChartData;
  }
  
  public chartClicked(e:any):void{
    console.log(e);
  }

  public chartHovered(e:any):void{
    console.log(e);
    
  }
}
