import React from 'react';

class Micomponente extends React.Component{
    render(){
        let receta = {
            nombre : 'pizza',
            ingredientes : ['harina, ','tomates, ','jamon, ','queso'],
            calorias : 400,
        }
        return (
            <div className="mi-componente">
            <h1>lo que vamos a preparar es : {receta.nombre} </h1>
            <h2>Las calorias son : {receta.calorias} </h2>
            <ol>
                {
                    receta.ingredientes.map((ingredientes,i) =>{
                        return (
                            <li key={i}>
                                {ingredientes}
                            </li>
                        )
                    })
                }

            </ol>
            </div>
        );
    }
}

export default Micomponente;