import { Component, OnInit } from '@angular/core';
import { SiloService } from 'src/app/services/silo.service';
import { PhotoService } from 'src/app/services/photo.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ISilo } from 'src/app/interfaces/silo';
import { IPedido } from 'src/app/interfaces/pedido';
import { Photo } from 'src/app/interfaces/photo';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  silos: ISilo[];
  pedidos: IPedido[];
  photos: Photo[];
  idPedido: string;
  nowYear:number = new Date().getFullYear();
  dataSilos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  selected: string = '';
  selected2: string = '';
  

  selectedYear:string='';
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [{
    data: [], label: ""
  }];
  public barChartData2: ChartDataSets[] = [{
    data: [], label: ""
  }];

  constructor(private siloService: SiloService, private photoService: PhotoService, private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.cargarDatos();
    this.barChartData=[{data:[],label:"No hay resultados"}];
    this.barChartData2=[{data:[],label:"No hay resultados"}];


  }
  cargarDatos() {
    this.photoService.getPhotos().subscribe(res => {
      this.photos = res;
    });
    this.pedidoService.getPedidos().subscribe(res => {
      this.pedidos = res;

    });
    this.siloService.getSilos().subscribe(res => {
      this.silos = res;

    });

  }
  generarEstadisticas() {
    var pedido;
    console.log(this.selected);
    
    if (this.selected != '') {
      this.pedidos.forEach(element => {
        console.log(element);

        if (this.selected == element.producto) {
          let date = new Date(element.createdAt);
          pedido = element.nameProducto;
          let yearNow = new Date().getFullYear();
          console.log(date);
          let month = date.getMonth();
          let year = date.getFullYear();

          if (year == yearNow) {
            this.dataSilos[month] = element.cantidad;

          }
        }

      });
      this.barChartData = [

        { data: this.dataSilos, label: pedido }

      ];

    }

  }

  generarAnuales() {
    var pedido;
    console.log(this.selected2);
    if (this.selected2 != '') {
      this.pedidos.forEach(element => {
        let date = new Date(element.createdAt);
        let month = date.getMonth();
        let year = date.getFullYear();

        if (this.selected2 == element.producto && this.selectedYear==year.toString()) {
          pedido = element.nameProducto;
            this.dataSilos[month] = element.cantidad;
            this.barChartData2 = [

              { data: this.dataSilos, label: pedido }
      
            ];
          
        }else{
          this.barChartData2=[{data:[],label:"No hay resultados"}];

        }

      });
      

    }

  }








}
