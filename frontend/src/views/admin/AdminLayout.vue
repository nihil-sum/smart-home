<template>
  <div class="page-container">
    <div class="sidebar-layout">
      <el-menu :default-active="activeMenu" mode="horizontal" class="admin-menu">
        <el-menu-item index="/admin/users" @click="$router.push('/admin/users')">
          <el-icon><User /></el-icon>用户管理
        </el-menu-item>
        <el-menu-item index="/admin/houses" @click="$router.push('/admin/houses')">
          <el-icon><HomeFilled /></el-icon>房源审核
        </el-menu-item>
        <el-menu-item index="/admin/stats" @click="$router.push('/admin/stats')">
          <el-icon><DataAnalysis /></el-icon>数据统计
        </el-menu-item>
        <el-menu-item index="/admin/settings" @click="$router.push('/admin/settings')">
          <el-icon><Setting /></el-icon>系统设置
        </el-menu-item>
      </el-menu>
      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { User, HomeFilled, DataAnalysis, Setting } from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>
