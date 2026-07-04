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
          <el-tag :type="statusType(row.status)" size="small" class="status-tag">{{ statusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <template v-if="row.status === 'pending'">
            <el-button type="success" size="small" @click="handleAction(row.id, 'confirmed')">确认</el-button>
            <el-button type="danger" size="small" @click="showRejectDialog(row.id)">拒绝</el-button>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="!loading && appointments.length === 0" description="暂无预约记录" />

    <el-dialog v-model="rejectDialogVisible" title="拒绝预约" width="400px">
      <el-input
        v-model="rejectReason"
        type="textarea"
        :rows="3"
        placeholder="请输入拒绝原因（选填）"
      />
      <template #footer>
        <el-button @click="rejectDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReject" :loading="rejectLoading">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../../utils/request'

const appointments = ref([])
const loading = ref(false)
const rejectDialogVisible = ref(false)
const rejectReason = ref('')
const rejectId = ref(null)
const rejectLoading = ref(false)

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
    await request.put(`/appointments/${id}/${action === 'confirmed' ? 'confirm' : 'reject'}`)
    ElMessage.success(action === 'confirmed' ? '已确认该预约' : '已拒绝该预约')
    loadAppointments()
  } catch {}
}

function showRejectDialog(id) {
  rejectId.value = id
  rejectReason.value = ''
  rejectDialogVisible.value = true
}

async function submitReject() {
  rejectLoading.value = true
  try {
    await request.put(`/appointments/${rejectId.value}/reject`, { reason: rejectReason.value })
    ElMessage.success('已拒绝该预约')
    rejectDialogVisible.value = false
    loadAppointments()
  } catch {
    // handled
  } finally {
    rejectLoading.value = false
  }
}

onMounted(loadAppointments)
</script>
