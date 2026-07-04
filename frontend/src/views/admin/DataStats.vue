<template>
  <div>
    <h3>数据统计</h3>

    <el-row :gutter="20" class="mb-20" style="margin-top:20px">
      <el-col :span="6">
        <el-card shadow="never" v-loading="loading">
          <div class="stat-item">
            <div class="stat-label">用户总数</div>
            <div class="stat-value" style="color:#0d7a7a">{{ stats.totalUsers || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" v-loading="loading">
          <div class="stat-item">
            <div class="stat-label">房源总数</div>
            <div class="stat-value" style="color:#36a3a3">{{ stats.totalHouses || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" v-loading="loading">
          <div class="stat-item">
            <div class="stat-label">预约数</div>
            <div class="stat-value" style="color:#d4943a">{{ stats.totalAppointments || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" v-loading="loading">
          <div class="stat-item">
            <div class="stat-label">合同数</div>
            <div class="stat-value" style="color:#4caf7d">{{ stats.totalContracts || 0 }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="never">
          <div class="table-section-header">热门区域</div>
          <el-table :data="popularAreas" stripe size="small">
            <el-table-column prop="area" label="区域" />
            <el-table-column prop="count" label="房源数" width="80" />
          </el-table>
          <el-empty v-if="!loading && popularAreas.length === 0" description="暂无数据" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <div class="table-section-header">租金分布</div>
          <el-table :data="rentRanges" stripe size="small">
            <el-table-column prop="range" label="租金范围" />
            <el-table-column prop="count" label="房源数" width="80" />
          </el-table>
          <el-empty v-if="!loading && rentRanges.length === 0" description="暂无数据" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '../../utils/request'

const loading = ref(false)
const stats = ref({})
const popularAreas = ref([])
const rentRanges = ref([])

async function loadStats() {
  loading.value = true
  try {
    const res = await request.get('/admin/stats')
    stats.value = res.stats || res.data || {}
    popularAreas.value = res.popularAreas || res.stats?.popularAreas || []
    rentRanges.value = res.rentRanges || res.stats?.rentRanges || []
  } catch {
    // error handled
  } finally {
    loading.value = false
  }
}

onMounted(loadStats)
</script>

<style scoped>
.stat-item {
  text-align: center;
  padding: 16px 12px;
}
.stat-label {
  font-size: 14px;
  color: #6b7272;
  margin-bottom: 8px;
}
.stat-value {
  font-size: 28px;
  font-weight: 700;
}
.table-section-header {
  font-size: 16px;
  font-weight: 600;
  color: #1a1d1d;
  margin-bottom: 16px;
}
</style>
