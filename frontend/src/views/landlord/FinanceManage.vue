<template>
  <div>
    <div class="card-header">
      <h3>财务管理</h3>
      <div>
        <el-date-picker
          v-model="month"
          type="month"
          placeholder="选择月份"
          @change="loadFinance"
          style="width:160px"
        />
      </div>
    </div>

    <el-row :gutter="20" class="mb-20">
      <el-col :span="6">
        <el-card shadow="never">
          <div class="stat-item">
            <div class="stat-label">总收入</div>
            <div class="stat-value" style="color:#f56c6c">¥{{ totalIncome }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="stat-item">
            <div class="stat-label">总合同数</div>
            <div class="stat-value" style="color:#409eff">{{ totalContracts }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="stat-item">
            <div class="stat-label">待收租金</div>
            <div class="stat-value" style="color:#e6a23c">¥{{ pendingIncome }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="stat-item">
            <div class="stat-label">已收租金</div>
            <div class="stat-value" style="color:#67c23a">¥{{ paidIncome }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-table :data="records" v-loading="loading" stripe style="width:100%">
      <el-table-column prop="house?.title || '--'" label="房源" min-width="150" />
      <el-table-column prop="tenant?.name || tenant?.phone || '--'" label="租户" width="120" />
      <el-table-column prop="month" label="月份" width="100" />
      <el-table-column prop="amount" label="金额" width="100">
        <template #default="{ row }">¥{{ row.amount }}</template>
      </el-table-column>
      <el-table-column label="支付状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.paid ? 'success' : 'warning'" size="small">
            {{ row.paid ? '已支付' : '未支付' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="paidAt" label="支付时间" width="160" />
    </el-table>
    <el-empty v-if="!loading && records.length === 0" description="暂无财务记录" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import request from '../../utils/request'

const records = ref([])
const loading = ref(false)
const month = ref(new Date())

const totalIncome = computed(() => records.value.reduce((s, r) => s + (r.amount || 0), 0))
const totalContracts = computed(() => records.value.length)
const paidIncome = computed(() => records.value.filter(r => r.paid).reduce((s, r) => s + (r.amount || 0), 0))
const pendingIncome = computed(() => totalIncome.value - paidIncome.value)

async function loadFinance() {
  loading.value = true
  try {
    const params = {}
    if (month.value) {
      const d = month.value
      params.month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    }
    const res = await request.get('/finance', { params })
    records.value = res.records || res.data || []
  } catch {
    records.value = []
  } finally {
    loading.value = false
  }
}

onMounted(loadFinance)
</script>

<style scoped>
.stat-item {
  text-align: center;
  padding: 8px;
}
.stat-label {
  font-size: 14px;
  color: #909399;
  margin-bottom: 8px;
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
}
</style>
