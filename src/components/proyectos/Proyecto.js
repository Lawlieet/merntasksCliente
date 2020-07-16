import React,{useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Proyecto = ({proyecto}) => {
    
    // Obtener el state de proyectos

    const proyectosContext = useContext(proyectoContext)
    const {proyectoActual} = proyectosContext;

    // Obtener la funcion del contextTarea
    const tareasContext = useContext(tareaContext);
    const {obtenerTareas} = tareasContext;


    // funcion para agregar el poryecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id);//Fijar un proyecto actual
        obtenerTareas(id);//Filtrar tareas al dar clic
    }

    return ( 
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick= { () => seleccionarProyecto(proyecto._id) } 

            >{proyecto.nombre}</button>
        </li>
     );
}
 
export default Proyecto;