import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getMessageInfo } from './status';

interface BaseResponse<T = any> {
    code: number | string;
    message: string;
    data: T;
}

const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASEURL,
    timeout: 15000
});

// axios实例拦截请求
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// axios实例拦截响应
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status == 200) {
            return response.data;
        }
        ElMessage({
            message: getMessageInfo(response.status),
            type: 'error'
        });
    },
    //请求失败
    (error: any) => {
        const { response } = error;
        if (response) {
            ElMessage({
                message: getMessageInfo(response.status),
                type: 'error'
            });
            return Promise.reject(error);
        }
        ElMessage({
            message: '网络连接异常，请稍后再试！',
            type: 'error'
        });
    }
);

//此处相当于二次相应拦截，对数据进行二次处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
    const conf = config;
    return new Promise((resolve, reject) => {
        service.request<any, AxiosResponse<BaseResponse<T>>>(conf).then((res: AxiosResponse<BaseResponse<T>>) => {
            const data = res.data;
            if (data.code != 0) {
                ElMessage({
                    message: data.message,
                    type: 'error'
                });
                reject(data.message);
            } else {
                ElMessage({
                    message: data.message,
                    type: 'success'
                });
                resolve(data.data as T);
            }
        });
    });
};

export function get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return requestInstance({
        url,
        method: 'get',
        params,
        ...config
    });
}

export function post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return requestInstance({
        url,
        method: 'post',
        data,
        ...config
    });
}

export function put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return requestInstance({
        url,
        method: 'put',
        data,
        ...config
    });
}

export function del<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return requestInstance({
        url,
        method: 'delete',
        data,
        ...config
    });
}
