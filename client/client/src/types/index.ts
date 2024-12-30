export type AppProps = {
    title: string;
    description?: string;
};

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface ApiResponse<T> {
    data: T;
    error?: string;
}