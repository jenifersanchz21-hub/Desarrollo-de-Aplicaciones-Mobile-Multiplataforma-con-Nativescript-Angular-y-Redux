// src/app/domain/noticias2.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class Noticias2Service {
  // Tu URL real de ngrok
  private apiUrl: string = "https://kali-grippy-nonsubmissively.ngrok-free.dev";

  constructor(private http: HttpClient) {
    console.log("✅ Noticias2Service inicializado con URL:", this.apiUrl);
  }

  buscar(query: string): Observable<any> {
    const params = new HttpParams().set('q', query);
    console.log("🔍 Buscando con query:", query);
    return this.http.get(`${this.apiUrl}/noticias`, { params });
  }

  agregarFavorito(noticia: any): Observable<any> {
    console.log("❤️ Agregando favorito:", noticia);
    return this.http.post(`${this.apiUrl}/favs`, { nuevo: noticia });
  }

  obtenerFavoritos(): Observable<any> {
    console.log("📋 Obteniendo favoritos");
    return this.http.get(`${this.apiUrl}/favs`);
  }
}