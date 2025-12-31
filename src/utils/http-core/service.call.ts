import type { FetchHeaders, HttpServiceResponse } from "../../types";
import type { IHttpClient } from "./iservice.core";

export class RestService {
    constructor(private httpClient: IHttpClient) { }

    async get<T>(url: string, withauth: boolean = true, headers?: FetchHeaders)
    : Promise<HttpServiceResponse<T>> {
        try {
            return await this.httpClient.getCall<T>(url, withauth, headers);
        } catch (error: unknown) {
            throw new Error(error instanceof Error
                ? error.message
                : 'Error desconocido RestService.get');
        }
    }

    async post<T, R>(url: string, data: T, withauth: boolean = true, headers?: FetchHeaders)
        : Promise<HttpServiceResponse<R>> {
        try {
            return await this.httpClient.postCall<T, R>(url, withauth, data, headers);
        } catch (error: unknown) {
            throw new Error(error instanceof Error
                ? error.message
                : 'Error desconocido RestService.post');
        }
    }

    async put<T, R>(url: string, data: T, withauth: boolean = true, headers?: FetchHeaders)
        : Promise<HttpServiceResponse<R>> {
        try {
            return await this.httpClient.putCall<T, R>(url, withauth, data, headers);
        } catch (error: unknown) {
            throw new Error(error instanceof Error
                ? error.message
                : 'Error desconocido RestService.put');
        }
    }

    async delete<T>(url: string, withauth: boolean = true, headers?: FetchHeaders)
        : Promise<HttpServiceResponse<T>> {
        try {
            return await this.httpClient.deleteCall<T>(url, withauth, headers);
        } catch (error: unknown) {
            throw new Error(error instanceof Error
                ? error.message
                : 'Error desconocido RestService.delete');
        }
    }

    async patch<T, R>(url: string, data: T, withauth: boolean = true, headers?: FetchHeaders)
        : Promise<HttpServiceResponse<R>> {
        try {
            return await this.httpClient.patchCall<T, R>(url, withauth, data, headers);
        }
        catch (error: unknown) {
            throw new Error(error instanceof Error
                ? error.message
                : 'Error desconocido RestService.patch');
        }
    }
}