import React,{ Component } from 'react';
import { Redirect } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import axios from 'axios';
import Global from  '../Global'
import Sidebar from './Sidebar';
import swal from 'sweetalert';
import logonull from '../assets/images/logo-null.jpg';


// 1. Tnemos recoger el id del articulo a editar de la url
// 2. crear un metodo para sacar ese objeto del backend
// 3. repoblar / rellanar el formulario con esos datos 
// 4. actualizar el objeto haciendo una peticio al backend

class EditArticle extends Component{

    articleId = null;

    url = Global.url
    titleRef = React.createRef();
    contentRef = React.createRef();
    
    state = {
        article: {},
        status:null,
        selectedFile: null
    };

    validator = new SimpleReactValidator({
        messages:{
            required:'Este campo es requerido'
        }
    });

    componentDidMount(){
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/'+ id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            });
    }


    changeState = () =>{
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image,
            }
        });
        this.validator.showMessages();
        this.forceUpdate();
        
    }

    saveArticle = (e) =>{
        e.preventDefault();

        //rellenar state con formulario
        this.changeState();

        if(this.validator.allValid()){ 

            // Hacer una petición http por post para guardar el articulo
            axios.put(this.url +'article/' + this.articleId, this.state.article)
                .then(res =>{
                    if(res.data.article){
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Articulo creado correctamente',
                            'El articulo ha sido crado correctamente',
                            'success'
                        )
                        //subir la imagen
                        if(this.state.selectedFile !== null){

                            // sacar el id de el articulo guardado
                            var articleId = this.state.article._id;

                            //crear form data y añadir fichero
                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );
                            //Petecion ajax

                            axios.post(this.url + 'upload-image/'+ articleId,formData)
                                .then(res => {
                                    if(res.data.article){
                                        this.setState({
                                            article: res.data.article,
                                            status:'success'
                                        });
                                    }else{
                                        this.setState({
                                            article: res.data.article,
                                            status:'failed'
                                        });
                                    }
                                
                                });
                            
                            
                        }else{
                            this.setState({
                                status: 'success'
                        });
                        }

                    }else{
                        this.setState({
                            status: 'failed'
                        });
                    }
                });
            }else {
                this.setState({
                    status: 'failed'
                });

                this.validator.showMessages();
                this.forceUpdate();
            }
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    render(){
        console.log(this.state.article)
        if(this.state.status === 'success'){
            return <Redirect to ="/blog" />
        }

        var article = this.state.article;
        
        return(
            <div className="center">
                <section id="content">
                    <h1 className="subheader">Editar articulo</h1>

                    {this.state.article.title &&
                    
                        <form className="mid-form" onSubmit={this.saveArticle}>

                        <div className="form-group">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />

                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}

                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState}></textarea>
                            {this.validator.message('content', this.state.article.content, 'required')}
                        </div>
                        <div className="form-group">
                            <label htmlFor="file0">Imagen</label>
                          
                            <input type="file" name="file0"  onChange={this.fileChange} />
                            <div className="image-wrap" >
                                { 
                                    article.image !== null ? (
                                        <img  src={this.url+'get-image/'+ article.image} alt={article.title} className="thumb"  />
                                    ):(
                                        <img src={logonull} alt={article.title} className="thumb" />
                                    )
                                    
                                }
                            </div>
                        </div>
                        <div className="clearfix"></div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>

                    }
                    
                    {!this.state.article.title &&
                        <h1 className="subheader">Cargando...</h1>

                    }

                
                </section>
                
                <Sidebar />
            </div>
        )
    }
}
export default EditArticle;