import React, { Component } from "react";
import Pelicula from "./Pelicula";
import Slider from "./Slider";
import Sidebar from "./Sidebar";

class Peliculas extends Component {
  state = {
    peliculas: [
      {
        titulo: "kimi no na wa",
        imagen:
          "https://tintaindomita.com/wp-content/uploads/2020/05/Kimi-no-Na-wa-Your-name.jpg",
      },
      {
        titulo: "No Game No Life- Zero",
        imagen: "https://i.blogs.es/da7145/zero/1366_2000.jpg",
      },
      {
        titulo: "Rescatando al Soldado Rian",
        imagen:
          "https://www.infobae.com/new-resizer/kMZXKVwxqBOvrD5rn7QgKn2L7lo=/1200x900/filters:format(jpg):quality(85)/s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2018/02/15113905/rescatando-al-solda-do-ryan-1920-matt-damon-tom-hanks-3.jpg",
      },
    ],
    nombre: "panda",
    Favorita: {},
  };

  CambiarTitulo = () => {
    var { peliculas } = this.state;
    peliculas[2].titulo = "Rescatando al Soldado Ryan";

    this.setState({
      peliculas: peliculas,
    });
  };

  favorita = (pelicula) => {
    console.log("favorita marcada");
    console.log(pelicula);
    this.setState({
      Favorita: pelicula,
    });
  };
  render() {
    var pStyle = {
      background: "blue",
      color: "white",
      padding: "10px",
    };
    return (
      <React.Fragment>
        <Slider title="Peliculas" size="slider-small" />
        <div className="center">
          <div id="content" className="Peliculas">
            <h2 className="subheader">Listado de peliculas</h2>
            <p>Seleccion de las peliculas favoritas de {this.state.nombre} </p>
            <p>
              <button onClick={this.CambiarTitulo}>Cambiar Titulo</button>
            </p>

            {this.state.Favorita.titulo ? (
              <p className="favorita" style={pStyle}>
                <strong>La pelicula favorita es :</strong>
                <span>{this.state.Favorita.titulo} </span>
              </p>
            ) : (
              <p>No hay pelicula favorita</p>
            )}

            {/*crear el componente pelicula*/}
            <div id="articles" className="peliculas">
              {this.state.peliculas.map((pelicula, i) => {
                return (
                  <Pelicula
                    key={i}
                    pelicula={pelicula}
                    marcarFavorita={this.favorita}
                  />
                );
              })}
            </div>
          </div>
          <Sidebar blog="false" />
        </div>
      </React.Fragment>
    );
  }
}
export default Peliculas;
