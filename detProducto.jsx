/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { Link} from 'react-router-dom';
import * as request from 'superagent';

class Detalle extends React.Component {
    constructor() {
        super()
        this.state = {datos: {}, producto: [], url: ''}
    }
    componentWillMount() {
        for (let key in this.props.datos) {
            if (this.props.datos[key].nombre == this.props.rutaId.match.params.id) {
                this.setState({producto: this.props.datos[key]})

                let urlString = this.props.datos[key].imagen.slice(2)
                this.setState({url: urlString})

            }
        }


    }

    render() {

        return(
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 contenedor-producto-detalle">
                            <div className="row">
                                <div className="col-lg-12 ">
                                    <h2>{this.state.producto.nombre}</h2>
                
                                </div>			
                            </div>
                            <div className="row">
                                <div className="col-lg-6 contenedor-producto-imagen">
                                    <img className="img-responsive center-block img-producto" src={this.state.url} alt=""/>
                                </div>		
                                <div className="col-lg-6 contenedor-producto-info">
                                    <p>Precio:$ {this.state.producto.precio}</p>
                                    <p>Cantidad Disponible:{this.state.producto.disponible} </p>
                                    <p>{this.state.producto.descripcion}</p>
                                </div>		
                            </div>
                            <div className="row">
                                <div className="col-lg-12 contenedor-producto-botones">
                
                                    <Link to='/catalogo' className="btn btn-default"> Atrás</Link>
                                </div>		
                            </div>
                        </div>
                
                    </div>
                </div>

                );
    }

} 

export default Detalle;