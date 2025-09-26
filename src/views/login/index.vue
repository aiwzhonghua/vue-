<script lang="ts" setup>
import { reactive } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const userInfo = reactive({
    username: '',
    password: '',
});

const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
});

function userLogin() {
    userStore.storeUserLogin(userInfo).then(() => {
        router.push('/');
    });
}

</script>

<template>
    <div class="login-box">
        <div class="login-form">
            <h1>企业中后台管理系统</h1>
            <el-form :model="userInfo" :rules="rules" ref="formRef" class="logo-info" label-position="left"
                label-width="auto">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userInfo.username" :prefix-icon="User" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="userInfo.password" type="password" :prefix-icon="Lock" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" @click="userLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style lang="less" scoped>
.login-box {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;

    h1 {
        margin-bottom: 15px;
    }
}

.login-form {
    display: flex;
    padding: 20px;
    width: 400px;
    text-align: center;
    background-color: #fff;
    border-radius: 5px;
    flex-direction: column;

    .login.info {
        height: max-content;
    }
}
</style>