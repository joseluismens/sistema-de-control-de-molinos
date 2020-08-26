import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Producto } from '../../models/producto';
import { PesajeService } from '../../services/pesaje.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {


  productos:any[];
  pesajes:any[];
  meses:any[];
  constructor(private photoService:PhotoService,private pesajeService:PesajeService) { }
  saleData: any[];

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe(res=>{
      this.productos=res;
    });
    this.pesajeService.obtenerPesajes().subscribe(res=>{
      this.pesajes=res;
      console.log(res);
    });

  }

  aplicar(value:string,cov:string,mes:number):void{

    for (let index = 0; index < this.pesajes.length; index++) {
      if(this.pesajes[index].tipoTransaccion==cov){
        if(this.pesajes[index].tipoProducto==value){
          let dateP = new Date(this.pesajes[index].createdAt);
          console.log("si");
           this.saleData=[
          { name: this.pesajes[index].tipoPorducto, value:this.pesajes[index].pesoSalida-this.pesajes[index].pesoEntrada}];
          this.saleData=[this.saleData];
          window.location.reload();
        }
      }
    }

  }


}
