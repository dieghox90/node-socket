import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';


export const usuariosConectados = new UsuariosLista();


export const conectarCliente = (cliente: Socket) => { 
  
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
}

export const desconectar = (cliente: Socket) => {
  cliente.on('disconnect', () => {
    console.log('Cliente Desconectado');
    usuariosConectados.borrarUsuario(cliente.id);
  });

}

//escuchar mensajes
export const mensaje = (cliente: Socket, io: socketIO.Server) => {
  cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
    console.log('Mensaje recibido ', payload);
    io.emit('mensaje-nuevo', payload);
  });
}

  //Configurar Usaurio
  export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('configurar-usuario', (payload: { nombre: string },callback:Function) => {
      
      usuariosConectados.actualziarNombre(cliente.id, payload.nombre);

      callback({
        ok: true,
        mensajes: `Usuario ${payload.nombre} CONFIGURADO`
      });
    });
  }

