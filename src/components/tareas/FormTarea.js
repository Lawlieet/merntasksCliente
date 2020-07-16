import React,{useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
    
    // Extraer si el poryecto esta activo
    const proyectosContext = useContext(proyectoContext)
    const { proyecto }  = proyectosContext;

     // Obtener la funcion del contextTarea
     const tareasContext = useContext(tareaContext);
     const { tareaSeleccionada,  errortarea, agregarTarea, validarTarea, obtenerTareas, actualizarTarea, limpiarTarea} = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect( () => {
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada)
        }else{
            guardarTarea({
                nombre:''
            })
        }
    },[tareaSeleccionada]);

    // state del formulario

    const [tarea, guardarTarea ]= useState({
        nombre :''
    })

    // extraer el nombre del poryecto
    const { nombre } = tarea;

    // Si no hay proyecto seleccionado
    if(!proyecto) return null
    // Array destructurin ppara extraer le poryecto actual
    const [proyectoActual] = proyecto;
    
    // leer los valores del formulario

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit =  e => {
        e.preventDefault();

        // validar
        if( nombre.trim() === ''){
            validarTarea();
            return;
        }

        // Revisa si es edicion o nueva tarea
        if(tareaSeleccionada === null){
            // agregar nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
                // Actualizar tarea existente
                actualizarTarea(tarea);
                // Elimina tarea selecionada dle stare
                limpiarTarea();
        }
        //obtener y filtrar tareas del proyecto actual
        obtenerTareas(proyectoActual.id)

        // reiniciar el form
        guardarTarea({
            nombre:''
        })


    }

    return ( 
        <div className="formulario">
            <form
                onSubmit = {onSubmit}
            >
                <div className="contenedor-input">
                    <input 
                        type= 'text'
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="nombre"
                        value={nombre}
                        onChange= {handleChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type= 'submit'
                        className="btn btn-primario btn-submit btn-block"
                        placeholder="Nombre Tarea..."
                        value={tareaSeleccionada ? 'Editar Tarea' : "Agregar Tarea"}
                    />
                </div>
            </form>
            {errortarea ? <p className="mensaje error">La tarea debe tener un nombre</p>: null}
        </div>
     );
}
 
export default FormTarea;
