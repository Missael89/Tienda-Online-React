/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Producto from './producto.jsx'
import * as request from 'superagent'

        function ListaProductos(props) {
            const productos = props.bodega;
            const listItems = productos.map((producto) =>
                <div className="col-lg-3">
                    <div className="contenedor-galeria">
                        <Producto producto={producto} actualizaCantidad={props.actualizaCantidad} actualizaCarrito={props.actualizaCarrito} />
                    </div>
                </div>


            );
            return (
                    <div className="row">{listItems}</div>
                    );
        }



class galeria extends React.Component {
    constructor() {
        super()
        this.state = {datos: []}
        this.actualizaCantidad = this.actualizaCantidad.bind(this)
        this.actualizaCarrito = this.actualizaCarrito.bind(this)
    }

    actualizaCantidad(unidades) {
        this.props.actualizaCantidad(unidades)
    }

    actualizaCarrito() {
        this.props.actualizaCarrito()
    }
    render() {

        return(
                <div className="container">
                
                    <ListaProductos bodega={this.props.datos} actualizaCantidad = {this.actualizaCantidad} actualizaCarrito = {this.actualizaCarrito} />
                
                </div>


                );
    }

}

export default galeria;
