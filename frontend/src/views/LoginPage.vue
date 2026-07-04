<template>
  <div class="page-container">
    <div class="form-wrapper">
      <el-card class="form-card" shadow="never">
        <h2 class="form-title">用户登录</h2>
        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-width="80px"
          @submit.prevent="handleLogin"
        >
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="form.phone" placeholder="请输入手机号或邮箱" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="form.role" style="width:100%">
              <el-option label="租户" value="tenant" />
              <el-option label="房东" value="landlord" />
              <el-option label="管理员" value="admin" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" :loading="loading" style="width:100%">
              登录
            </el-button>
          </el-form-item>
        </el-form>
        <div class="form-footer">
          还没有账号？<router-link to="/register">立即注册</router-link>
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
  phone: '',
  password: '',
  role: 'tenant'
})

const rules = {
  phone: [{ required: true, message: '请输入手机号或邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
}

async function handleLogin() {
  const valid = await formRef.value.validate().catch(() => {})
  if (!valid) return
  loading.value = true
  try {
    await auth.login({
      phone: form.phone,
      email: form.phone,
      password: form.password,
      role: form.role
    })
    ElMessage.success('登录成功')
    const target = { tenant: '/tenant/appointments', landlord: '/landlord/houses', admin: '/admin/users' }
    router.push(target[form.role] || '/')
  } catch (err) {
    // error handled by interceptor
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 180px);
}
.form-card {
  width: 420px;
  padding: 20px;
}
.form-title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  color: #303133;
}
.form-footer {
  text-align: center;
  font-size: 14px;
  color: #909399;
}
.form-footer a {
  color: #409eff;
}
</style>
