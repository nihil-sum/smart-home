<template>
  <div class="page-container">
    <el-card class="search-card" shadow="never">
      <el-form :model="searchForm" inline class="search-form">
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keyword" placeholder="搜索房源标题/地址" clearable />
        </el-form-item>
        <el-form-item label="区域">
          <el-input v-model="searchForm.area" placeholder="如: 朝阳区" style="width:120px" clearable />
        </el-form-item>
        <el-form-item label="租金范围">
          <el-input-number v-model="searchForm.minRent" :min="0" placeholder="最低" style="width:120px" />
          <span style="margin:0 8px">-</span>
          <el-input-number v-model="searchForm.maxRent" :min="0" placeholder="最高" style="width:120px" />
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="searchForm.type" placeholder="房屋类型" clearable style="width:140px">
            <el-option label="整租" value="整租" />
            <el-option label="合租" value="合租" />
            <el-option label="单间" value="单间" />
            <el-option label="公寓" value="公寓" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchHouses" :loading="loading">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="house-grid" v-loading="loading">
      <HouseCard v-for="house in houses" :key="house.id" :house="house" />
    </div>

    <div class="text-center mt-20" v-if="total > 0">
      <el-pagination
        v-model:current-page="page"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        @current-change="loadHouses"
      />
    </div>

    <el-empty v-if="!loading && houses.length === 0" description="暂无房源信息" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '../utils/request'
import HouseCard from '../components/HouseCard.vue'

const houses = ref([])
const loading = ref(false)
const page = ref(1)
const pageSize = 12
const total = ref(0)

const searchForm = ref({
  keyword: '',
  area: '',
  minRent: null,
  maxRent: null,
  type: ''
})

async function loadHouses() {
  loading.value = true
  try {
    const params = { page: page.value, pageSize, status: 'approved' }
    if (searchForm.value.keyword) params.keyword = searchForm.value.keyword
    if (searchForm.value.area) params.area = searchForm.value.area
    if (searchForm.value.minRent !== null) params.minRent = searchForm.value.minRent
    if (searchForm.value.maxRent !== null) params.maxRent = searchForm.value.maxRent
    if (searchForm.value.type) params.type = searchForm.value.type
    const res = await request.get('/houses', { params })
    houses.value = res.houses || res.data || []
    total.value = res.total || 0
  } catch {
    houses.value = []
  } finally {
    loading.value = false
  }
}

function searchHouses() {
  page.value = 1
  loadHouses()
}

function resetSearch() {
  searchForm.value = { keyword: '', area: '', minRent: null, maxRent: null, type: '' }
  page.value = 1
  loadHouses()
}

onMounted(() => {
  loadHouses()
})
</script>

<style scoped>
.search-card {
  margin-bottom: 20px;
}
.search-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.house-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
</style>
