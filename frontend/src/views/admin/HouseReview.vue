<template>
  <div>
    <div class="card-header">
      <h3>房源审核</h3>
      <el-select v-model="statusFilter" placeholder="筛选状态" @change="loadHouses" style="width:140px">
        <el-option label="待审核" value="pending" />
        <el-option label="已上架" value="approved" />
        <el-option label="未通过" value="rejected" />
        <el-option label="全部" value="" />
      </el-select>
    </div>
    <el-table :data="houses" v-loading="loading" stripe style="width:100%">
      <el-table-column prop="title" label="标题" min-width="160" show-overflow-tooltip />
      <el-table-column prop="landlord?.name || landlord?.phone || '--'" label="房东" width="120" />
      <el-table-column prop="area" label="面积" width="80">
        <template #default="{ row }">{{ row.area }}㎡</template>
      </el-table-column>
      <el-table-column prop="rent" label="租金" width="100">
        <template #default="{ row }">¥{{ row.rent }}</template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="statusType(row.status)" size="small">{{ statusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <template v-if="row.status === 'pending'">
            <el-button type="success" size="small" @click="handleReview(row.id, 'approved')">通过</el-button>
            <el-button type="danger" size="small" @click="showRejectDialog(row.id)">拒绝</el-button>
          </template>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="!loading && houses.length === 0" description="暂无房源记录" />

    <el-dialog v-model="rejectDialog" title="拒绝原因" width="400px">
      <el-input v-model="rejectReason" type="textarea" rows="3" placeholder="请输入拒绝原因" />
      <template #footer>
        <el-button @click="rejectDialog = false">取消</el-button>
        <el-button type="primary" @click="submitReject" :loading="rejectLoading">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../../utils/request'

const houses = ref([])
const loading = ref(false)
const statusFilter = ref('pending')
const rejectDialog = ref(false)
const rejectReason = ref('')
const rejectId = ref(null)
const rejectLoading = ref(false)

function statusType(s) {
  return { pending: 'warning', approved: 'success', rejected: 'danger', rented: 'info', offline: 'info' }[s] || 'info'
}
function statusText(s) {
  return { pending: '待审核', approved: '已上架', rejected: '未通过', rented: '已租出', offline: '已下架' }[s] || s
}

async function loadHouses() {
  loading.value = true
  try {
    const params = {}
    if (statusFilter.value) params.status = statusFilter.value
    const res = await request.get('/houses', { params })
    houses.value = res.houses || res.data || []
  } catch {
    houses.value = []
  } finally {
    loading.value = false
  }
}

async function handleReview(id, status) {
  try {
    await request.put(`/houses/${id}/review`, { status, reason: '' })
    ElMessage.success('操作成功')
    loadHouses()
  } catch {}
}

function showRejectDialog(id) {
  rejectId.value = id
  rejectReason.value = ''
  rejectDialog.value = true
}

async function submitReject() {
  if (!rejectReason.value) {
    ElMessage.warning('请输入拒绝原因')
    return
  }
  rejectLoading.value = true
  try {
    await request.put(`/houses/${rejectId.value}/review`, { status: 'rejected', reason: rejectReason.value })
    ElMessage.success('已拒绝该房源')
    rejectDialog.value = false
    loadHouses()
  } catch {
    // handled
  } finally {
    rejectLoading.value = false
  }
}

onMounted(loadHouses)
</script>
