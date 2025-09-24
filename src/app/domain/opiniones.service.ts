import { Injectable } from '@angular/core';

export interface Opinion {
  id: string;
  usuario: string;
  comentario: string;
  puntuacion: number;
  fecha: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OpinionesService {
  private opiniones: Opinion[] = [
    {
      id: '1',
      usuario: 'Juan Pérez',
      comentario: 'Excelente noticia, muy informativa.',
      puntuacion: 5,
      fecha: new Date()
    },
    {
      id: '2',
      usuario: 'María García',
      comentario: 'Interesante perspectiva sobre el tema.',
      puntuacion: 4,
      fecha: new Date()
    },
    {
      id: '3',
      usuario: 'Carlos López',
      comentario: 'Buen contenido, pero podría ser más detallado.',
      puntuacion: 3,
      fecha: new Date()
    }
  ];

  constructor() { }

  buscar(): Opinion[] {
    return this.opiniones;
  }

  agregar(opinion: Opinion): void {
    this.opiniones.unshift(opinion);
  }

  eliminar(id: string): void {
    this.opiniones = this.opiniones.filter(opinion => opinion.id !== id);
  }

  generarOpinionAleatoria(): Opinion {
    const usuarios = ['Ana Ruiz', 'Pedro Martínez', 'Laura Sánchez', 'Miguel González', 'Sofía Díaz'];
    const comentarios = [
      'Muy buena información, gracias por compartir',
      'Interesante punto de vista sobre el tema',
      'Podría profundizar más en los detalles',
      'Excelente redacción y contenido',
      'Me gustó mucho esta noticia, muy relevante'
    ];
    
    return {
      id: Date.now().toString(),
      usuario: usuarios[Math.floor(Math.random() * usuarios.length)],
      comentario: comentarios[Math.floor(Math.random() * comentarios.length)],
      puntuacion: Math.floor(Math.random() * 5) + 1,
      fecha: new Date()
    };
  }
}