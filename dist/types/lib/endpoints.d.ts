export default Endpoints;
declare class Endpoints {
    constructor(options: any, constants: any);
    options: any;
    auth: any;
    constants: any;
    authError: any;
    axiosInstance: import("axios").AxiosInstance;
    run(name: any, params: any, body: any): Promise<any>;
    baseUrl: any;
    authRoute: any;
    agent: any;
    params: any;
    req(endpoint: any, body: any): Promise<any>;
    isExpired(): boolean;
    authenticate(): Promise<any>;
    createRequest(endpoint: any, body: any): Promise<{
        method: any;
        url: string;
        headers: Object;
        data: any;
    }>;
}
