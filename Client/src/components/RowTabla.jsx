import React, { Fragment, useState } from 'react'

function RowTabla(props) {

    const [editar, setEditar] = useState(false);
    const [nombre, setNombre] = useState(props.contacto.nombre);
    const [apellido, setApellido] = useState(props.contacto.apellido);
    const [telefono, setTelefono] = useState(props.contacto.telefono);
    const [errNombre, setErrNombre] = useState("");
    const [errApellido, setErrApellido] = useState("");

    const validarNombre = (nombre) => {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(nombre.trim()) ? (setErrNombre(""), setNombre(nombre)) : (setNombre(nombre) ,setErrNombre("El nombre ingresado no es válido."));
    }
    const validarApellido = (apellido) => {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(apellido.trim()) ? (setErrApellido(""), setApellido(apellido)) : (setApellido(apellido), setErrApellido("El apellido ingresado no es válido."));
    }
    const validarTelefono = (telefono) => {
        return (telefono.trim()) ? (setTelefono(telefono)) : setTelefono(0);
    }

    const updateContacto = async () => {

        if (nombre.trim() && apellido.trim() && !errNombre && !errApellido) {
            const url = `http://localhost:5000/api/contactos/${props.contacto.id}`
            const contacto = {
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
            }
            console.log(JSON.stringify(contacto));
            await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contacto),

            }).then(props.refresh);
            setEditar(false);

        }
        else {
            alert("Verifica los errores en los campos del formulario.")
        }
    }

    const deleteContacto = async () => {
        const url = `http://localhost:5000/api/contactos/${props.contacto.id}`
        await fetch(url, {
            method: "DELETE",
        }).then(props.refresh);
    }

    return (
        <tr key={props.contacto.id}>
            <td>{editar ? <input className="form-control" type="text" value={nombre} onChange={(e) => validarNombre(e.target.value)} /> : props.contacto.nombre}</td>
            <td>{editar ? <input className="form-control" type="text" value={apellido} onChange={(e) => validarApellido(e.target.value)} /> : props.contacto.apellido}</td>
            <td>{editar ? <input className="form-control" type="text" value={telefono} onChange={(e) => validarTelefono(e.target.value)} /> : props.contacto.telefono}</td>
            <td className='d-flex justify-content-evenly'>{editar ?
                <Fragment>
                    <button className="btn btn-success" onClick={() => updateContacto()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                            <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                    </button>
                    <button className="btn btn-danger" onClick={() => setEditar(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </Fragment>

                :
                <Fragment>
                    <button className="btn btn-success" onClick={() => setEditar(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                        </svg>
                    </button>
                    <button className="btn btn-danger" onClick={() => deleteContacto()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg></button>
                </Fragment>
            }
            </td>
        </tr>
    )
}


export default RowTabla