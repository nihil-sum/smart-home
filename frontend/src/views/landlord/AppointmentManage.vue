<template>
  <div>
    <div class="card-header">
      <h3>预约管理</h3>
    </div>
    <el-table :data="appointments" v-loading="loading" stripe style="width:100%">
      <el-table-column prop="house?.title || '--'" label="房源" min-width="150" />
      <el-table-column prop="user?.name || user?.phone || '--'" label="租户" width="120" />
      <el-table-column prop="date" label="日期" width="120" />
      <el-table-column prop="time" label="时间" width="100" />
      <el-table-column prop="note" label="备注" min-width="150" show-overflow-tooltip />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="statusType(row.status)" size="small">{{ statusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160" fixed="right">
        <template #default="{ row }">
          <el-button
            v-if="row.status === 'pending'"
            type="success"
            size="small"
            @click="handleAction(row.id, 'confirmed')"
          >确认</el-button>
          <el-button
            v-if="row.status === 'pending'"
            type="danger"
            size="small"
            @click="handleAction(row.id, 'rejected')"
          >拒绝</el-button>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="!loading && appointments.length === 0" description="暂无预约记录" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../../utils/request'

const appointments = ref([])
const loading = ref(false)

function statusType(s) {
  return { pending: 'warning', confirmed: 'success', cancelled: 'info', rejected: 'danger' }[s] || 'info'
}
function statusText(s) {
  return { pending: '待确认', confirmed: '已确认', cancelled: '已取消', rejected: '已拒绝' }[s] || s
}

async function loadAppointments() {
  loading.value = true
  try {
    const res = await request.get('/appointments/manage')
    appointments.value = res.appointments || res.data || []
  } catch {
    appointments.value = []
  } finally {
    loading.value = false
  }
}

async function handleAction(id, action) {
  try {
    const label = action === 'confirmed' ? '确认' : '拒绝'
    await request.put(`/appointments/${id}/${action === 'confirmed' ? 'confirm' : 'reject'}`)
    ElMessage.success(`已${label}该预约`)
    loadAppointments()
  } catch {}
}

onMounted(loadAppointments)
</script>
