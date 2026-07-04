<template>
  <el-card class="house-card" shadow="hover" @click="$router.push(`/house/${house.id}`)">
    <div class="card-image">
      <el-image
        :src="house.images && house.images[0] || 'https://via.placeholder.com/300x200?text=暂无图片'"
        fit="cover"
      />
      <el-tag
        :type="statusType"
        class="status-tag"
        size="small"
      >
        {{ statusText }}
      </el-tag>
    </div>
    <div class="card-body">
      <h3 class="house-title">{{ house.title }}</h3>
      <div class="house-info">
        <span class="info-item">
          <el-icon><HomeFilled /></el-icon>
          {{ house.area }}㎡
        </span>
        <span class="info-item">
          <el-icon><OfficeBuilding /></el-icon>
          {{ house.type || house.houseType || '未分类' }}
        </span>
      </div>
      <div class="house-address">
        <el-icon><Location /></el-icon>
        {{ house.address }}
      </div>
      <div class="house-footer">
        <span class="price">¥{{ house.rent }}/月</span>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { HomeFilled, OfficeBuilding, Location } from '@element-plus/icons-vue'

const props = defineProps({
  house: { type: Object, required: true }
})

const statusType = computed(() => {
  const map = { pending: 'warning', approved: 'success', rejected: 'danger', rented: 'info', offline: 'info' }
  return map[props.house.status] || 'info'
})

const statusText = computed(() => {
  const map = { pending: '待审核', approved: '已上架', rejected: '未通过', rented: '已租出', offline: '已下架' }
  return map[props.house.status] || props.house.status
})
</script>

<style scoped>
.house-card {
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
}
.house-card:hover {
  transform: translateY(-4px);
}
.card-image {
  position: relative;
  height: 180px;
  overflow: hidden;
}
.card-image .el-image {
  width: 100%;
  height: 100%;
}
.status-tag {
  position: absolute;
  top: 10px;
  right: 10px;
}
.card-body {
  padding: 12px 0 0;
}
.house-title {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.house-info {
  display: flex;
  gap: 16px;
  margin-bottom: 6px;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #606266;
}
.house-address {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #909399;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.house-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
  border-top: 1px solid #f0f0f0;
}
.price {
  font-size: 18px;
  font-weight: 600;
  color: #f56c6c;
}
</style>
