import { Socket, socketIO } from 'socket.io';
import Server from '../class/server';

export const desconectar = (cliente:Socket) => { 
  cliente.on('disconnect', () => {
    console.log('Cliente Desconectado');
  });

}

//escuchar mensajes
export const mensaje = (cliente:Socket,io:socketIO.Server) => { 
  cliente.on('mensaje', (payload:{de:string, cuerpo:string}) => {
    console.log('Mensaje recibido ', payload);
    
    io.emit('mensaje-nuevo', payload);


  });
}
