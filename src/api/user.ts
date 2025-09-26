import { post } from '../http/request';

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    username: string;
    accessToken: string;
    roles: string[];
};

export const userLogin = async (data: LoginRequest) => post<LoginResponse>({}, '/login', data);
