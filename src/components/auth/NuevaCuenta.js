import React,{useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alerta/alertaContext';
import AuthContext from '../../context/autenticacion/authContext'



const NuevaCuenta = (props) => {
    
    // Extraer los valores del conetex
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta} = alertaContext;

    const authContext = useContext(AuthContext);
    const  { mensaje, autenticado , registrarUsuario  } = authContext;

    // en cado de que el usuario ya este registrado
    useEffect(() =>{
        if(autenticado){
            props.history.push('/proyectos');

        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
            
        }

        // eslint-disable-next-line
    }, [mensaje,autenticado, props.history])


    // State para iniciar Sesión
    const [ usuario, guardarUsuario]= useState({
        nombre:'',
        email:'',
        password: '',
        confirmar:''
    });

    // Extraer de usuario
    const {nombre,email, password , confirmar } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }
    
    // Cuando el usuario quiere iniciar Sesion
    const onSubmit = e => {
        e.preventDefault()

        // Validar llenos
        if( nombre.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirmar.trim() === ''
        ){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return;
        }

        // password min 6 caracteres
        if(password.length <6 ) {
            mostrarAlerta('El password debe ser de almenos 6 caracteres', 'alerta-error')
            return;
        }

        // Dos pássword sean iguales
        if( password !== confirmar){
            mostrarAlerta('Los password no son iguales', 'alerta-error')
        }

        //Pasarlo al action

        registrarUsuario({
            nombre,
            email,
            password
        })

    }

    return ( 
        <div className="form-usuario">
            
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg}</div>
            ) : null }

            <div className="contenedor-form sombra-dark">
                <h1>Crea Tu Cuenta</h1>
                <form
                    onSubmit = { onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Usuario</label>
                        <input 
                            type="text"
                            id='nombre'
                            name='nombre'
                            placeholder="Tu Nombre"
                            value= {nombre}
                            
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id='email'
                            name='email'
                            placeholder="Tu Email"
                            value= {email}
                            
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id='password'
                            name='password'
                            placeholder="Tu Password"
                            value={password}
                            
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar Password</label>
                        <input 
                            type="password"
                            id='confirmar'
                            name='confirmar'
                            placeholder="Confirmar Password"
                            value={confirmar}

                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrate" 
                        />
                    </div>
                    
                </form>
                <Link to={'/'} className='enlace-cuenta'>
                    Volver a Iniciar Sesión
                </Link>
            </div>

        </div>
     );
}
 
export default NuevaCuenta;