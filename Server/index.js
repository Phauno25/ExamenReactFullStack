const express = require('express');
const cors = require('cors');
const contacto = require('./controllers/contactos.controller')
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Iniciando la app en puerto ${port}`))


app.get("/api/contactos" ,contacto.listAll)
app.get("/api/contactos/:id" ,contacto.getOne)
app.post("/api/contactos",contacto.create)
app.put("/api/contactos/:id" ,contacto.update)
app.delete("/api/contactos/:id" ,contacto.delete)
app.get("/" ,(req,res)=>console.log("holi"))

