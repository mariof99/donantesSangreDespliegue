export interface ResponseAudio {
  success: boolean,
  data: Cancion[],
  msg: string,
}

export interface Cancion {
  id: string,
  nombre: string,
  titulo: string,
  letra: string,
  cancion: string,
  descarga: string
}

export interface ResponseFaqs {
  success: boolean,
  data: Faq[],
  msg: string,
}
export interface Faq {
  id: string,
  pregunta: string,
  respuesta: string,
}
export interface ResponseMensaje {
  success: boolean,
  data: Mensaje[],
  msg: string,
}

export interface ResponseComentario {
  success: boolean,
  data: Mensaje,
  msg: string,
}
export interface Mensaje {
  idUser: string,
  nombre: string,
  mensaje: string
  fecha: string,
  hora: string
}
export interface ResponseListaConectados{
  success: boolean,
  data: string[],
  msg: string,
}


export interface BorrarMemResponse {
  success: boolean,
  msg: string,
  data: number
}

export interface InsertUpdateMemResponse {
  success: boolean,
  msg: string,
  data: Memoria
}

export interface GetMemResponse {
  success: boolean,
  msg: string,
  data: Memoria[]
}

export interface Memoria {
  id: number,
  anio: number,
  imagen: string,
  documento: string
}

export interface MemoriaAddUpdate {
  id: number,
  anio: number,
  imagen?: File | null,
  documento?: File | null,
  imgBorrar?: string,
  docBorrar?: string
}
