/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { Link} from 'react-router-dom';
import * as request from 'superagent';

class inicio extends React.Component {
    constructor() {
        super();
        this.state = {usuarios: [], user: '', pass: ''};
        this.verificaLogin = this.verificaLogin.bind(this);
        this.getLogin = this.getLogin.bind(this);
        this.getPass = this.getPass.bind(this);
    }

    getLogin(event) {
        this.setState({user: event.target.value});
    }

    getPass(event) {
        this.setState({pass: event.target.value});
    }

    verificaLogin() {
        this.props.verificaLogin(this.state.user, this.state.pass);
    }

    render() {

        return(
                <div className="container" >
                    <div className="row">
                        <form className="form-signin text-center" method="post" style={{background: "#cccccc"}}>
                            <h1>Inicia Sesión</h1>
                            <input type="text" id="user" name="user" className="form-control" placeholder="Usuario" onChange={this.getLogin} required/>
                            <input type="password" id="pass" name="pass" className="form-control" placeholder="Contraseña" onChange={this.getPass} required/>
                            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={this.verificaLogin}>Ingresar</button>
                        </form>
                    </div>
                </div>


                );
    }

}

export default inicio;