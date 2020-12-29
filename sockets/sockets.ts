import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../class/usuarios-lista';
import { Usuario } from '../class/usuario';
import SocketIO from 'socket.io';


export const usuariosConectados = new UsuariosLista();


export const conectarCliente = (cliente: Socket) => { 
  
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);

  
}

export const desconectar = (cliente: Socket,io:SocketIO.Server) => {
  cliente.on('disconnect', () => {
    console.log('Cliente Desconectado');
    usuariosConectados.borrarUsuario(cliente.id);

    io.emit('usuarios-activos', usuariosConectados.getLista());

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

      io.emit('usuarios-activos', usuariosConectados.getLista());
      callback({
        ok: true,
        mensajes: `Usuario ${payload.nombre} CONFIGURADO`
      });
    });
  }


  //Obtener usuarios
   export const obtenerUsuarios = (cliente: Socket, io: socketIO.Server) => {
    cliente.on('obtener-usuarios',() => {
      
      io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
      
    });
  }
