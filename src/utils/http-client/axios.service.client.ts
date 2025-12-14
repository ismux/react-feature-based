import { AxiosResponse } from "axios";
import { HttpServiceResponse } from "../../types";
import { IHttpClient } from "../http-core/iservice.core";
import api from "../http-instance/axios.instance";

export class AxiosHttpClient implements IHttpClient {
 
    async getCall<R>(url: string)
        : Promise<HttpServiceResponse<R>> {

        const resultCall: AxiosResponse<R> = await api.get(url);

         return resultCall.data;
    }

    async postCall<T, R>(url: string, data: T)
        : Promise<HttpServiceResponse<R>> {

        const resultCall: AxiosResponse<R> = await api.post(url, data);

         return resultCall.data;
    }

    async putCall<T, R>(url: string, data: T)
        : Promise<HttpServiceResponse<R>> {

        const resultCall: AxiosResponse<R> = await api.put(url, data);

         return resultCall.data;
    }

    async deleteCall<R>(url: string)
        : Promise<HttpServiceResponse<R>> {

        const resultCall: AxiosResponse<R> = await api.delete(url);

         return resultCall.data;
    }

     async patchCall<T, R>(url: string, data: T)
        : Promise<HttpServiceResponse<R>> {

        const resultCall: AxiosResponse<R> = await api.patch(url, data);

         return resultCall.data;
    }

}