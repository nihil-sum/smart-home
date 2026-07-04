<template>
  <div class="page-container">
    <div class="sidebar-layout">
      <el-menu :default-active="activeMenu" mode="horizontal" class="tenant-menu">
        <el-menu-item index="/tenant/appointments" @click="$router.push('/tenant/appointments')">
          <el-icon><Calendar /></el-icon>我的预约
        </el-menu-item>
        <el-menu-item index="/tenant/contracts" @click="$router.push('/tenant/contracts')">
          <el-icon><Document /></el-icon>我的合同
        </el-menu-item>
        <el-menu-item index="/tenant/reviews" @click="$router.push('/tenant/reviews')">
          <el-icon><Star /></el-icon>我的评价
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
import { Calendar, Document, Star } from '@element-plus/icons-vue'

const route = useRoute()
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.sidebar-layout {
  max-width: 1200px;
  margin: 0 auto;
}
.tenant-menu {
  margin-bottom: 20px;
  border-bottom: 2px solid #e4e7ed;
}
.content-area {
  min-height: 400px;
}
</style>
