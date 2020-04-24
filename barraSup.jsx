/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { Link} from 'react-router-dom';
import ReactDOM from 'react-dom'

        class barrasup extends React.Component {

    constructor() {
        super()
        this.state = {cantidad: 0}

    }

    render() {

        return(
                
                    <nav className="navbar navbar-dark bg-dark">
                        <a className="navbar-brand" href="#">La Bodega</a>
                
                        <ul className="nav navbar-nav navbar-right">
                            <li className="icono"><Link to='/catalogo' ><i className="fi-thumbnails"></i></Link></li>
                            <li className="icono"><Link to='/catalogo/carrito'><i className="fi-shopping-cart "></i>: <span  className="icono" id="icono-cantidad">{this.props.cantidad}</span></Link></li>
                            <li className="icono"><Link to='/' onClick={this.props.logout}><i className="fi-arrow-right"></i></Link></li>
                        </ul>
                    </nav>
                



                );
    }

    componentWillUpdate(nuevoEstado, anteriorEstado) {

        var iconoCantidad = document.getElementById('icono-cantidad')

        if (nuevoEstado.cantidad > 0) {
            ReactDOM.findDOMNode(iconoCantidad).style.backgroundColor = 'red'
            ReactDOM.findDOMNode(iconoCantidad).style.color = 'white'
            ReactDOM.findDOMNode(iconoCantidad).style.borderRadius = '3px 3px'
        } else {
            ReactDOM.findDOMNode(iconoCantidad).style.backgroundColor = 'transparent'
            ReactDOM.findDOMNode(iconoCantidad).style.color = 'black'
            ReactDOM.findDOMNode(iconoCantidad).style.borderRadius = '0px 0px'
        }

    }

}

export default barrasup;