export default Endpoints;
declare class Endpoints {
    constructor(options: any, constants: any);
    options: any;
    constants: any;
    authCache: Map<any, any>;
    axiosInstance: import("axios").AxiosInstance;
    run(name: any, params: any, body: any): Promise<any>;
    resolveRequestContext(name: any): {
        apiKey: string | null;
        endpoint: any;
        baseUrl: any;
        authRoute: any;
    };
    createHttpsAgent(): any;
    handleCertificateError(): void;
    req(context: any, params: any, body: any): Promise<any>;
    isExpired(auth: any): boolean;
    getAuthentication(context: any): Promise<any>;
    handleAuthError(authError: any): void;
    authenticate(context: any): Promise<any>;
    createRequest(context: any, params: {} | undefined, body: any): Promise<{
        method: any;
        url: string;
        headers: {
            Authorization: string;
            'x-skip-mtls-checking': boolean;
        };
        data: any;
    }>;
}
