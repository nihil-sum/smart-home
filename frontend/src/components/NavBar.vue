<template>
  <el-header class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="logo">
        <el-icon :size="24"><HomeFilled /></el-icon>
        <span>智慧房屋租赁</span>
      </router-link>
      <div class="nav-links">
        <template v-if="auth.isLoggedIn">
          <el-dropdown trigger="click">
            <span class="user-info">
              <el-avatar :size="32" icon="UserFilled" />
              <span class="username">{{ auth.user?.name || auth.user?.phone }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="auth.isTenant" @click="goTo('/tenant/appointments')">我的预约</el-dropdown-item>
                <el-dropdown-item v-if="auth.isTenant" @click="goTo('/tenant/contracts')">我的合同</el-dropdown-item>
                <el-dropdown-item v-if="auth.isLandlord" @click="goTo('/landlord/houses')">房源管理</el-dropdown-item>
                <el-dropdown-item v-if="auth.isLandlord" @click="goTo('/landlord/appointments')">预约管理</el-dropdown-item>
                <el-dropdown-item v-if="auth.isAdmin" @click="goTo('/admin/users')">用户管理</el-dropdown-item>
                <el-dropdown-item v-if="auth.isAdmin" @click="goTo('/admin/houses')">房源审核</el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else>
          <el-button text @click="goTo('/login')">登录</el-button>
          <el-button type="primary" @click="goTo('/register')">注册</el-button>
        </template>
      </div>
    </div>
  </el-header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { HomeFilled, ArrowDown, UserFilled } from '@element-plus/icons-vue'

const router = useRouter()
const auth = useAuthStore()

function goTo(path) {
  router.push(path)
}

function handleLogout() {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  padding: 0;
}
.navbar-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 20px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
  color: #409eff;
  cursor: pointer;
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 12px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.username {
  font-size: 14px;
  color: #303133;
}
</style>
