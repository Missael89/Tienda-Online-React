/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import * as request from 'superagent';
import { Link} from 'react-router-dom';

function ListaProductos(props) {
    const productos = props.carrito;
    var template = []
    for (let key in productos) {
        template.push(productos[key])
    }
    
    const listItems = template.map((producto) =>
        <div className="col-lg-12  contenedor-producto-pedido">
            <div className="row">
                <div className="col-lg-3 contenedor-imagen-pedido">
                    <img className="img-responsive img-carrito" src={producto.imagen} alt=""/>			
                </div>
                <div className="col-lg-9 contenedor-datos-pedido">
                    <h4>{producto.nombre}</h4>
                    <h6>Unidades: {producto.unidades}</h6>			
                </div>		
            </div>
            <div className="row">
                <div className="col-lg-12 contenedor-subtotal-pedido">
                    <h5>Subtotal: ${producto.subtotal}</h5>			
                </div>		
            </div>	
        </div>


    );
    return (
            <div >{listItems}</div>
            );
}

class carrito extends React.Component {
    constructor() {
        super()
        this.state = {datos: [], total: 0}
        this.actualizaCarrito = this.actualizaCarrito.bind(this)
    }

    actualizaCarrito() {
        this.props.pagar(this.props.datos)

    }

    render() {

        return(
                <div className="row">
                    <div className="col-lg-12 contenedor-carrito">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2>Carrito de compras</h2>
                            </div>		
                        </div>
                        <div className="row">			
                            <div className='col-lg-7'>					
                                <ListaProductos carrito={this.props.datos}/>
                            </div>
                
                            <div className="col-lg-4 col-lg-offset-1">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h4 className="total">Total: ${this.props.total}</h4>	
                                    </div>				
                                </div>
                                <div className="row">
                                    <div className="col-lg-3">
                                        <Link to="/catalogo" className="btn btn-danger boton-cancelar">Cancelar</Link>
                                    </div>	
                                    <div className="col-lg-3">
                                        <Link to='/catalogo'  className="btn btn-success boton-pagar" onClick={this.actualizaCarrito} >Pagar</Link>
                                    </div>				
                                </div>
                            </div>		
                        </div>
                    </div>	
                </div>



                );
    } 

} 

export default carrito;