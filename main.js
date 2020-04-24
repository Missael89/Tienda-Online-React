/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import  ReactDOM from 'react-dom';
import {render} from 'react-dom';
import {Router,browserHistory, Route, Link} from 'react-router';
import App from './App.jsx';
import Inicio from './FormLogin.jsx'
import Catalogo from './Articulos.jsx'

render(
	
		<App/>	
	,
	document.getElementById('app')
)
