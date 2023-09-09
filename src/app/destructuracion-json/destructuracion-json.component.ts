import { Component } from '@angular/core';

@Component({
  selector: 'app-destructuracion-json',
  templateUrl: './destructuracion-json.component.html',
  styleUrls: ['./destructuracion-json.component.css']
})
export class DestructuracionJsonComponent {
  arregloOriginal = [
    {
      aseguradora: "AFIRME",
      cotizacion: {
        cliente: {
          tipoPersona: "fisica",
          nombre: "prueba",
          apellidoPat: "prueba",
          apellidoMat: "prueba",
          rfc: "",
          fechaNacimiento: "01-01-2005",
          ocupacion: "",
          curp: "",
          direccion: {
            calle: "oriente 945",
            noExt: "410",
            noInt: "021",
            colonia: "prueba",
            codPostal: "56618",
            poblacion: "mexico",
            ciudad: "cdmx",
            pais: "mexico"
          },
          edad: "18",
          genero: "MASCULINO",
          telefono: "",
          email: ""
        }
      }
    }
  ]

  arregloModificado = JSON.parse(JSON.stringify(this.arregloOriginal));


  constructor() {

    this.modificarDatos();

  }

  ngOnInit(): void {

  }
  modificarDatos() {
    this.arregloModificado[0].cotizacion.cliente.nombre = "Juan";
    this.arregloModificado[0].cotizacion.cliente.apellidoPat = "Perez";
    this.arregloModificado[0].cotizacion.cliente.rfc = "ABCP123456789";
    this.arregloModificado[0].cotizacion.cliente.direccion.calle = "poniente 123";
    this.arregloModificado[0].cotizacion.cliente.direccion.ciudad = "Guadalajara";
  }

}
