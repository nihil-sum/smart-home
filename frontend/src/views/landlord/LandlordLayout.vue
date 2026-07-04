<template>
  <div class="page-container">
    <div class="sidebar-layout">
      <el-menu :default-active="activeMenu" mode="horizontal" class="landlord-menu">
        <el-menu-item index="/landlord/houses" @click="$router.push('/landlord/houses')">
          <el-icon><HomeFilled /></el-icon>房源管理
        </el-menu-item>
        <el-menu-item index="/landlord/appointments" @click="$router.push('/landlord/appointments')">
          <el-icon><Calendar /></el-icon>预约管理
        </el-menu-item>
        <el-menu-item index="/landlord/contracts" @click="$router.push('/landlord/contracts')">
          <el-icon><Document /></el-icon>合同管理
        </el-menu-item>
        <el-menu-item index="/landlord/finance" @click="$router.push('/landlord/finance')">
          <el-icon><Money /></el-icon>财务管理
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
import { HomeFilled, Calendar, Document, Money } from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = computed(() => {
  const p = route.path
  if (p.startsWith('/landlord/houses')) return '/landlord/houses'
  return p
})
</script>

<style scoped>
.sidebar-layout {
  max-width: 1200px;
  margin: 0 auto;
}
.landlord-menu {
  margin-bottom: 20px;
  border-bottom: 2px solid #e4e7ed;
}
.content-area {
  min-height: 400px;
}
</style>
