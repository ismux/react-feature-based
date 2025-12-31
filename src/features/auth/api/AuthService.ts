import { _apiVersion, _urlApiBase } from "../../../config/constants";
import { HttpClientType, type ApiResponse } from "../../../types";
import { HttpClientFactory } from "../../../utils";
import type { ForgotPasswordForm, RequestConfirmationCodeForm, TokensResponse, UserConfirmForm, UserLogged, UserLoginForm, UserRegistrationForm } from "../types/auth";


export async function createAccount(formData: UserRegistrationForm) {
    try 
    {
        const url = `${_urlApiBase}${_apiVersion}/Users/Register`; 
        const api = HttpClientFactory.getService(HttpClientType.AXIOS)
        
        const data = await api.post<UserRegistrationForm, ApiResponse<boolean>>(url, formData);
 
        return data;
    } 
    catch (error: any) {
         throw new Error(error.Message);      
    }
}

export async function confirmAccount(formData: UserConfirmForm) {
    try 
    {
        const url = `${_urlApiBase}${_apiVersion}/Users/SetAccesCode`; 
         const api = HttpClientFactory.getService(HttpClientType.AXIOS)

        const data = await api.put<UserConfirmForm, ApiResponse<boolean>>(url, formData);
 
        return data;
    } 
    catch (error: any) {
         throw new Error(error.Message);      
    }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
    try 
    {
        const url = `${_urlApiBase}${_apiVersion}/Users/ResetAccessCode`; 
        const api = HttpClientFactory.getService(HttpClientType.AXIOS)

        const data = await api.put<RequestConfirmationCodeForm, ApiResponse<boolean>>(url, formData);
 
        return data;
    } 
    catch (error: any) {
         throw new Error(error.Message);      
    }
}

export async function authAccount(formData: UserLoginForm) {
    try 
    {
        const url = `${_urlApiBase}${_apiVersion}/Users/Authenticate`; 
        const api = HttpClientFactory.getService(HttpClientType.AXIOS)

        const data = await api.post<UserLoginForm, TokensResponse>(url, formData) as TokensResponse;
        
        if (data) {
            localStorage.setItem('AWESOME_AUTH_TOKEN', data.token)
        }
        return data;
    } 
    catch (error: any) {
         throw new Error(error.message);      
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try 
    {
        const url = `${_urlApiBase}${_apiVersion}/Users/ForgotPassword`; 
        const api = HttpClientFactory.getService(HttpClientType.AXIOS)

        const data = await api.put<ForgotPasswordForm, ApiResponse<boolean>>(url, formData);
 
        return data;
    } 
    catch (error: any) {
         throw new Error(error.Message);      
    }
}

export async function getUser() {
    try 
    {
        const url = `${_urlApiBase}${_apiVersion}/Users`; 
         const api = HttpClientFactory.getService(HttpClientType.AXIOS)

        const data = await api.get<ApiResponse<UserLogged>>(url) as ApiResponse<UserLogged>;
        
        if (data.ok) {
            return data.data;
        }
    } 
    catch (error: any) {
         throw new Error(error.Message);      
    }
}