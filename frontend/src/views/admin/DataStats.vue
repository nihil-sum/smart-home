<template>
  <div>
    <h3>数据统计</h3>

    <el-row :gutter="20" class="mb-20">
      <el-col :span="6">
        <el-card shadow="never" v-loading="loading">
          <div class="stat-item">
            <div class="stat-label">用户总数</div>
            <div class="stat-value" style="color:#409eff">{{ stats.totalUsers || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" v-loading="loading">
          <div class="stat-item">
            <div class="stat-label">房源总数</div>
            <div class="stat-value" style="color:#67c23a">{{ stats.totalHouses || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" v-loading="loading">
          <div class="stat-item">
            <div class="stat-label">预约数</div>
            <div class="stat-value" style="color:#e6a23c">{{ stats.totalAppointments || 0 }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" v-loading="loading">
          <div class="stat-item">
            <div class="stat-label">合同数</div>
            <div class="stat-value" style="color:#f56c6c">{{ stats.totalContracts || 0 }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="never">
          <h4>热门区域</h4>
          <el-table :data="popularAreas" stripe size="small">
            <el-table-column prop="area" label="区域" />
            <el-table-column prop="count" label="房源数" width="80" />
          </el-table>
          <div v-if="!popularAreas.length" class="text-center" style="padding:16px;color:#909399">暂无数据</div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never">
          <h4>租金分布</h4>
          <el-table :data="rentRanges" stripe size="small">
            <el-table-column prop="range" label="租金范围" />
            <el-table-column prop="count" label="房源数" width="80" />
          </el-table>
          <div v-if="!rentRanges.length" class="text-center" style="padding:16px;color:#909399">暂无数据</div>
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
  padding: 12px;
}
.stat-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}
.stat-value {
  font-size: 28px;
  font-weight: 700;
}
h4 {
  margin-bottom: 12px;
  font-size: 16px;
}
</style>
