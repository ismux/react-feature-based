import { HttpClientType } from "../../types";
import { IHttpClient } from "../http-core/iservice.core";
import { FetchHttpClient } from "../http-client/fetch.service.client";
import { RestService } from "../http-core/service.call";
import { AxiosHttpClient } from "../http-client/axios.service.client";

// Patrón Factory + Singleton para crear instancias de clientes HTTP
export class HttpClientFactory {

    // Mapeo de instancias únicas por tipo de cliente HTTP
    private static clientInstances: Map<HttpClientType, IHttpClient> = new Map();
    private static serviceInstances: Map<HttpClientType, RestService> = new Map();

    /**
     * Obtiene una instancia de IHttpClient (cliente HTTP directo)
     */
    static getClient(type: HttpClientType = HttpClientType.FETCH): IHttpClient {
        if (!this.clientInstances.has(type)) {
            this.clientInstances.set(type, this.createClient(type));
        }
        return this.clientInstances.get(type)!;
    }

    /**
     * Obtiene una instancia de RestService (recomendado para uso general)
     */
    static getService(type: HttpClientType = HttpClientType.FETCH): RestService {
        if (!this.serviceInstances.has(type)) {
            const client = this.getClient(type);
            this.serviceInstances.set(type, new RestService(client));
        }
        return this.serviceInstances.get(type)!;
    }

     /**
     * Método de conveniencia que retorna RestService por defecto
     */
    static getDefault(): RestService {
        return this.getService(HttpClientType.FETCH);
    }

    private static createClient(type: HttpClientType): IHttpClient {
        switch (type) {
            case HttpClientType.FETCH:
                return new FetchHttpClient();
            case HttpClientType.AXIOS:
                return new AxiosHttpClient();
            default:
                throw new Error(`Tipo de cliente HTTP no soportado: ${type}`);
        }
    }

    static clearInstances(): void {
        this.clientInstances.clear();
        this.serviceInstances.clear();
    }
}