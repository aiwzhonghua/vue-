<script lang="ts" setup>
import { reactive } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';


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

const handleSubmit = () => {
    // 处理登录逻辑
    console.log('登录信息:', userInfo);
};
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
                    <el-button type="primary" style="width: 100%" @click="handleSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<style lang="less" scoped>
el-form-item__label-wrap {
    margin-left: 0px !important;
}

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
    flex-direction: column;
    text-align: center;
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;

    .login.info {
        height: max-content;
    }
}
</style>