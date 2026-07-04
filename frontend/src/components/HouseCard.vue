<template>
  <div class="house-card" @click="$router.push(`/house/${house._id || house.id}`)">
    <div class="card-image">
      <el-image
        :src="house.images && house.images[0] || '/placeholder-house.svg'"
        fit="cover"
      >
        <template #error>
          <div class="image-placeholder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke="#c5e8e8" stroke-width="2" fill="none"/>
              <path d="M9 21V13H15V21" stroke="#c5e8e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>暂无图片</span>
          </div>
        </template>
      </el-image>
      <el-tag
        :type="statusType"
        class="status-tag"
        size="small"
        effect="dark"
      >
        {{ statusText }}
      </el-tag>
    </div>
    <div class="card-body">
      <h3 class="house-title">{{ house.title }}</h3>
      <div class="house-info">
        <span class="info-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/></svg>
          {{ house.area }}㎡
        </span>
        <span class="info-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z"/></svg>
          {{ house.type || '未分类' }}
        </span>
        <span class="info-item" v-if="house.size">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z"/></svg>
          {{ house.size }}㎡
        </span>
      </div>
      <div class="house-address">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
        {{ house.area }} · {{ house.address }}
      </div>
      <div class="house-footer">
        <span class="price">¥{{ house.rent?.toLocaleString() }}</span>
        <span class="price-unit">/月</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04);
  border: 1px solid #e2e6e6;
}
.house-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
}
.card-image {
  position: relative;
  height: 180px;
  overflow: hidden;
  background: #f7f9f9;
}
.card-image .el-image {
  width: 100%;
  height: 100%;
}
.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #a8d8d8;
  font-size: 13px;
}
.status-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  font-weight: 600;
}
.card-body {
  padding: 14px 16px;
}
.house-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1d1d;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.house-info {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
}
.info-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #6b7272;
}
.info-item svg {
  color: #a8d8d8;
}
.house-address {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #909399;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.house-address svg {
  flex-shrink: 0;
  color: #c5e8e8;
}
.house-footer {
  display: flex;
  align-items: baseline;
  padding-top: 12px;
  border-top: 1px solid #eef0f0;
}
.price {
  font-size: 20px;
  font-weight: 700;
  color: #d9605a;
}
.price-unit {
  font-size: 13px;
  color: #6b7272;
  margin-left: 2px;
}
</style>
