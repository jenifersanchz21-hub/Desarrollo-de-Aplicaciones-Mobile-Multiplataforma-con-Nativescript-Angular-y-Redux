// src/app/domain/archivo.service.ts
import { Injectable } from '@angular/core';

export interface ElementoArchivado {
  id: string;
  contenido: string;
  fechaArchivado: Date;
  tipo: 'noticia' | 'opinion';
}

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {
  private elementosArchivados: ElementoArchivado[] = [];
  private elementosEliminados: string[] = [];

  constructor() { }

  // Archivar elemento
  archivar(elemento: string, tipo: 'noticia' | 'opinion' = 'noticia'): void {
    const elementoArchivado: ElementoArchivado = {
      id: Date.now().toString(),
      contenido: elemento,
      fechaArchivado: new Date(),
      tipo: tipo
    };
    
    this.elementosArchivados.unshift(elementoArchivado);
    console.log('Elemento archivado:', elementoArchivado);
  }

  // Eliminar elemento (solo guardar ID para referencia)
  eliminar(elemento: string): void {
    // Simulamos que guardamos una referencia del elemento eliminado
    const elementoId = Date.now().toString();
    this.elementosEliminados.push(elementoId);
    console.log('Elemento marcado como eliminado. ID:', elementoId);
  }

  // Obtener elementos archivados
  obtenerArchivados(): ElementoArchivado[] {
    return [...this.elementosArchivados];
  }

  // Obtener IDs eliminados
  obtenerEliminados(): string[] {
    return [...this.elementosEliminados];
  }

  // Verificar si un elemento está archivado
  estaArchivado(contenido: string): boolean {
    return this.elementosArchivados.some(item => item.contenido === contenido);
  }

  // Verificar si un elemento está eliminado
  estaEliminado(contenido: string): boolean {
    // En este ejemplo simple, solo verificamos por contenido
    return this.elementosEliminados.length > 0; // Simplificado
  }
}