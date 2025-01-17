export interface Users {
    id: number;
    code: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: number;
    role: string;
    status: string;
    lastUpdate: string;
}

interface Modules {
    name: string;
}

export interface Roles {
    id: number;
    name: string;
    description: string;
    modules: Array<Modules>;
    status: string;
    lastUpdate: string;
}
