<template>
  <div>
    <div class="card-header">
      <h3>房源管理</h3>
      <el-button type="primary" @click="$router.push('/landlord/houses/new')">发布新房源</el-button>
    </div>
    <el-table :data="houses" v-loading="loading" stripe style="width:100%">
      <el-table-column prop="title" label="标题" min-width="160" show-overflow-tooltip />
      <el-table-column prop="area" label="面积" width="80">
        <template #default="{ row }">{{ row.area }}㎡</template>
      </el-table-column>
      <el-table-column prop="rent" label="租金" width="100">
        <template #default="{ row }">¥{{ row.rent }}</template>
      </el-table-column>
      <el-table-column prop="address" label="地址" min-width="180" show-overflow-tooltip />
      <el-table-column label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="statusType(row.status)" size="small">{{ statusText(row.status) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button size="small" @click="$router.push(`/landlord/houses/${row.id}/edit`)">编辑</el-button>
          <el-button
            v-if="row.status === 'approved'"
            size="small"
            type="warning"
            @click="toggleStatus(row.id, 'offline')"
          >下架</el-button>
          <el-button
            v-if="row.status === 'offline'"
            size="small"
            type="success"
            @click="toggleStatus(row.id, 'approved')"
          >上架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-empty v-if="!loading && houses.length === 0" description="暂无房源" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../../utils/request'

const houses = ref([])
const loading = ref(false)

function statusType(s) {
  return { pending: 'warning', approved: 'success', rejected: 'danger', rented: 'info', offline: 'info' }[s] || 'info'
}
function statusText(s) {
  return { pending: '待审核', approved: '已上架', rejected: '未通过', rented: '已租出', offline: '已下架' }[s] || s
}

async function loadHouses() {
  loading.value = true
  try {
    const res = await request.get('/houses/my')
    houses.value = res.houses || res.data || []
  } catch {
    houses.value = []
  } finally {
    loading.value = false
  }
}

async function toggleStatus(id, status) {
  try {
    await request.put(`/houses/${id}/status`, { status })
    ElMessage.success(status === 'approved' ? '已上架' : '已下架')
    loadHouses()
  } catch {}
}

onMounted(loadHouses)
</script>
