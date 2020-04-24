/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Barrasup from './barraSup.jsx';
import Barrabuscador from './barraBuscador.jsx';
import Galeria from './galeria.jsx';
import Carrito from './carrito.jsx';
import Detalle from './detProducto.jsx';
import * as request from 'superagent';

class Catalogo extends React.Component{
	constructor(){
		super()
		this.state = {cantidad: 0, datos: [], bodega: [], carrito: [], total: 0}
		this.actualizaCantidad = this.actualizaCantidad.bind(this)
		this.getCarrito = this.getCarrito.bind(this)
		this.getBodega = this.getBodega.bind(this)
		this.borraCarrito=this.borraCarrito.bind(this)
	 	//this.actualizaBodega=this.actualizaBodega.bind(this)
	 	this.pagar = this.pagar.bind(this)
	 	this.filtrar = this.filtrar.bind(this)
	} // FIN CONSTRUCTOR
	
	componentWillMount() {
		
		this.getCarrito()
		this.getBodega()
		
	}
	getCarrito(){
		var cantidad = 0
		var subtotal = 0
		request
			.get('https://tienda-57b3d.firebaseio.com/usuarios/0/carrito/.json')
			.set('Content-Type': 'application/json')
			.end((err,res)=>{
				if (err || !res.ok) {
					console.log('Error en la comunicacion:' + err.message)				
				}
				else {
					
					for (let key in res.body) {
								cantidad += 1*res.body[key].unidades			
								subtotal += 1*res.body[key].subtotal
					}
					this.setState({cantidad: cantidad, carrito: res.body, total: subtotal})
					
				}
			})
	}
	
	getBodega() {
	
	request 
				.get('https://tiendaonlinenextu.firebaseio.com/0/articulos/.json')
				.set('Content-Type': 'application/json')
				.end((err,res) => {
									
					if (err || !res.ok) {
						console.log('Error en la comunicacion' + err.message)
					} else {
												
							this.setState({
							datos:  res.body,
							bodega: res.body
							})	
							
							} 
						}) 
				
	} 
	
	actualizaCantidad(unidades) {
		let nuevaCantidad = 1*unidades + 1*this.state.cantidad 
		this.setState({cantidad: nuevaCantidad })	
	}	 
	
	pagar(carrito){
	 this.borraCarrito()
	 this.actualizaBodega(carrito)
	} 
	
	borraCarrito() {
		request 
				.put('https://tienda-57b3d.firebaseio.com/usuarios/0/carrito/.json')
				.set('Content-Type': 'application/json')
				.send('null') // FIN .SEND 
				.end((err,res) => {
									
					if (err || !res.ok) {
						console.log('Error en la comunicacion' + err.message)
					} else {
							
							this.getCarrito()
					} 
				}) 
				
	} 
	
	actualizaBodega(carrito) {
		let template = '{'
		for (let indiceCarrito in carrito) {
			for (let indiceBodega in this.state.bodega) {
				if (this.state.bodega[indiceBodega].nombre == carrito[indiceCarrito].nombre) {
					let nuevaUnidad = 1*this.state.bodega[indiceBodega].disponible - 1*carrito[indiceCarrito].unidades				
					template +=  '"' + indiceBodega + '/disponible":"'  + nuevaUnidad + '",'
				}
			}		
		}
		let nuevosDatos = template.substr(0,template.length-1)
		nuevosDatos += '}'
		request 
				.patch('https://tiendaonlinenextu.firebaseio.com/0/articulos/.json')
				.set('Content-Type': 'application/json')
				.send(nuevosDatos) // FIN .SEND 
				.end((err,res) => {
									
					if (err || !res.ok) {
						console.log('Error en la comunicacion' + err.message)
					} else {
							//console.log('BodegaActualizada')
							this.getBodega()
					} 
				})
				
	} 
	
	filtrar(filtro) {
		
		if (filtro.length) {
			this.setState({datos: filtro})
		}
		else {
			this.setState({datos: this.state.bodega})
		}
	}		

    render(){
    
        return(
					
					<div className="container">
						<div className="row">
							<div className="col-lg-12 ">
									<Barrasup cantidad={this.state.cantidad} logout={this.props.logout}/>
							</div>
							<div className="col-lg-12">
								<Barrabuscador datos={this.state.bodega} filtrar={this.filtrar}/>
							</div>
								<div className="col-lg-12">
								
									<Switch>
				               	<Route exact path='/catalogo' render={()=>{return <Galeria actualizaCantidad={this.actualizaCantidad} datos={this.state.datos} actualizaCarrito={this.getCarrito}/>}} />
				               	<Route path='/catalogo/carrito' render={()=>{return <Carrito total={this.state.total}  datos={this.state.carrito} pagar={this.pagar}/>}} />
               					<Route path='/catalogo/detalle/:id' render={(match)=>{return <Detalle datos={this.state.bodega} rutaId={match}/>}} />
				              </Switch>
				               
								</div>
							</div>
						</div>	
					
					
              );
        }
        
      } 

export default Catalogo;