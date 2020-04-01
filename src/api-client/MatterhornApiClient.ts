export interface CounterResponse {
    ID: number,
    Value: number
}

export default class MatterhornApiClient {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    public async Counter() : Promise<CounterResponse> {
        const response = await fetch(`${this.baseUrl}/counter`);
        return await response.json() as CounterResponse;
    }
}