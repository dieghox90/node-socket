import Server from "./class/server";
import { SERVER_PORT } from "./global/enviroment";
import router from './routes/router';
import express from 'express';
import cors from 'cors';



const server = new Server();

// Leer informacion enviadad en el cuerpo de la URL
server.app.use(express.urlencoded({extended:true})); 
server.app.use(express.json());



//CORS
server.app.use(cors({origin:true, credentials:true }))


//RUTAS DE SERVICIOS
server.app.use('/', router)

server.start(() => { 
  console.log(`Servidor ejecutandose en el puerto ${SERVER_PORT}`);
});
