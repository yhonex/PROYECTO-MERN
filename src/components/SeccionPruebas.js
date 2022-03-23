import React, {Component} from 'react';

import Micomponente from './Micomponente';
//import Peliculas from './Peliculas'


class SeccionPruebas extends Component {
  
   /* constructor(props){
        super(props);
        this.state = {
            contador : 0
        }
    }
   */
    state = {
        contador : 0
    }
    Holamundo(nombre, edad) {
        var presentacion = (
          <div>
            <h2>hola soy : {nombre} </h2>
            <h3>tengo {edad} años </h3>
          </div>
        );
        return presentacion;
      };
      
      sumar= (e) => {
       // this.contador = this.contador+1;
       this.setState({
           contador: (this.state.contador +1)
       })
      }
      
      restar = (e) => {
       // this.contador = this.contador-1;
        this.setState({
            contador: (this.state.contador -1)
        })
       }
      
      
    render(){
        var  nombre = "Panda"; 
        return (
            
            <div>
            <section id="content">

            <h2 className="subheader">Últimos artículos</h2>

          <p>Hello Word!</p>

          <h2 className="subheader">Funciones Y JSX Basico</h2>
          {this.Holamundo(nombre, 27)}

          <h2 className="subheader">componentes</h2>
          <section className="componentes">
            <Micomponente />
            <Micomponente />
          </section>

          <h2 className="subheader">Estado</h2>
            <p>
               Contador: {this.state.contador}
            </p>
            <p>
                <input type="button" value="Sumar" onClick={this.sumar}/>
                <input type="button" value="Restar" onClick={this.restar}/>
            </p>
        </section>
            
            </div>
        );
    }
}
export default SeccionPruebas;