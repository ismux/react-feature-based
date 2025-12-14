import { refreshToken } from "../../services/authServices";
import { FetchHeaders, HttpServiceResponse } from "../../types";
import { IHttpClient } from "../http-core/iservice.core";
import { getTokenFromStorage, setStorageToken } from "../token-storage/token.store";

export class FetchHttpClient implements IHttpClient {

    private buildHeaders(withAuth: boolean, customHeaders?: FetchHeaders): FetchHeaders {
        const headers: FetchHeaders = {
            'Content-Type': 'application/json',
            ...customHeaders // Los headers personalizados se agregan/sobrescriben
        };
        if (withAuth) {
            const tokens = getTokenFromStorage();
            if (tokens.token) {
                headers.Authorization = `Bearer ${tokens.token}`;
            }
        }
        return headers;
    }

    private async executeRequest<T>(
        url: string,
        options: RequestInit,
        withAuth: boolean,
        customHeaders?: FetchHeaders
    ): Promise<HttpServiceResponse<T>> {
        try {
            let response = await fetch(url, options);

            if (response.status === 401 && withAuth) {
                const tokensResult = await refreshToken();
                if (tokensResult?.token && tokensResult?.refreshToken) {
                    const { token, refreshToken: newRefreshToken } = tokensResult;
                    setStorageToken(token, newRefreshToken, null);

                    const updatedOptions = {
                        ...options,
                        headers: this.buildHeaders(true, customHeaders)
                    };
                    response = await fetch(url, updatedOptions);
                }
            }

            return this.processResponse<T>(response);
        } catch (error) {
            return {
                ok: false,
                error: error instanceof Error ? error.message : 'Error de conexión'
            } as HttpServiceResponse<T>;
        }
    }

    private async processResponse<T>(response: Response): Promise<HttpServiceResponse<T>> {
        const contentType = response.headers.get("Content-Type");

        // Manejo de respuestas binarias
        if (contentType === "application/octet-stream") {
            return await response.arrayBuffer() as HttpServiceResponse<T>;
        }

        return await response.json() as HttpServiceResponse<T>;
    }

    async getCall<R>(url: string, withAuth: boolean, customHeaders?: FetchHeaders)
        : Promise<HttpServiceResponse<R>> {

        const headers = withAuth
            ? this.buildHeaders(withAuth, customHeaders)
            : customHeaders || {};
        const options: RequestInit = {
            method: 'GET',
            headers
        };

        return this.executeRequest<R>(url, options, withAuth, customHeaders);
    }

    async postCall<T, R>(url: string, withAuth: boolean, data: T, customHeaders?: FetchHeaders)
        : Promise<HttpServiceResponse<R>> {

        const headers = this.buildHeaders(withAuth, customHeaders);

        const options: RequestInit = {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        };

        return this.executeRequest<R>(url, options, withAuth, customHeaders);
    }

    async putCall<T, R>(url: string, withAuth: boolean, data: T, customHeaders?: FetchHeaders)
        : Promise<HttpServiceResponse<R>> {
        const headers = this.buildHeaders(withAuth, customHeaders);

        const options: RequestInit = {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        };

        return this.executeRequest<R>(url, options, withAuth, customHeaders);
    }

    async deleteCall<R>(url: string, withAuth: boolean, customHeaders?: FetchHeaders)
        : Promise<HttpServiceResponse<R>> {

        const headers = this.buildHeaders(withAuth, customHeaders);

        const options: RequestInit = {
            method: 'DELETE',
            headers
        };

        return this.executeRequest<R>(url, options, withAuth, customHeaders);
    }

    async patchCall<T, R>(url: string, withAuth: boolean, data: T, customHeaders?: FetchHeaders)
        : Promise<HttpServiceResponse<R>> {
        const headers = this.buildHeaders(withAuth, customHeaders);

        const options: RequestInit = {
            method: 'PATCH',
            headers,
            body: JSON.stringify(data)
        };

        return this.executeRequest<R>(url, options, withAuth, customHeaders);
    }
}