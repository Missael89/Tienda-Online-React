/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

class barrabuscador extends React.Component {
    constructor() {
        super()
        this.state = {datos: []}
        this.filtrar = this.filtrar.bind(this)
    } 

    filtrar(event) {
        var filtro = event.target.value,
                datosFiltrados = [],
                longitudFiltro = event.target.value.length
        if (filtro.length) {
            for (let key in this.props.datos) {
                if (this.props.datos[key].nombre.substr(0, longitudFiltro) == filtro) {
                    datosFiltrados.push(this.props.datos[key])
                }
            }
            if (!datosFiltrados.length) {
                datosFiltrados = [{nombre: 'No Encontrado', precio: 0, disponible: 0, imagen: '', descripcion: ''}]
            }
        } else {
            datosFiltrados = []
        }

        this.props.filtrar(datosFiltrados)

    }
    render() {

        return(
                <div className="row">
                    <div className="col-lg-12">
                        <nav className="navbar navbar-dark bg-dark">
                            <div className="container-fluid">
                                <div className="navbar-header">
                                    <span className="navbar-brand">Catalogo de Productos</span>
                                </div>
                                <div className="nav navbar-nav navbar-right">
                                    <div className="input-group">
                                        <span className="input-group-addon"><i className="fi-magnifying-glass text-white"></i></span>
                                        <input type="text" className="form-control" onChange={this.filtrar}/>
                                    </div>
                
                                </div>
                            </div>
                        </nav>
                    </div>
                
                
                </div>


                );
    } 

}

export default barrabuscador;