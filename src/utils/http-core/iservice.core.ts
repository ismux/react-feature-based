import type { FetchHeaders, HttpServiceResponse } from "../../types";

export interface IHttpClient {
    getCall<R>(url: string, withAuth: boolean, headers?: FetchHeaders): Promise<HttpServiceResponse<R>>;
    postCall<T, R>(url: string, withAuth: boolean, data: T, headers?: FetchHeaders): Promise<HttpServiceResponse<R>>;
    putCall<T, R>(url: string, withAuth: boolean, data: T, headers?: FetchHeaders): Promise<HttpServiceResponse<R>>;
    deleteCall<R>(url: string, withAuth: boolean, headers?: FetchHeaders): Promise<HttpServiceResponse<R>>;
    patchCall<T, R>(url: string, withAuth: boolean, data: T, headers?: FetchHeaders): Promise<HttpServiceResponse<R>>;
}