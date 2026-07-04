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
        <el-button type="primary" class="ml-10" @click="showAddDialog">添加记录</el-button>
      </div>
    </div>

    <el-row :gutter="20" class="mb-20">
      <el-col :span="6">
        <el-card shadow="never">
          <div class="stat-item">
            <div class="stat-label">总收入</div>
            <div class="stat-value stat-income">¥{{ totalIncome.toLocaleString() }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="stat-item">
            <div class="stat-label">总合同数</div>
            <div class="stat-value stat-count">{{ totalContracts }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="stat-item">
            <div class="stat-label">待收租金</div>
            <div class="stat-value stat-pending">¥{{ pendingIncome.toLocaleString() }}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never">
          <div class="stat-item">
            <div class="stat-label">已收租金</div>
            <div class="stat-value stat-paid">¥{{ paidIncome.toLocaleString() }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-table :data="records" v-loading="loading" stripe style="width:100%">
      <el-table-column prop="house?.title || '--'" label="房源" min-width="150" />
      <el-table-column prop="tenant?.name || tenant?.phone || '--'" label="租户" width="120" />
      <el-table-column prop="month" label="月份" width="100" />
      <el-table-column prop="amount" label="金额" width="110">
        <template #default="{ row }">¥{{ Number(row.amount).toLocaleString() }}</template>
      </el-table-column>
      <el-table-column label="支付状态" width="100">
        <template #default="{ row }">
          <el-tag :type="row.paid ? 'success' : 'warning'" size="small" class="status-tag">
            {{ row.paid ? '已支付' : '未支付' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="paidAt" label="支付时间" width="160" />
    </el-table>
    <el-empty v-if="!loading && records.length === 0" description="暂无财务记录" />

    <el-dialog v-model="addDialogVisible" title="添加财务记录" width="460px">
      <el-form :model="addForm" label-width="80px">
        <el-form-item label="房源" prop="houseId">
          <el-select v-model="addForm.houseId" placeholder="选择房源" style="width:100%">
            <el-option v-for="h in houseOptions" :key="h.id" :label="h.title" :value="h.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input-number v-model="addForm.amount" :min="0" :max="999999" style="width:100%" />
        </el-form-item>
        <el-form-item label="月份" prop="month">
          <el-date-picker v-model="addForm.month" type="month" placeholder="选择月份" style="width:100%" />
        </el-form-item>
        <el-form-item label="已支付">
          <el-switch v-model="addForm.paid" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAddRecord" :loading="addLoading">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../../utils/request'

const records = ref([])
const loading = ref(false)
const month = ref(new Date())
const addDialogVisible = ref(false)
const addLoading = ref(false)
const houseOptions = ref([])
const addForm = ref({ houseId: '', amount: 0, month: new Date(), paid: false })

const totalIncome = computed(() => records.value.reduce((s, r) => s + (Number(r.amount) || 0), 0))
const totalContracts = computed(() => records.value.length)
const paidIncome = computed(() => records.value.filter(r => r.paid).reduce((s, r) => s + (Number(r.amount) || 0), 0))
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

async function loadHouseOptions() {
  try {
    const res = await request.get('/houses/my')
    houseOptions.value = res.houses || res.data || []
  } catch {}
}

function showAddDialog() {
  addForm.value = { houseId: '', amount: 0, month: new Date(), paid: false }
  addDialogVisible.value = true
}

async function submitAddRecord() {
  if (!addForm.value.houseId || !addForm.value.amount) {
    ElMessage.warning('请填写完整信息')
    return
  }
  addLoading.value = true
  try {
    const d = addForm.value.month
    await request.post('/finance', {
      ...addForm.value,
      month: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    })
    ElMessage.success('财务记录已添加')
    addDialogVisible.value = false
    loadFinance()
  } catch {
    // handled
  } finally {
    addLoading.value = false
  }
}

onMounted(() => {
  loadFinance()
  loadHouseOptions()
})
</script>

<style scoped>
.stat-item {
  text-align: center;
  padding: 8px;
}
.stat-label {
  font-size: 14px;
  color: #6b7272;
  margin-bottom: 8px;
}
.stat-value {
  font-size: 24px;
  font-weight: 700;
}
.stat-income {
  color: #d4943a;
}
.stat-count {
  color: #0d7a7a;
}
.stat-pending {
  color: #e8a838;
}
.stat-paid {
  color: #4caf7d;
}
.ml-10 {
  margin-left: 10px;
}
</style>
