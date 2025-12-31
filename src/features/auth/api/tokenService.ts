import type { FetchHeaders } from "../../../types";
import { getTokenFromStorage, HttpClientFactory, removeStorage } from "../../../utils";
import type { TokensResponse } from "../types/auth";


export const refreshToken = async () : Promise<TokensResponse | null> => {
    const tokens = getTokenFromStorage();

    if (tokens.token && tokens.refreshToken && tokens.usuarioId) {
        
        //const url = `${baseUrl}/b2c/token/refresh`;
        const url = `https://localhost:7130/api/v1/b2c/token/refresh`;
        const httpClient = HttpClientFactory.getDefault();
        
        try {
            const requestData = {
                ...tokens,
                hard: true
            };

            const response = await httpClient.post<typeof requestData, TokensResponse>(
                url,
                requestData,
                false,
            ) as TokensResponse;

            if (response.token && response.refreshToken) {
                return response;
            } else {
                removeStorage();
                return response;
            }
        } catch (error) {
            removeStorage();
            return null
            /*return {
                ok: false,
                error: error instanceof Error ? error.message : "Error de red",
            };*/
        }
    }

    return null;
};


export const getTokensFromB2C = async (jwtB2C: string)
    : Promise<TokensResponse | null> => {

    //const url = `${baseUrl}/b2c/token`;
    const url = `https://localhost:7130/api/v1/b2c/token`;
    const httpClient = HttpClientFactory.getDefault();

    const headers = { Authorization: "Bearer " + jwtB2C } as FetchHeaders;
    const response = await httpClient
        .get<TokensResponse>(url, false, headers) as TokensResponse;

    return response;
};