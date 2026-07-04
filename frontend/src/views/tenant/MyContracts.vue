<template>
  <div>
    <div class="card-header">
      <h3>我的合同</h3>
    </div>
    <el-table :data="contracts" v-loading="loading" stripe style="width:100%">
      <el-table-column prop="house?.title || '--'" label="房源" min-width="150" />
      <el-table-column prop="startDate" label="开始日期" width="120" />
      <el-table-column prop="endDate" label="结束日期" width="120" />
      <el-table-column prop="rent" label="租金" width="100">
        <template #default="{ row }">¥{{ row.rent }}</template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="statusType(row.status)" size="small">{{ statusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" fixed="right">
        <template #default="{ row }">
          <el-button v-if="row.status === 'pending'" type="primary" size="small" @click="signContract(row.id)">
            签署
          </el-button>
          <span v-else-if="row.status === 'active'">已签署</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="!loading && contracts.length === 0" description="暂无合同记录" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '../../utils/request'

const contracts = ref([])
const loading = ref(false)

function statusType(s) {
  return { pending: 'warning', active: 'success', expired: 'info', terminated: 'danger' }[s] || 'info'
}
function statusText(s) {
  return { pending: '待签署', active: '生效中', expired: '已到期', terminated: '已终止' }[s] || s
}

async function loadContracts() {
  loading.value = true
  try {
    const res = await request.get('/contracts/my')
    contracts.value = res.contracts || res.data || []
  } catch {
    contracts.value = []
  } finally {
    loading.value = false
  }
}

async function signContract(id) {
  try {
    await ElMessageBox.confirm('确认签署该合同？', '提示')
    await request.put(`/contracts/${id}/sign`)
    ElMessage.success('合同签署成功')
    loadContracts()
  } catch {}
}

onMounted(loadContracts)
</script>
