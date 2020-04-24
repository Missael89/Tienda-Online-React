/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import { Link} from 'react-router-dom';
import * as request from 'superagent';

class producto extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {ruta: '', cantidad: 0}
		this.actualizaCantidad = this.actualizaCantidad.bind(this)
		this.escribirCarrito = this.escribirCarrito.bind(this)
	} 
	
	componentWillMount() {
		let url = '/catalogo/detalle/' +  this.props.producto.nombre
		this.setState({ruta: url})	
	}
        
	shouldComponentUpdate(next_props,next_states) {
		
		if (next_props.producto.nombre != this.state.ruta.substr(18)) {
			let url = '/catalogo/detalle/' + next_props.producto.nombre
			this.setState({ruta: url})
		}
		return true
	}
        
	actualizaCantidad(event)  {
					this.setState({cantidad: event.target.value})        
	        } 
	        
   escribirCarrito () { 
   	if (this.state.cantidad) {
   		if (1*this.state.cantidad<=1*this.props.producto.disponible) {
		let nombre = this.props.producto.nombre,
							unidades = this.state.cantidad,
							subtotal = this.state.cantidad * this.props.producto.precio,
							imagen = this.props.producto.imagen			
		let productoCarrito = {imagen: imagen, nombre: nombre, unidades: unidades, subtotal: subtotal }	
		
		request 
				.post('https://tienda-57b3d.firebaseio.com/usuarios/0/carrito/.json')
				.set('Content-Type': 'application/json')
				.send(JSON.stringify(productoCarrito)
				
				)
				.end((err,res)=>{
					 if (err || !res.ok) {
						console.log('Error en la escritura', err)							 
					 } else {
						console.log('Escritura correcta')
						this.props.actualizaCantidad(unidades)
						this.props.actualizaCarrito()							 
					 }
				
				})				
				
			} 
			else {
				alert('No podemos surtir esta cantidad')
			}
		} 
	} 	
	
    render(){
    	
        return(
					
					<div className="contenedor-producto container" >
						<div className="row">
							<div className="col-lg-12">
								<img  className="img-responsive center-block imagen-producto" src={this.props.producto.imagen} alt=""/>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-12">
								<span className="texto-nombre-producto">{this.props.producto.nombre}</span>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-5 ">
								<span className="texto-producto">Precio: </span>
							</div>
							<div className="col-lg-2 ">
								<span className="texto-producto">{this.props.producto.precio}</span>
							</div>
						</div>
						<div className="row">
							<div className="col-lg-5 ">
								<span className="texto-producto">Disponible: </span>
							</div>
							<div className="col-lg-2 ">
								<span className="texto-producto">{this.props.producto.disponible}</span>
							</div>
						</div>
						<div className="row">
							<div className="input-group">
								<Link to={this.state.ruta} className="btn btn-primary btn-sm">ver mas</Link>
							
							
								<button className="btn btn-secondary btn-sm" type="button" onClick={this.escribirCarrito}>Añadir</button>
							
							
								
							      <input type="number" className="form-control input-sm" onChange = {this.actualizaCantidad} min="1" max="99"/>			      
                                                                </div>
							
						</div>
					</div>					
					
              );
        } 
		
      } 
      
		
export default producto;