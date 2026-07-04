<template>
  <div>
    <div class="card-header">
      <h3>我的评价</h3>
      <el-button type="primary" @click="showCreateDialog">写评价</el-button>
    </div>

    <el-table :data="reviews" v-loading="loading" stripe style="width:100%">
      <el-table-column prop="house?.title || '--'" label="房源" min-width="150" />
      <el-table-column label="评分" width="150">
        <template #default="{ row }">
          <el-rate v-model="row.rating" disabled :max="5" />
        </template>
      </el-table-column>
      <el-table-column prop="content" label="评价内容" min-width="250" show-overflow-tooltip />
      <el-table-column prop="createdAt" label="评价时间" width="160" />
    </el-table>
    <el-empty v-if="!loading && reviews.length === 0" description="暂无评价" />

    <el-dialog v-model="dialogVisible" title="写评价" width="500px">
      <el-form :model="form" label-width="80px">
        <el-form-item label="房源" prop="houseId" :rules="[{ required: true, message: '请选择房源' }]">
          <el-select v-model="form.houseId" placeholder="选择要评价的房源" style="width:100%">
            <el-option v-for="h in houseOptions" :key="h.id" :label="h.title" :value="h.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="评分" prop="rating" :rules="[{ required: true, message: '请选择评分' }]">
          <el-rate v-model="form.rating" :max="5" />
        </el-form-item>
        <el-form-item label="评价" prop="content" :rules="[{ required: true, message: '请输入评价内容' }]">
          <el-input v-model="form.content" type="textarea" rows="4" placeholder="分享您的租房体验" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitReview" :loading="submitLoading">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../../utils/request'

const reviews = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const submitLoading = ref(false)
const houseOptions = ref([])

const form = ref({ houseId: '', rating: 5, content: '' })

async function loadReviews() {
  loading.value = true
  try {
    const res = await request.get('/reviews/my')
    reviews.value = res.reviews || res.data || []
  } catch {
    reviews.value = []
  } finally {
    loading.value = false
  }
}

async function loadHouses() {
  try {
    const res = await request.get('/houses', { params: { myOnly: true } })
    houseOptions.value = res.houses || res.data || []
  } catch {}
}

function showCreateDialog() {
  form.value = { houseId: '', rating: 5, content: '' }
  dialogVisible.value = true
}

async function submitReview() {
  if (!form.value.houseId) { ElMessage.warning('请选择房源'); return }
  if (!form.value.content) { ElMessage.warning('请输入评价内容'); return }
  submitLoading.value = true
  try {
    await request.post('/reviews', form.value)
    ElMessage.success('评价提交成功')
    dialogVisible.value = false
    loadReviews()
  } catch {
    // handled
  } finally {
    submitLoading.value = false
  }
}

onMounted(() => {
  loadReviews()
  loadHouses()
})
</script>
