<template>
  <div class="page-container">
    <div class="form-wrapper">
      <el-card class="form-card" shadow="never">
        <h2 class="form-title">用户注册</h2>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="80px"
          @submit.prevent="handleRegister"
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" type="password" show-password placeholder="请确认密码" />
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-radio-group v-model="form.role" class="role-radio-group">
              <el-radio-button value="tenant">租户</el-radio-button>
              <el-radio-button value="landlord">房东</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" :loading="loading" style="width:100%">
              注册
            </el-button>
          </el-form-item>
        </el-form>
        <div class="form-footer">
          已有账号？<router-link to="/login">立即登录</router-link>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()
const formRef = ref(null)
const loading = ref(false)

const form = reactive({
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'tenant'
})

const validateConfirm = (rule, value, callback) => {
  if (value !== form.password) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
  email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirm, trigger: 'blur' }
  ],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
}

async function handleRegister() {
  const valid = await formRef.value.validate().catch(() => {})
  if (!valid) return
  loading.value = true
  try {
    await auth.register({
      name: form.name,
      phone: form.phone,
      email: form.email,
      password: form.password,
      role: form.role
    })
    ElMessage.success('注册成功')
    const target = { tenant: '/tenant/appointments', landlord: '/landlord/houses' }
    router.push(target[form.role] || '/')
  } catch {
    // error handled by interceptor
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.role-radio-group {
  width: 100%;
  display: flex;
}
.role-radio-group .el-radio-button {
  flex: 1;
}
.role-radio-group .el-radio-button__inner {
  width: 100%;
  justify-content: center;
}
</style>
