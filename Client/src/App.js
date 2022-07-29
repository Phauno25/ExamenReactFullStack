import { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Tabla from './components/Tabla';

function App() {

  const [datosTabla, setDatosTabla] = useState([]);
  const [openForm, setOpenForm] = useState(false);


  useEffect(() => {
    updateTabla();

  }, [])


  const updateTabla = async () => {
    const datos = await fetch('http://localhost:5000/api/contactos').then(res => res.json())
    datos.sort(function (a, b) {
      let textA = a.nombre.toUpperCase();
      let textB = b.nombre.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  })
    setDatosTabla(datos);
  }

  return (
    <div className="App">
      <div className='container mt-5'>
        <div className='row mt-5'>
          <div className='col-6'>
            {openForm ? 
            <Formulario cancel={()=>setOpenForm()} refresh={()=>updateTabla()}/> :
            <button className='btn btn-warning' onClick={()=>setOpenForm(true)}>Nuevo Contacto</button>}
            
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Tabla data={datosTabla} refresh={()=>updateTabla()} />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
