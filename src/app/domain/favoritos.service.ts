// src/app/domain/favoritos.service.ts
import { Injectable } from "@angular/core";
import * as sqlite from "nativescript-sqlite";

@Injectable()
export class FavoritosService {
    private database: any;

    constructor() {
        this.inicializarBaseDeDatos();
    }

    private async inicializarBaseDeDatos() {
        try {
            this.database = await sqlite("miBaseDeDatos.db");
            console.log("✅ Base de datos abierta");
            
            // Crear tabla si no existe
            await this.database.execSQL(`
                CREATE TABLE IF NOT EXISTS favoritos (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    nombre TEXT,
                    fecha TEXT
                )
            `);
            console.log("✅ Tabla 'favoritos' creada/verificada");
        } catch (error) {
            console.error("❌ Error al abrir la base de datos:", error);
        }
    }

    // Agregar a favoritos
    async agregarFavorito(nombre: string): Promise<any> {
        try {
            const fecha = new Date().toISOString();
            await this.database.execSQL(
                "INSERT INTO favoritos (nombre, fecha) VALUES (?, ?)",
                [nombre, fecha]
            );
            console.log("✅ Favorito agregado:", nombre);
            return { exito: true };
        } catch (error) {
            console.error("❌ Error al agregar favorito:", error);
            return { exito: false, error };
        }
    }

    // Obtener todos los favoritos
    async obtenerFavoritos(): Promise<any[]> {
        try {
            const resultados = await this.database.all("SELECT * FROM favoritos ORDER BY fecha DESC");
            console.log("✅ Favoritos obtenidos:", resultados.length);
            return resultados;
        } catch (error) {
            console.error("❌ Error al obtener favoritos:", error);
            return [];
        }
    }

    // Eliminar favorito
    async eliminarFavorito(id: number): Promise<any> {
        try {
            await this.database.execSQL("DELETE FROM favoritos WHERE id = ?", [id]);
            console.log("✅ Favorito eliminado:", id);
            return { exito: true };
        } catch (error) {
            console.error("❌ Error al eliminar favorito:", error);
            return { exito: false, error };
        }
    }
}