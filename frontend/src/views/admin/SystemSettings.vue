<template>
  <div>
    <h3>系统设置</h3>
    <el-card shadow="never" class="settings-card">
      <el-form label-width="140px" v-loading="loading">
        <el-form-item label="房屋类型">
          <el-select v-model="settings.houseTypes" multiple filterable allow-create default-first-option style="width:400px">
            <el-option label="整租" value="整租" />
            <el-option label="合租" value="合租" />
            <el-option label="单间" value="单间" />
            <el-option label="公寓" value="公寓" />
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="settings.paymentMethods" multiple filterable allow-create default-first-option style="width:400px">
            <el-option label="支付宝" value="支付宝" />
            <el-option label="微信支付" value="微信支付" />
            <el-option label="银行转账" value="银行转账" />
            <el-option label="现金" value="现金" />
          </el-select>
        </el-form-item>
        <el-form-item label="审核功能">
          <el-switch v-model="settings.auditEnabled" active-text="开启" inactive-text="关闭" />
          <span style="margin-left:12px;font-size:12px;color:#909399">
            关闭后房源发布无需审核
          </span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveSettings" :loading="saveLoading">保存设置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import request from '../../utils/request'

const loading = ref(false)
const saveLoading = ref(false)
const settings = reactive({
  houseTypes: [],
  paymentMethods: [],
  auditEnabled: true
})

async function loadSettings() {
  loading.value = true
  try {
    const res = await request.get('/settings')
    const s = res.settings || res.data || res
    settings.houseTypes = s.houseTypes || ['整租', '合租', '单间', '公寓']
    settings.paymentMethods = s.paymentMethods || ['支付宝', '微信支付', '银行转账']
    settings.auditEnabled = s.auditEnabled !== undefined ? s.auditEnabled : true
  } catch {
    // use defaults
  } finally {
    loading.value = false
  }
}

async function saveSettings() {
  saveLoading.value = true
  try {
    await request.put('/settings', { ...settings })
    ElMessage.success('设置保存成功')
  } catch {
    // handled
  } finally {
    saveLoading.value = false
  }
}

onMounted(loadSettings)
</script>

<style scoped>
.settings-card {
  max-width: 700px;
}
</style>
