import React, { Component } from 'react'
import '../css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'

const url = "http://localhost:3001/Usuarios"
const cookies = new Cookies()

export default class login extends Component {

  state = {
    form: {
      username: '',
      password: ''
    }
  }

  handleChange = async e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }

  iniciarSesion =async()=>{
    await axios.get(url, {params: { username: this.state.form.username, password: md5(this.state.form.password)}})
    .then(response=>{
      return response.data
    })
    .then(response => {
      if(response.length>0){
        var respuesta = response[0]
        cookies.set('id', respuesta.id, {path: "/"})
        cookies.set('primer_apellido', respuesta.primer_apellido, {path: "/"})
        cookies.set('segundo_apellido', respuesta.segundo_apellido, {path: "/"})
        cookies.set('nombre', respuesta.nombre, {path: "/"})
        cookies.set('username', respuesta.username, {path: "/"})
        cookies.set('password', respuesta.password, {path: "/"})
        alert(`Bienvenido ${respuesta.nombre} ${respuesta.primer_apellido}`)
        window.location.href="./menu"
      }else{
        alert("El usuario o la contraseña no son validos.")
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  componentDidMount(){
    if(cookies.get('username')){
      window.location.href='./menu'
    }
  }

  render() {
    return (
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <label>Usuario: </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="username"
              onChange={this.handleChange}
            />
            <br />
            <label>Contraseña: </label>
            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={this.handleChange}
            />
            <br />
            <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
          </div>
        </div>
      </div>
    )
  }
}
