import { Usuario } from "./usuario";



export class UsuariosLista { 

  private lista: Usuario[] = [];


  constructor() { 
  }

  public agregar(usuario: Usuario) { 
    this.lista.push(usuario);
    console.log(this.lista);
    return usuario;
  }

  public actualziarNombre(id:string,nombre:string) { 
    for (let usuario of this.lista) { 
      if (usuario.id === id) { 
        usuario.nombre = nombre;
        break;
      }
    }

    console.log('--- Actualizando usuario ----')
    console.log(this.lista);
  }

  //Obtener lista de usuarios
  public getLista() { 
    return this.lista;
  }

  //Obtenr un Usuario
  public getUsuario(id: string) { 
    return this.lista.find(usuario => {
      return usuario.id === id;
    });
  }

  // Obtener usaurio en sala particular
  public getUsuarioEnSala(sala: string) { 
    return this.lista.filter(usuario => {
      return usuario.sala === sala;
    });
  }

  // borrar un usuario
  public borrarUsuario(id:string) { 
    const tempUsuario = this.getUsuario(id);
    this.lista = this.lista.filter(usuario => {
      return usuario.id !== id;
    });

    return tempUsuario
  }

}