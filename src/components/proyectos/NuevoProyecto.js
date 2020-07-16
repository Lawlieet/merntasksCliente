import React,{Fragment, useState, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'


const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext(proyectoContext)
    const {formulario,errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext;


    // State para proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre:''
    })

    //Extraer nombre del proyecto
    const { nombre } = proyecto

    // Lee los contenidos del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    // Cuando el usuario de Submit
    const onsubmitProyecto = e => {
        e.preventDefault()

        // validar proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }
        // Agregar al state
        agregarProyecto(proyecto)
        // Reiniciar el Form
        guardarProyecto({
            nombre:''
        })

    }

    // Mostrar Formularioo
    const onClickFormulario = ()  => {
        mostrarFormulario();
    }

    return ( 
        <Fragment>

        <button
            type='button'
            className="btn btn-block btn-primario"
            onClick = { onClickFormulario }
        >Nuevo Proyecto </button>

        {
            formulario 
            ? (
                <form
                    className="formulario-nuevo-proyecto"
                    onSubmit= {onsubmitProyecto}
                >
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Crear Nuevo Proyecto"
                        name="nombre"
                        value = {nombre}
                        onChange= {onChangeProyecto}
                    />

                    <input 
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Apregar Proyecto"
                    />
                </form>
              ): null
        }

        {
            errorformulario ? <p className="mensaje error">El nombre del proyecto es obligatorio</p> : null
        }

        </Fragment>
     );
}
 
export default NuevoProyecto;