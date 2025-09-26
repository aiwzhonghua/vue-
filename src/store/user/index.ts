import { defineStore } from 'pinia';
import pinia from '@/store';
import { userLogin } from '@/api/user.ts';

export interface UserState {
    username: string;
    accessToken: string;
    refreshToken?: string;
    roles: Array<string>;
}

export const useUserStore = defineStore('userInfo', {
    state: (): UserState => ({
        username: '大伟',
        accessToken: '',
        roles: ['common']
    }),
    actions: {
        storeUserLogin(data) {
            return userLogin(data).then((res) => {
                this.username = res.username;
                this.accessToken = res.accessToken;
                this.roles = res.roles;
                return res;
            });
        }
    }
});

export default useUserStore(pinia);
