export interface AuthResponse {
    response: Response;
}

export interface Response {
    tokens: Tokens;
    succes: boolean;
    msg:    string;
}

export interface Tokens {
    primaryToken:        string;
    refreshToken:        string;
    adminAuthentication: boolean;
}