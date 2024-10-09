import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';

export default function ListadoEmpleados() {

    const urlBase = "http://localhost:8080/rh-app/empleados";
    // **Uso de Hook variables de estado para monitorear cambios
    const [empleados, setEmpleados] = useState([]);
    // Cuando se carga la pagina se llama al Hook:
    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        // Petición al Back-End
        const resultado = await axios.get(urlBase);
        console.log("Resultado de cargar Empleados");
        console.log(resultado.data);
        // cargamos la info de los datos recibidos en resultado al arreglo de empleados**
        setEmpleados(resultado.data);
    }
    
    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Sistema de Recursos Humanos</h3>
            </div>

            <table className="table table-striped table-hover align-middle">
                <thead className='table-dark'>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Empleado</th>
                        <th scope="col">Departamento</th>
                        <th scope="col">Sueldo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // Iteramos el arreglo de empleados
                        empleados.map((empleado, indice) => (
                            <tr key={indice}>
                                <th scope="row">{empleado.idEmpleado}</th>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.departamento}</td>
                                <td><NumericFormat value={empleado.sueldo}
                                    displayType={'text'}
                                    decimalSeparator=','
                                    thousandSeparator='.' prefix={'u$s '}
                                    decimalScale={2} fixedDecimalScale/>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}
