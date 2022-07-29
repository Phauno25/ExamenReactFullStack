import React from "react";
import RowTabla from "./RowTabla";

function Tabla(props) { 
    const datosTabla = props.data;

    return (
        <div className="container">
            <table className="table table-hover table-bordered mt-5">
                <thead className="thead-light">
                    <tr>
                        <th className="bg-warning" scope="col">Nombre</th>
                        <th className="bg-warning"scope="col">Apellido</th>
                        <th className="bg-warning"scope="col">Contacto</th>
                        <th className="bg-warning" scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        datosTabla.map(item => (
                            <RowTabla key={item.id} contacto={item} refresh={props.refresh}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Tabla