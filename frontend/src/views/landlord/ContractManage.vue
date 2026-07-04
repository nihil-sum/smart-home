<template>
  <div>
    <div class="card-header">
      <h3>合同管理</h3>
      <el-button type="primary" @click="showCreateDialog">创建合同</el-button>
    </div>
    <el-table :data="contracts" v-loading="loading" stripe style="width:100%">
      <el-table-column prop="house?.title || '--'" label="房源" min-width="150" />
      <el-table-column prop="tenant?.name || tenant?.phone || '--'" label="租户" width="120" />
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
          <el-button
            v-if="row.status === 'pending'"
            type="primary" size="small"
            @click="signContract(row.id)"
          >签署</el-button>
          <span v-else-if="row.status === 'active'">生效中</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="!loading && contracts.length === 0" description="暂无合同记录" />

    <el-dialog v-model="dialogVisible" title="创建合同" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="房源" prop="houseId" :rules="[{ required: true }]">
          <el-select v-model="form.houseId" placeholder="选择房源" style="width:100%">
            <el-option v-for="h in houseOptions" :key="h.id" :label="h.title" :value="h.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="租户" prop="tenantId" :rules="[{ required: true }]">
          <el-select v-model="form.tenantId" placeholder="选择租户" style="width:100%">
            <el-option v-for="t in tenantOptions" :key="t.id" :label="t.name || t.phone" :value="t.id" />
          </el-select>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开始日期" prop="startDate">
              <el-date-picker v-model="form.startDate" type="date" placeholder="开始日期" style="width:100%" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束日期" prop="endDate">
              <el-date-picker v-model="form.endDate" type="date" placeholder="结束日期" style="width:100%" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="月租金" prop="rent">
          <el-input-number v-model="form.rent" :min="0" style="width:100%" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="createContract" :loading="createLoading">创建</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '../../utils/request'

const contracts = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const createLoading = ref(false)
const houseOptions = ref([])
const tenantOptions = ref([])

const form = ref({ houseId: '', tenantId: '', startDate: '', endDate: '', rent: 0 })

function statusType(s) {
  return { pending: 'warning', active: 'success', expired: 'info', terminated: 'danger' }[s] || 'info'
}
function statusText(s) {
  return { pending: '待签署', active: '生效中', expired: '已到期', terminated: '已终止' }[s] || s
}

async function loadContracts() {
  loading.value = true
  try {
    const res = await request.get('/contracts/manage')
    contracts.value = res.contracts || res.data || []
  } catch {
    contracts.value = []
  } finally {
    loading.value = false
  }
}

async function loadOptions() {
  try {
    const [hRes, tRes] = await Promise.all([
      request.get('/houses/my'),
      request.get('/users', { params: { role: 'tenant' } })
    ])
    houseOptions.value = hRes.houses || hRes.data || []
    tenantOptions.value = tRes.users || tRes.data || []
  } catch {}
}

function showCreateDialog() {
  form.value = { houseId: '', tenantId: '', startDate: '', endDate: '', rent: 0 }
  dialogVisible.value = true
}

async function createContract() {
  if (!form.value.houseId || !form.value.tenantId || !form.value.startDate || !form.value.endDate) {
    ElMessage.warning('请填写完整信息')
    return
  }
  createLoading.value = true
  try {
    await request.post('/contracts', {
      ...form.value,
      startDate: form.value.startDate.toISOString().split('T')[0],
      endDate: form.value.endDate.toISOString().split('T')[0]
    })
    ElMessage.success('合同创建成功')
    dialogVisible.value = false
    loadContracts()
  } catch {
    // handled
  } finally {
    createLoading.value = false
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

onMounted(() => {
  loadContracts()
  loadOptions()
})
</script>
