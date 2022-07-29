import React, { useState } from 'react'

function Formulario(props) {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [errNombre, setErrNombre] = useState("");
    const [errApellido, setErrApellido] = useState("");

    const validarNombre = (nombre) => {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(nombre.trim()) ? (setErrNombre(""), setNombre(nombre)) : (setErrNombre("El nombre ingresado no es válido."),setNombre(nombre));
    }
    const validarApellido = (apellido) => {
        const regex = /^[a-zA-Z\s]*$/;
        return regex.test(apellido.trim()) ? (setErrApellido(""), setApellido(apellido)) : (setErrApellido("El apellido ingresado no es válido."),setApellido(apellido));
    }
    const validarTelefono = (telefono) => {
        return (telefono.trim()) ? (setTelefono(telefono)) : setTelefono("0");
    }

    const registrarContacto = async (e) => {
        e.preventDefault();

        if (nombre.trim() && apellido.trim() && !errNombre && !errApellido) {
            const contacto = {
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
            }
            console.log(JSON.stringify(contacto));
            await fetch("http://localhost:5000/api/contactos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contacto),

            }).then(props.refresh);

            

        }
        else {
            alert("Verifica los errores en los campos del formulario.")
        }

    }

    return (
        <div className="container">
            <form class="border border-primary p-4" onSubmit={(e) => registrarContacto(e)}>
                <h3>Nuevo Contacto</h3>
                <div className='d-flex justify-around'>
                    <div className="mb-3 col-6">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" name="nombre" onChange={(e) => validarNombre(e.target.value)} />
                        <span htmlFor="nombre">{errNombre}</span>
                    </div>
                    <div className="mb-3 ml-2 col-6">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input type="text" className="form-control" name="apellido" onChange={(e) => validarApellido(e.target.value)} />
                        <span htmlFor="nombre">{errApellido}</span>
                    </div>
                </div>

                <div className="mb-3 col-12">
                    <label className="form-label" htmlFor="telefono">Telefono</label>
                    <input type="text" className="form-control" name="telefono" onChange={(e) => validarTelefono(e.target.value)} />

                </div>

                <button type="submit" className="btn btn-primary m-1">Agregar</button>
                <button onClick={()=>props.cancel(false)} className="btn btn-primary m-1">Cancelar</button>

               
            </form>
        </div>
    );
}

export default Formulario